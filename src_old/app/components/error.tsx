"use client";

import React from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="text-center py-20 text-error flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">An error occurred loading catalog.</h2>
      <p className="text-sm text-muted-foreground">{error?.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-accent hover:bg-accent-dark text-white rounded-md text-sm transition-colors"
      >
        Try again
      </button>
    </div>
  );
}