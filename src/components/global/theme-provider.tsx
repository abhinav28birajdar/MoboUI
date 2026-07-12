import { ThemeProvider as NextThemeProvider } from "next-themes";
import React from "react";
export default function ThemeProvider({ children, ...props }: any) { return <NextThemeProvider {...props}>{children}</NextThemeProvider>; }