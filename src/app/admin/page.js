"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);

  const [learners, setLearners] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [reports, setReports] = useState([]);

  const ADMIN_EMAILS = ["sergiocoria.my@gmail.com"];

  async function handleSignOut() {
  await supabase.auth.signOut();
  window.location.href = "/";
}

  useEffect(() => {
  async function loadAdminData() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !ADMIN_EMAILS.includes(user.email)) {
      window.location.href = "/sign-in";
      return;
    }

    const [
      learnersResult,
      coachesResult,
      bookingsResult,
      reportsResult,
    ] = await Promise.all([
      supabase.from("learner_profiles").select("*"),
      supabase.from("coach_profiles").select("*"),
      supabase.from("bookings").select("*"),
      supabase.from("reports").select("*"),
    ]);

    if (!learnersResult.error) setLearners(learnersResult.data || []);
    if (!coachesResult.error) setCoaches(coachesResult.data || []);
    if (!bookingsResult.error) setBookings(bookingsResult.data || []);
    if (!reportsResult.error) setReports(reportsResult.data || []);

    setLoading(false);
  }

  loadAdminData();
}, []);

  const totalLearners = learners.length;
  const totalCoaches = coaches.length;

  const activeBookings = bookings.filter(
    (booking) =>
      booking.status === "scheduled" || booking.status === "in_progress"
  ).length;

  const completedSessions = bookings.filter(
    (booking) => booking.status === "completed"
  ).length;

  const learnersWithoutBooking = learners.filter((learner) => {
    return !bookings.some(
      (booking) =>
        booking.learner_id === learner.id &&
        booking.status !== "cancelled"
    );
  }).length;

  const availableCoaches = coaches.filter(
    (coach) => coach.is_available === true
  ).length;

  const openReports = reports.filter(
    (report) => report.status === "open" || report.status === "reviewing"
  ).length;

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        Loading admin dashboard...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="flex items-start justify-between gap-6">
            <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
                Admin Dashboard
                </p>

                <h1 className="mt-2 text-4xl font-bold tracking-tight">
                Binolin control panel
                </h1>

                <p className="mt-3 max-w-2xl text-slate-300">
                Overview of learners, coaches, sessions, matching demand, and risk
                reports.
                </p>
            </div>

            <button
                onClick={handleSignOut}
                className="rounded-2xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-900"
            >
                Sign out
            </button>
            </div>

        <section className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total learners" value={totalLearners} />
          <StatCard title="Total coaches" value={totalCoaches} />
          <StatCard title="Active bookings" value={activeBookings} />
          <StatCard title="Completed sessions" value={completedSessions} />
          <StatCard title="Learners waiting" value={learnersWithoutBooking} />
          <StatCard title="Available coaches" value={availableCoaches} />
          <StatCard title="Open reports" value={openReports} danger />
          <StatCard title="Total bookings" value={bookings.length} />
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <Panel title="Recent learners">
            <DataTable
              headers={["Name", "Level", "Goal"]}
              rows={learners.slice(0, 6).map((learner) => [
                learner.full_name || "No name",
                learner.english_level || "N/A",
                learner.goal || "N/A",
              ])}
            />
          </Panel>

          <Panel title="Coaches">
            <DataTable
              headers={["Name", "Specialty", "Available"]}
              rows={coaches.slice(0, 6).map((coach) => [
                coach.full_name || "No name",
                coach.specialty || "N/A",
                coach.is_available ? "Yes" : "No",
              ])}
            />
          </Panel>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <Panel title="Recent sessions">
            <DataTable
              headers={["Learner", "Coach", "Status"]}
              rows={bookings.slice(0, 8).map((booking) => [
                booking.learner_id || "N/A",
                booking.coach_id || "N/A",
                booking.status || "N/A",
              ])}
            />
          </Panel>

          <Panel title="Risk reports">
            {reports.length === 0 ? (
              <p className="text-sm text-slate-400">No reports yet.</p>
            ) : (
              <DataTable
                headers={["Reason", "Status", "Created"]}
                rows={reports.slice(0, 8).map((report) => [
                  report.reason || "N/A",
                  report.status || "open",
                  report.created_at
                    ? new Date(report.created_at).toLocaleDateString()
                    : "N/A",
                ])}
              />
            )}
          </Panel>
        </section>
      </section>
    </main>
  );
}

function StatCard({ title, value, danger }) {
  return (
    <div
      className={`rounded-3xl border p-6 ${
        danger
          ? "border-red-500/40 bg-red-500/10"
          : "border-slate-800 bg-slate-900"
      }`}
    >
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-3 text-4xl font-bold">{value}</p>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-5 text-xl font-bold">{title}</h2>
      {children}
    </div>
  );
}

function DataTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-700 text-slate-400">
            {headers.map((header) => (
              <th key={header} className="pb-3 pr-4 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-slate-800">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="py-3 pr-4 text-slate-200">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}