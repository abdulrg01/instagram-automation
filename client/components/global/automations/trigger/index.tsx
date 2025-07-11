"use client";
import { useAddTriggerMutation } from "@/lib/redux/services/automation";
import React, { useEffect, useState } from "react";
import ActiveTrigger from "./ActiveTrigger";
import ThenAction from "../then/then-action";
import TriggerButton from "../trigger-buttom";
import { AUTOMATION_TRIGGER } from "@/constant/automation";
import { cn } from "@/lib/utils";
import Keywords from "./Keywords";
import { Button } from "@/components/ui/button";
import Loader from "../../loader";
import { OnAutomationInfo } from "@/app/actions/user";

type Props = {
  id: string;
};

const Trigger = ({ id }: Props) => {
  const { automation, refetch } = OnAutomationInfo(id);
  console.log("Automation ", automation);

  const [addTrigger, { isLoading, isSuccess }] = useAddTriggerMutation();
  const [triggerItem, setTrigger] = useState("");

  const hasTriggers =
    Array.isArray(automation?.trigger) && automation.trigger.length > 0;

  useEffect(() => {
    if (isSuccess) {
      refetch();
      setTrigger("");
    }
  }, [isSuccess, refetch]);

  const handleAddTrigger = async () => {
    if (!triggerItem) {
      alert("Please select a trigger before submitting.");
      return;
    }

    await addTrigger({
      id,
      trigger: triggerItem,
    });
  };

  const renderActiveTriggers = () => (
    <div className="flex flex-col gap-y-6 items-center">
      <ActiveTrigger
        type={automation?.trigger?.[0]?.type || ""}
        keywords={automation?.keywords ?? []}
      />

      {Array.isArray(automation?.trigger) && automation.trigger.length > 1 && (
        <>
          <div className="relative z-50 w-6/12">
            <p className="absolute transform px-2 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2">
              or
            </p>
            <div className="w-full border-t border-muted" />
          </div>

          <ActiveTrigger
            type={automation?.trigger?.[1]?.type || ""}
            keywords={automation?.keywords ?? []}
          />
        </>
      )}
      {(!automation?.listener || automation?.listener.length === 0) && (
        <ThenAction refetch={refetch} id={id} />
      )}
    </div>
  );

  if (isSuccess && hasTriggers) {
    return renderActiveTriggers();
  }

  if (hasTriggers) {
    return renderActiveTriggers();
  }

  return (
    <TriggerButton label="Add Trigger">
      <div className="flex flex-col gap-y-2">
        {AUTOMATION_TRIGGER.map((trigger, i) => (
          <div
            key={i}
            onClick={() => setTrigger(trigger.type)}
            className={cn(
              "flex flex-col gap-y-1 p-3 rounded-lg cursor-pointer hover:bg-secondary/10",
              trigger.type === triggerItem
                ? "bg-gradient-to-br from-[#3352CC] font-medium to-[#1C2D70]"
                : ""
            )}
          >
            <div className="flex gap-x-2 items-center">
              {trigger.icon}
              <p className="font-bold">{trigger.label}</p>
            </div>
            <p className="text-sm font-light">{trigger.desc}</p>
          </div>
        ))}

        <Keywords id={id} />

        <Button
          onClick={handleAddTrigger}
          disabled={AUTOMATION_TRIGGER?.length === 0}
          className="bg-gradient-to-br from-[#3352CC] font-medium text-white to-[#1C2D70]"
        >
          <Loader state={isLoading}>Create Trigger</Loader>
        </Button>
      </div>
    </TriggerButton>
  );
};

export default Trigger;
