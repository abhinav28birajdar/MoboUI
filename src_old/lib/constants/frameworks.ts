import { getFrameworkColor, getFrameworkIcon } from "@/lib/utils";
import { ComponentFramework } from "@/types/component";
import React from "react";

export interface FrameworkDef {
  id: ComponentFramework;
  name: string;
  label: string;
  color: string;
  icon: React.ElementType;
  fileExtension: string;
  monacoLanguage: string;
}

export const frameworks: FrameworkDef[] = [
  {
    id: "flutter",
    name: "Flutter",
    label: "Flutter",
    color: getFrameworkColor("flutter"),
    icon: getFrameworkIcon("flutter"),
    fileExtension: "dart",
    monacoLanguage: "dart",
  },
  {
    id: "react_native",
    name: "React Native",
    label: "React Native",
    color: getFrameworkColor("react_native"),
    icon: getFrameworkIcon("react_native"),
    fileExtension: "tsx",
    monacoLanguage: "typescript",
  },
  {
    id: "expo",
    name: "Expo",
    label: "Expo",
    color: getFrameworkColor("expo"),
    icon: getFrameworkIcon("expo"),
    fileExtension: "tsx",
    monacoLanguage: "typescript",
  },
  {
    id: "web",
    name: "Web",
    label: "Web",
    color: getFrameworkColor("web"),
    icon: getFrameworkIcon("web"),
    fileExtension: "tsx",
    monacoLanguage: "typescript",
  },
];
