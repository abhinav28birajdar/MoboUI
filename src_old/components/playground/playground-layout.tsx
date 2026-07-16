import React from "react";
export default function PlaygroundLayout({ children }: { children: React.ReactNode }) { return <div className="flex flex-col min-h-screen">{children}</div>; }