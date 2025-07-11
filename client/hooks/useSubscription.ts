"use client";
import { useCreateStripePaymentMutation } from "@/lib/redux/services/userApi";

export const useSubscription = () => {
  const [createStripePayment, { isLoading }] = useCreateStripePaymentMutation();

  const onSubscribe = async () => {
    try {
      const response = await createStripePayment().unwrap();
      console.log(response?.session_url);
      if (response?.session_url) {
        window.location.href = response.session_url;
      } else {
        console.error("Session URL is not available");
      }
    } catch (error) {
      console.error("Error during subscription:", error);
    }
  };
  return { onSubscribe, isLoading };
};
