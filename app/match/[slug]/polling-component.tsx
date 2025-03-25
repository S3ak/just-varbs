"use client";

import { useEffect } from "react";

export default function PollingComponent({
  currentUrl,
}: {
  currentUrl: string;
}) {
  useEffect(() => {
    const lastUrl = currentUrl;
    const pollInterval = 2000; // Poll every 2 seconds

    const checkForChanges = () => {
      const currentPath = window.location.pathname + window.location.search;
      if (currentPath !== lastUrl) {
        window.location.reload();
      }
    };

    const intervalId = setInterval(checkForChanges, pollInterval);

    return () => clearInterval(intervalId);
  }, [currentUrl]);

  return null;
}
