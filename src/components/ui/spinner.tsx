import { Slot } from "@radix-ui/react-slot";
import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

function Spinner({
  className,
  asChild,
  noWrapper = false,
  spinnerClass,
  ...props
}: React.ComponentProps<"svg"> & {
  asChild?: boolean;
  noWrapper?: boolean;
  spinnerClass?: string;
}) {
  const spinnerElement = (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", spinnerClass)}
      {...props}
    />
  );

  if (noWrapper) {
    return spinnerElement;
  }

  if (asChild) {
    return <Slot className={cn(className)}>{spinnerElement}</Slot>;
  }

  return <div className={cn(className)}>{spinnerElement}</div>;
}

export { Spinner };
