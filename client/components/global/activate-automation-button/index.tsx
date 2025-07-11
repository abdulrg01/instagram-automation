"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { ActivitySquare, Loader2 } from "lucide-react";
import { useEditAutomationMutation } from "@/lib/redux/services/automation";
import { OnAutomationInfo } from "@/app/actions/user";

type Props = {
  id: string;
};

const ActivateAutomationButton = ({ id }: Props) => {
  const { automation, refetch } = OnAutomationInfo(id);
  const [editAutomation, { isLoading, isSuccess }] =
    useEditAutomationMutation();

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);

  const onToggleAutomation = async () => {
    const state = !automation?.active;
    await editAutomation({ active: state, name: automation?.name || "", id });
  };

  return (
    <Button
      disabled={isLoading}
      onClick={onToggleAutomation}
      className="lg:px-10 bg-gradient-to-br text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70] hover:opacity-80 transition duration-100 ml-4"
    >
      {isLoading ? <Loader2 className="animate-spin" /> : <ActivitySquare />}
      <p className="lg:inline hidden">
        {automation?.active ? "Disable" : "Activate"}
      </p>
    </Button>
  );
};

export default ActivateAutomationButton;
