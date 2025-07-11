"use client";
import { Input } from "@/components/ui/input";
import {
  useAddKeywordMutation,
  useGetAutomationInfoQuery,
} from "@/lib/redux/services/automation";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = { id: string };

const Keywords = ({ id }: Props) => {
  const [addKeyword, { data: latestKeyword, isSuccess }] =
    useAddKeywordMutation();
  const { data, refetch } = useGetAutomationInfoQuery(id);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (isSuccess) {
      refetch();
      setKeyword("");
    }
  }, [isSuccess, refetch]);

  const onKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(keyword, "keyword");
      if (!keyword.trim()) {
        alert("Please enter a keyword before submitting.");
        return;
      }
      await addKeyword({
        id: id,
        word: keyword,
      });
    }
  };
  //   WIP
  //   const deleteKeyword = async (id: string) => {};

  return (
    <div className="bg-background flex flex-col gap-y-3 p-3 rounded-xl">
      <p className="text-sm text-secondary">
        Add words that trigger automation
      </p>
      <div className="flex flex-wrap justify-start gap-2 items-center">
        {data?.keywords &&
          data.keywords?.length > 0 &&
          data.keywords.map(
            (word) =>
              word._id !== latestKeyword?.keywords[0]._id && (
                <div
                  key={word._id}
                  className="bg-background flex items-center gap-x-2 capitalize text-gray-400 py-1 px-4 rounded-full"
                >
                  <p>{word.word}</p>
                  {/* WORK IN PROGRESS */}
                  {/* <X size={20} onClick={() => deleteKeyword(word._id)} /> */}
                  <X size={20} />
                </div>
              )
          )}

        <Input
          placeholder="Add keyword..."
          style={{
            width: Math.min(Math.max(keyword.length || 10, 2), 50) + "ch",
          }}
          value={keyword}
          className="p-0 bg-transparent ring-0 border-none outline-none"
          onChange={(e) => setKeyword(e.target.value)}
          onKeyUp={onKeyPress}
        />
      </div>
    </div>
  );
};

export default Keywords;
