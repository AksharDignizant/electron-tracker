import * as React from "react";

import { cn } from "@/lib/utils";

function Input({
  className,
  startIcon,
  endIcon,
  error,
  wrapperClassName = "",
  disabled = false,
  ...props
}: React.ComponentProps<"input"> & {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  error?: boolean;
  wrapperClassName?: string;
  disabled?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 h-10 border rounded-lg text-sm focus-visible:outline-none focus-visible:ring-0 bg-white",
        error
          ? "border-error-1000"
          : "border-neutral-100 focus-within:border-neutral-1000 transition-all",
        wrapperClassName
      )}
    >
      <input
        data-slot="input"
        className={cn(
          "w-full order-2 bg-transparent",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        disabled={disabled}
        {...props}
      />

      {startIcon && (
        <span
          className={cn(
            "order-1",
            "[&_svg]:size-4",
            "[&_svg]:text-neutral-600"
          )}
        >
          {startIcon}
        </span>
      )}
      {endIcon && (
        <span
          className={cn(
            "order-3",
            "[&_svg]:size-4",
            "[&_svg]:text-neutral-600"
          )}
        >
          {endIcon}
        </span>
      )}
    </div>
  );
}

export { Input };
