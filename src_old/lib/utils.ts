import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";
import slugifyLib from "slugify";
import { nanoid } from "nanoid";
import copy from "copy-to-clipboard";
import { Code, Smartphone, Monitor, LayoutTemplate } from "lucide-react";
import React from "react";
import { ComponentFramework } from "@/types/component";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, formatStr: string = "MMM d, yyyy") {
  return format(new Date(date), formatStr);
}

export function formatRelativeTime(date: string | Date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function slugify(text: string) {
  return slugifyLib(text, { lower: true, strict: true });
}

export function generateId() {
  return nanoid();
}

export function copyToClipboard(text: string) {
  return copy(text);
}

export function formatNumber(n: number) {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function groupBy<T>(array: T[], key: keyof T | ((item: T) => string)): Record<string, T[]> {
  return array.reduce((result, currentItem) => {
    const groupKey = typeof key === 'function' ? key(currentItem) : String(currentItem[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(currentItem);
    return result;
  }, {} as Record<string, T[]>);
}

export function getFrameworkColor(framework: ComponentFramework | string) {
  switch (framework) {
    case "flutter":
      return "text-blue-400";
    case "react_native":
      return "text-cyan-400";
    case "expo":
      return "text-white";
    case "web":
      return "text-orange-400";
    default:
      return "text-slate-400";
  }
}

export function getFrameworkIcon(framework: ComponentFramework | string): any {
  switch (framework) {
    case "flutter":
      return Smartphone;
    case "react_native":
      return Code;
    case "expo":
      return LayoutTemplate;
    case "web":
      return Monitor;
    default:
      return Code;
  }
}
