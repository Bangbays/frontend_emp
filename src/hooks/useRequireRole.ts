"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function useRequireRole(allowed: string[]) {
  const router = useRouter();
  const role = useSelector((s: RootState) => s.auth.user?.role);

  useEffect(() => {
    if (role && !allowed.includes(role)) {
      router.replace("/unauthorized");
    }
  }, [role, router, allowed]);
}
