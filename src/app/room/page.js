"use client";

import { supabase } from "@/lib/supabaseClient";
import "@livekit/components-styles";
import {
  LiveKitRoom,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  ControlBar,
  useTracks,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";

function VoxaeVideoGrid() {
  const tracks = useTracks(
    [{ source: Track.Source.Camera, withPlaceholder: true }],
    { onlySubscribed: false }
  );

  return (
    <GridLayout tracks={tracks} className="h-full">
      <ParticipantTile />
    </GridLayout>
  );
}

export default function RoomPage() {
  const [token, setToken] = useState("");
  const [participantName, setParticipantName] = useState("Guest");
  const [error, setError] = useState("");
  const [bookingId, setBookingId] = useState(null);
  const [isLearnerParticipant, setIsLearnerParticipant] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
  async function connectToRoom() {
    try {
      const params = new URLSearchParams(window.location.search);

      const bookingId = params.get("booking");
      setBookingId(bookingId);

      if (!bookingId) {
        setError("Missing booking ID in URL");
        return;
      }

      const name =
        params.get("name") || `Guest-${Math.floor(Math.random() * 1000)}`;

      setParticipantName(name);

      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData?.session?.access_token;
      const user = sessionData?.session?.user;

      if (!accessToken || !user) {
        setError("You must be logged in to join this room");
        return;
      }

      const response = await fetch("/api/livekit-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          bookingId,
          participantName: name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Token request failed");
        return;
      }

      if (!data.token) {
        setError("No LiveKit token received");
        return;
      }

      setToken(data.token);
      await markSessionInProgress(bookingId, user.id);
    } catch (err) {
      console.error(err);
      setError("Could not connect to LiveKit");
    }
  }

  connectToRoom();
}, []);
async function markSessionInProgress(currentBookingId, userId) {
  const { data: bookingData, error: bookingError } = await supabase
    .from("bookings")
    .select("id, learner_id, status")
    .eq("id", currentBookingId)
    .single();

  if (bookingError || !bookingData) return;

  const { data: learnerData } = await supabase
    .from("learner_profiles")
    .select("id, user_id")
    .eq("id", bookingData.learner_id)
    .single();

  const isLearner = learnerData?.user_id === userId;
  setIsLearnerParticipant(isLearner);

  if (!isLearner) return;

  if (bookingData.status === "scheduled") {
    await supabase
      .from("bookings")
      .update({
        status: "in_progress",
        started_at: new Date().toISOString(),
      })
      .eq("id", currentBookingId);
  }
}

async function completeSession() {
  if (!bookingId || !isLearnerParticipant || completedRef.current) return;

  completedRef.current = true;

  const { data: bookingData, error: bookingError } = await supabase
    .from("bookings")
    .select("id, learner_id, status")
    .eq("id", bookingId)
    .single();

  if (bookingError || !bookingData) return;

  if (bookingData.status === "completed") return;

  const { data: learnerData, error: learnerError } = await supabase
    .from("learner_profiles")
    .select("id, sessions_used, total_points, coins")
    .eq("id", bookingData.learner_id)
    .single();

  if (learnerError || !learnerData) return;

  await supabase
    .from("bookings")
    .update({
      status: "completed",
      match_status: "completed",
      ended_at: new Date().toISOString(),
      xp_awarded: 50,
      coins_awarded: 20,
    })
    .eq("id", bookingId);

  await supabase
    .from("learner_profiles")
    .update({
      sessions_used: (learnerData.sessions_used || 0) + 1,
      total_points: (learnerData.total_points || 25) + 50,
      coins: (learnerData.coins || 0) + 20,
    })
    .eq("id", learnerData.id);

  window.location.href = "/learner";
}

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="rounded-2xl bg-red-500/10 p-6 text-red-300">
          <p className="font-bold">LiveKit error</p>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Connecting to Binolin Live Room...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        connect={true}
        onDisconnected={completeSession}
        data-lk-theme="default"
        className="min-h-screen"
      >
        <RoomAudioRenderer />

        <section className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6">
          <header className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
                Binolin Live Room
              </p>

              <h1 className="mt-2 text-3xl font-black">
                Job Interview Quest
              </h1>

              <p className="text-sm text-slate-400">
                Connected as {participantName}
              </p>
            </div>

            <div className="rounded-full border border-green-400/30 bg-green-400/10 px-4 py-2 text-sm font-bold text-green-300">
              Live Session
            </div>
          </header>

          <div className="grid flex-1 gap-5 lg:grid-cols-[1fr_330px]">
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl">
              <div className="h-[560px] overflow-hidden rounded-[1.5rem] bg-slate-900">
                <VoxaeVideoGrid />
              </div>
            </div>

            <aside className="rounded-[2rem] border border-white/10 bg-white/10 p-5">
              <p className="text-sm font-bold uppercase tracking-wide text-cyan-300">
                Quest Guide
              </p>

              <h2 className="mt-3 text-2xl font-black">
                Interview Practice
              </h2>

              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <p>✅ Introduce yourself</p>
                <p>✅ Answer 3 interview questions</p>
                <p>✅ Practice pronunciation</p>
                <p>🎯 Earn +50 XP after completion</p>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-950/60 p-4">
                <p className="text-sm text-slate-400">Session timer</p>
                <p className="mt-1 text-3xl font-black">30:00</p>
              </div>

              <div className="mt-6 rounded-2xl border border-purple-400/30 bg-purple-400/10 p-4">
                <p className="text-sm font-bold text-purple-200">Reward</p>
                <div className="mt-3 flex gap-2">
                  <span className="rounded-full bg-purple-500 px-3 py-1 text-sm font-bold">
                    +50 XP
                  </span>
                  <span className="rounded-full bg-yellow-400 px-3 py-1 text-sm font-bold text-slate-950">
                    ⭐ 20 Coins
                  </span>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-4">
              <p className="text-sm font-bold uppercase tracking-wide text-cyan-300">
                Quest Assistant
              </p>

              <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Today's vocabulary
                </p>

                <div className="mt-2 space-y-2 text-sm text-slate-200">
                  <p>🟦 strengths — One of my strengths is...</p>
                  <p>🟦 experience — I have experience in...</p>
                  <p>🟦 challenge — One challenge I faced was...</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Suggested questions
                </p>

                <div className="mt-2 space-y-2 text-sm text-slate-200">
                  <p>🎤 Tell me about yourself.</p>
                  <p>🎤 Why do you want this job?</p>
                  <p>🎤 What are your strengths?</p>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-slate-950/50 p-3">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Useful sentence
                </p>

                <p className="mt-2 text-sm font-bold text-white">
                  “Could you repeat that, please?”
                </p>
              </div>
            </div>



            </aside>
          </div>

          <div className="mt-5 rounded-[2rem] border border-white/10 bg-slate-900/90 p-4">
            <ControlBar />
          </div>
        </section>
      </LiveKitRoom>
    </main>
  );
}