"use client";
import { ReactNode } from "react";
import Link from "next/link";
import { useRequireRole } from "@/hooks/useRequireRole";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
}

export default function OrganizerLayout({ children }: Props) {
  useRequireRole(["ORGANIZER"]);

  const { clearToken } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    clearToken();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Topbar */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          mosfeed
        </Link>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-700 hover:underline"
        >
          Log Out
        </button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r">
          <nav className="p-4 space-y-2">
            {[
              ["Overview", "/dashboard/overview"],
              ["My Events", "/dashboard/my-events"],
              ["Transactions", "/dashboard/transactions"],
              ["Attendees", "/dashboard/attendees"],
              ["Statistics", "/dashboard/statistics"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="block px-3 py-2 rounded hover:bg-indigo-50"
              >
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
