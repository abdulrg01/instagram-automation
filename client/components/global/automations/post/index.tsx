"use client";
import {
  useAutomationPostMutation,
} from "@/lib/redux/services/automation";
import { useGetPostsQuery } from "@/lib/redux/services/userApi";
import React, { useState } from "react";
import TriggerButton from "../trigger-buttom";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Loader from "../../loader";
import { InstagramPostsProps } from "@/constant/types/automation";

type Props = { id: string };

const PostButton = ({ id }: Props) => {
  const { data, isLoading } = useGetPostsQuery();
  console.log(data);

  const [automationPost, { data: automationPosts }] =
    useAutomationPostMutation();
  console.log(automationPosts);

  const [posts, setPosts] = useState<
    {
      postId: string;
      caption?: string;
      media: string;
      mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
    }[]
  >([]);

  const onSelectPosts = async (post: {
    postId: string;
    caption: string;
    media: string;
    mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  }) => {
    setPosts((prevItems) => {
      if (prevItems.find((p) => p.postId === post.postId)) {
        return prevItems.filter((item) => item.postId !== post.postId);
      } else {
        return [...prevItems, post];
      }
    });
  };

  const onSavePosts = async () => {
    await Promise.all(
      posts.map((post) =>
        automationPost({
          postId: post.postId,
          caption: post.caption,
          media: post.media,
          mediaType: post.mediaType,
          automationId: id,
        }).unwrap()
      )
    );
    setPosts([]);
  };

  return (
    <TriggerButton label="Attach a post">
      {data ? (
        <div className="flex flex-col gap-y-3 w-full">
          <div className="flex flex-wrap w-full gap-3">
            {data.map((post: InstagramPostsProps) => (
              <div
                className="relative w-4/12 aspect-square rounded-lg cursor-pointer overflow-hidden"
                key={post.id}
                onClick={() =>
                  onSelectPosts({
                    postId: post.id,
                    media: post.media_url,
                    mediaType: post.media_type,
                    caption: post.caption || "",
                  })
                }
              >
                {posts.find((p) => p.postId === post.id) && (
                  <CheckCircle
                    fill="white"
                    stroke="black"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
                  />
                )}
                <Image
                  fill
                  src={post.media_url}
                  sizes="100vw"
                  alt="post image"
                  className={cn(
                    "hover:opacity-75 transition duration-100",
                    posts.find((p) => p.postId === post.id) && "opacity-75"
                  )}
                />
              </div>
            ))}
          </div>
          <Button
            onClick={onSavePosts}
            disabled={posts.length === 0}
            className="bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70]"
          >
            <Loader state={isLoading}>Attach Post</Loader>
          </Button>
        </div>
      ) : (
        <p className="text-secondary text-center">No posts found</p>
      )}
    </TriggerButton>
  );
};

export default PostButton;
