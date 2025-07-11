"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "@/lib/hooks";
import { toast } from "sonner";

const InstagramAuth = () => {
  const { user, token } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    // const code = new URLSearchParams(window.location.search).get("code");
    const code = router.query.code;
    if (!code) {
      toast("Authorization code missing in URL.");
      return;
    }

    const getAccessToken = async () => {
      try {
        const res = await fetch("/api/v1/meta/exchange-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ code }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to connect Instagram.");
        }

        const data = await res.json();
        console.log("Instagram Account Linked:", data);
        toast("Instagram connected successfully! Redirecting...");
        router.push(`/dashboard/${user?.name}`);
      } catch (err) {
        console.error(err);
        toast("Error connecting Instagram: " + err);
      }
    };

    getAccessToken();
  }, [router.query.code, router, user?.name, token]);

  return <div>Connecting your Instagram account...</div>;
};

export default InstagramAuth;
