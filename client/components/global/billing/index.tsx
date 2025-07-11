"use client";
import { useAppSelector } from "@/lib/hooks";
import PaymentCard from "./payment-card";
import { OnUserInfo } from "@/app/actions/user";

const Billing = () => {
  const { user: userInfo } = useAppSelector((state) => state.auth);
  const { user } = OnUserInfo(userInfo?._id || "");

  return (
    <div className="flex lg:flex-row flex-col gap-5 w-full lg:w-10 xl:w-8/12 container">
      <PaymentCard current={user?.subscription.plan ?? "FREE"} label="PRO" />
      <PaymentCard current={user?.subscription.plan ?? "FREE"} label="FREE" />
    </div>
  );
};

export default Billing;
