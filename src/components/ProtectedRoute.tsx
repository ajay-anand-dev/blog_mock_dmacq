"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { authQuery } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authQuery.isLoading) return;
    if (!authQuery.data) {
      router.replace("/login");
    }
  }, [authQuery.isLoading, authQuery.data, router]);

  if (authQuery.isLoading) {
    return <p>Checking authentication...</p>;
  }

  if (!authQuery.data) {
    return null; // Don't flash children before redirect
  }

  return <>{children}</>;
}
