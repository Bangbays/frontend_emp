"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

interface EventItem {
  id: string;
  name: string;
  date: string;
}

export default function OverviewPage() {
  const [totalSales, setTotalSales] = useState(0);
  const [attendees, setAttendees] = useState(0);
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    axios.get("/organizer/summary").then((r) => {
      setTotalSales(r.data.totalSales);
      setAttendees(r.data.attendees);
    });

    axios.get<EventItem[]>("/organizer/events").then((r) => setEvents(r.data));
  }, []);

  return (
    <div className="space-y-8">
      {/* Judul */}
      <h1 className="text-3xl font-bold">Dashboard Organizer</h1>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow flex flex-col">
          <span className="text-gray-500">Total Sales</span>
          <span className="text-2xl font-semibold mt-2">
            ${totalSales.toLocaleString()}
          </span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex flex-col">
          <span className="text-gray-500">Attendees</span>
          <span className="text-2xl font-semibold mt-2">
            {attendees.toLocaleString()}
          </span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex flex-col">
          <span className="text-gray-500">Monthly Overview</span>
          {/* placeholder chart */}
          <div className="mt-4 h-24 flex items-end justify-between">
            {[50, 30, 70, 55, 90].map((h, i) => (
              <div
                key={i}
                className="bg-indigo-600"
                style={{ height: `${h}%`, width: "16%" }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            {["Jan", "Feb", "Mar", "Apr", "Jun"].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Events</h2>
          <button
            onClick={() => {
              // navigasi ke page create event
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Create New Event
          </button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2">Event Name</th>
              <th className="py-2">Date</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id} className="border-b hover:bg-gray-50">
                <td className="py-3">{e.name}</td>
                <td className="py-3">
                  {format(new Date(e.date), "MMMM d, yyyy")}
                </td>
                <td className="py-3 space-x-2">
                  <button className="px-3 py-1 border rounded hover:bg-gray-100">
                    Edit
                  </button>
                  <button className="px-3 py-1 border rounded hover:bg-gray-100">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan={3} className="py-4 text-center text-gray-500">
                  Belum ada event
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
