"use client";

import React from "react";
import Button from "@/components/button";
import { toast } from "sonner";

type ShareData = {
  title: string;
  text: string;
  url: string;
};

function ShareGame({ shareData }: { shareData: ShareData }) {
  async function share() {
    try {
      await navigator.share(shareData);
    } catch (error) {
      console.error("Error sharing:", error);

      toast.error("Failed to share", {
        description: "There was an error sharing the game. Please try again.",
      });
    }
  }

  return (
    <div className="flex justify-center gap-4 pt-16">
      <Button onClick={share}>Share Challenge</Button>
    </div>
  );
}

export default ShareGame;
