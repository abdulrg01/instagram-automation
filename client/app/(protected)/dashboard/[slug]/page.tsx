"use client";
import { useAppSelector } from "@/lib/hooks";
import { redirect } from "next/navigation";
import React from "react";

export default function Page() {
  const { user } = useAppSelector((state) => state.auth);
  if (typeof window !== undefined) {
    if (!user) return redirect("/auth/sign-in");
  }

  return <div>page</div>;
}
