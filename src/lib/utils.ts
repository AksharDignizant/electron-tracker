import { clsx, type ClassValue } from "clsx";
import type { ImageLoader } from "next/image";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fileSchemeImageLoader: ImageLoader = ({ src }) =>
  `.${src}`.replace(/\.\.\/+/g, "./");
