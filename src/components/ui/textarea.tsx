import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({
  className,
  error,
  ...props
}: React.ComponentProps<"textarea"> & { error?: boolean }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-24 w-full rounded-md border bg-transparent px-3 py-2 text-base transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        error
          ? "border-error-1000"
          : "border-neutral-100 focus-within:border-neutral-1000",
        className
      )}
      maxLength={1000}
      {...props}
    />
  );
}

export { Textarea };
