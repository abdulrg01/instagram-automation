"use client";
import { redirect, useSearchParams } from "next/navigation";
import { useStripeVerificationMutation } from "@/lib/redux/services/userApi";
import { useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";

const Page = () => {
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id") || undefined;
  const cancel = searchParams.get("cancel") || undefined;
  const { user } = useAppSelector((state) => state.auth);

  const [stripeVerification, { isSuccess, isError }] =
    useStripeVerificationMutation();

  useEffect(() => {
    if (isSuccess) {
      redirect(`/dashboard/${user?.name}`);
    }
  }, [isSuccess, user]);

  useEffect(() => {
    if (session_id) {
      stripeVerification({ session_id })
        .unwrap()
        .catch((error) => {
          console.error("Error during Stripe verification:", error);
        });
    }
  }, [session_id, stripeVerification]);

  if (isError || cancel) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-full">
        <h4 className="text-5xl font-bold">404</h4>
        <p className="text-xl font-bold">Oops, something went wrong</p>
      </div>
    );
  }

  return null;
};

export default Page;
