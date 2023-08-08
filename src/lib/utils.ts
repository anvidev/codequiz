import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeDelta(timeInSeconds: number) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  const timeParts = [];

  if (hours > 0) {
    timeParts.push(`${hours}h`);
  }

  if (minutes > 0) {
    timeParts.push(`${minutes}m`);
  }

  if (seconds > 0 || timeParts.length === 0) {
    timeParts.push(`${seconds.toString().padStart(2, "0")}s`);
  }

  return timeParts.join(" ");
}
