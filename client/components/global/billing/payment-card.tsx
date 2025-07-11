import { Button } from "@/components/ui/button";
import { plans } from "@/constant/page";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import React from "react";

type Props = {
  label: string;
  current: "PRO" | "FREE";
  landing?: boolean;
};

const PaymentCard = ({ label, landing, current }: Props) => {
  return (
    <div
      className={cn(
        label !== current
          ? "bg-white"
          : "bg-gradient-to-r from-indigo-500 via-purple-500  to-pink-500",
        "p-[2px] rounded-xl overflow-hidden"
      )}
    >
      <div
        className={cn(
          landing && "bg-pink-500",
          "flex flex-col rounded-xl pl-5 pr-10 bg-background p-5"
        )}
      >
        {landing ? (
          <h2 className="text-2xl">
            {label === "PRO" && "Premium Plan"}
            {label === "FREE" && "Standard"}
          </h2>
        ) : (
          <h2 className="text-2xl">
            {label === current
              ? "Your current plan"
              : current === "PRO"
              ? "Downgrade"
              : "Upgrade"}
          </h2>
        )}

        <p className="text-gray-600 text-sm my-3">
          This is what your plan covers for automations and AI features.
        </p>
        {label === "PRO" ? (
          <span className="bg-gradient-to-r text-3xl from-indigo-500 via-purple-500 font-bold to-pink-500 bg-clip-text text-transparent">
            Smart AI
          </span>
        ) : (
          <p className="font-bold text-gray-600">Standard</p>
        )}

        {label === "PRO" ? (
          <p className="mb-2">
            <b className="text-xl">$99 </b> month
          </p>
        ) : (
          <p className="text-xl mb-2">Free</p>
        )}

        {plans[label === "PRO" ? 1 : 0].features.map((i) => (
          <p className="mt-2 text-muted-foreground flex gap-2" key={i}>
            <CircleCheck className="text-indigo-500 h-6 w-6" />
            {i}
          </p>
        ))}
        {landing ? (
          <Button
            className={cn(
              "rounded-full mt-5",
              label === "PRO"
                ? "bg-gradient-to-r from-indigo-500 text-white via-purple-500 to-pink-500"
                : "bg-background text-white hover:text-background"
            )}
          >
            {label === current
              ? "Get Started"
              : current === "PRO"
              ? "FREE"
              : "Get Started"}
          </Button>
        ) : (
          <Button
            className="rounded-full mt-5 bg-background text-white hover:text-background"
            disabled={label === current}
          >
            {label === current
              ? "Active"
              : current === "PRO"
              ? "Downgrade"
              : "Upgrade"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PaymentCard;
