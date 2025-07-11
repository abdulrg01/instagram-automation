"use client";
import { ChevronRight, PencilIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ActivateAutomationButton from "../../activate-automation-button";
import { useEditAutomationMutation } from "@/lib/redux/services/automation";
import { Input } from "@/components/ui/input";
import { OnAutomationInfo } from "@/app/actions/user";

type Props = {
  id: string;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AutomationBreadcrumb = ({ id }: Props) => {
  const { automation, refetch } = OnAutomationInfo(id);
  const [editAutomation, { data: updateAutomationInfo, isLoading, isSuccess }] =
    useEditAutomationMutation();
  const [name, setName] = useState(automation?.name || "");

  const [edit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevNameRef = useRef(name);

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [refetch, isSuccess]);

  useEffect(() => {
    if (isSuccess) {
      setName(updateAutomationInfo.name);
    }
  }, [isSuccess, updateAutomationInfo?.name]);

  useEffect(() => {
    setName(automation?.name || "");
  }, [automation?.name]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setEdit(false);
      }
    };

    if (edit) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [edit]);

  // Save only when user finishes editing (i.e., when edit changes to false)
  useEffect(() => {
    const saveChanges = async () => {
      if (!edit && prevNameRef.current !== name) {
        if (!name.trim()) {
          alert("Automation name cannot be empty");
          return;
        }
        await editAutomation({ name, active: true, id });
        prevNameRef.current = name;
      }
    };

    saveChanges();
  }, [edit]);

  return (
    <div className="rounded-full w-full px-4 py-2 bg-[#18181B1A] flex items-center">
      <div className="flex items-center gap-x-3 min-w-0">
        <p className="text-[#9B9CA0] truncate">Automations</p>
        <ChevronRight color="#9B9CA0" className="flex-shrink-0" />
        <span className="flex gap-x-3 items-center min-w-0">
          {edit ? (
            <Input
              ref={inputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isLoading ? automation?.name : "Add a new name"}
              className="bg-transparent h-auto outline-none text-base border-none p-0"
              autoFocus
            />
          ) : (
            <>
              <p className="text-[#9B9CA0] truncate">{name}</p>
              <span
                onClick={() => setEdit(true)}
                className="mr-4 cursor-pointer hover:opacity-75 duration-100 transition flex-shrink-0"
              >
                <PencilIcon size={14} />
              </span>
            </>
          )}
        </span>
      </div>

      <div className="flex items-center gap-x-5 ml-auto">
        <p className="hidden md:block truncate text-[#9B9CA0] text-sm">
          All state are automatically saved
        </p>
        <div className="flex gap-x-5 flex-shrink-0">
          <p className="text-gray-500 text-sm truncate min-w-0">
            Changes saved
          </p>
        </div>
      </div>

      <ActivateAutomationButton id={id} />
    </div>
  );
};

export default AutomationBreadcrumb;
