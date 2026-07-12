import React from "react";
export default function ComponentGrid({ children }: { children: React.ReactNode }) { return <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{children}</div>; }