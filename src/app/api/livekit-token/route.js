import { AccessToken } from "livekit-server-sdk";
import { createClient } from "@supabase/supabase-js";

export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization");
    const accessToken = authHeader?.replace("Bearer ", "");

    if (!accessToken) {
      return Response.json({ error: "Missing auth token" }, { status: 401 });
    }

    const { bookingId, participantName } = await request.json();

    if (!bookingId || !participantName) {
      return Response.json(
        { error: "bookingId and participantName are required" },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      }
    );

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(accessToken);

    if (userError || !user) {
      return Response.json({ error: "Invalid user" }, { status: 401 });
    }

    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select("id, learner_id, coach_id, room_name")
      .eq("id", bookingId)
      .single();

    if (bookingError || !booking) {
      return Response.json({ error: "Booking not found" }, { status: 404 });
    }

    const { data: learnerProfile, error: profileError } = await supabase
    .from("learner_profiles")
    .select("id, user_id")
    .eq("id", booking.learner_id)
    .single();

    if (profileError || !learnerProfile) {
    return Response.json({ error: "Learner profile not found" }, { status: 404 });
    }

    const isLearner = learnerProfile.user_id === user.id;
    const isCoach = booking.coach_id === user.id;

    if (!isLearner && !isCoach) {
    return Response.json(
        { error: "You are not allowed to join this room" },
        { status: 403 }
    );
    }
    const roomName = booking.room_name || `booking_${booking.id}`;

    const token = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      {
        identity: user.id,
        name: participantName,
      }
    );

    token.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
    });

    const jwt = await token.toJwt();

    return Response.json({ token: jwt, roomName });
  } catch (error) {
    console.error("LiveKit token error:", error);
    return Response.json(
      { error: "Failed to create token" },
      { status: 500 }
    );
  }
}