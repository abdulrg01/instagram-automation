"use client";
import { useSaveListenerMutation } from "@/lib/redux/services/automation";
import React, { useEffect, useState } from "react";
import TriggerButton from "../trigger-buttom";
import { AUTOMATION_LISTENERS } from "@/constant/automation";
import { SubscriptionPlan } from "../../Subscription-plan";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "../../loader";

type Props = {
  id: string;
  refetch: () => void;
};

const ThenAction = ({ id, refetch }: Props) => {
  const [Listener, setListener] = useState<"MESSAGE" | "SMARTAI">("MESSAGE");
  const [formData, setFormData] = useState({
    prompt: "",
    replay: "",
  });
  const [saveListener, { isLoading, isSuccess }] = useSaveListenerMutation();

  useEffect(() => {
    if (isSuccess) {
      setFormData({ prompt: "", replay: "" });
      refetch();
      setListener("MESSAGE");
    }
  }, [isSuccess, refetch]);

  const handleAddListener = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!formData.prompt) {
      alert("Please add a prompt or message before submitting.");
      return;
    }
    await saveListener({
      prompt: formData.prompt,
      commentReply: formData.replay,
      id,
    }).unwrap();
  };

  const onSetListener = (type: "SMARTAI" | "MESSAGE") => setListener(type);

  return (
    <TriggerButton label="Then">
      <div className="flex flex-col gap-y-2">
        {AUTOMATION_LISTENERS.map((listener, i) =>
          listener.type === "SMARTAI" ? (
            <SubscriptionPlan key={listener.type} type="PRO">
              <div
                onClick={() => onSetListener(listener.type)}
                key={i}
                className={cn(
                  Listener === listener.type
                    ? "bg-gradient-to-br from-[#3352CC] to-[#1C2D70]"
                    : "bg-background",
                  "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100"
                )}
              >
                <div className="flex gap-x-2 items-center">
                  {listener.icon}
                  <p>{listener.label}</p>
                </div>

                <p>{listener.desc}</p>
              </div>
            </SubscriptionPlan>
          ) : (
            <div
              onClick={() => onSetListener(listener.type)}
              key={i}
              className={cn(
                Listener === listener.type
                  ? "bg-gradient-to-br from-[#3352CC] to-[#1C2D70]"
                  : "bg-background",
                "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100"
              )}
            >
              <div className="flex gap-x-2 items-center">
                {listener.icon}
                <p>{listener.label}</p>
              </div>

              <p>{listener.desc}</p>
            </div>
          )
        )}
        <form onSubmit={handleAddListener} className="flex flex-col gap-y-2">
          <textarea
            placeholder={
              Listener === "SMARTAI"
                ? "Add a prompt that your smart ai can use..."
                : "Add a message you want to send to your customer"
            }
            onChange={(e) =>
              setFormData({ ...formData, prompt: e.target.value })
            }
            className="bg-background p-3 rounded outline border-none ring-0 focus:right-0"
          />
          <Input
            onChange={(e) =>
              setFormData({ ...formData, replay: e.target.value })
            }
            placeholder="Add an replay for comment (Optional)"
            className="bg-background p-3 rounded outline border-none ring-0 focus:right-0"
          />
          <Button className="bg-gradient-to-br hover:opacity-80 w-full from-[#3352CC] font-medium text-white to-[#1C2D70]">
            <Loader state={isLoading}>Add listener</Loader>
          </Button>
        </form>
      </div>
    </TriggerButton>
  );
};

export default ThenAction;
