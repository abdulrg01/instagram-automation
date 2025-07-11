import Loader from "@/components/global/loader";
import React from "react";

export default function loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Loader state>...Loading</Loader>
    </div>
  );
}
