import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none border",
  {
    variants: {
      variant: {
        default: "",
        outline: "",
        link: "!p-0 h-auto bg-transparent border-none",
        success: "",
        error: "",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        md: "h-9 px-3 py-2 has-[>svg]:px-3",
        sm: "h-8 px-3 py-1.5 has-[>svg]:px-2.5",
      },
      color: {
        primary: "",
        neutral: "",
        success: "",
        error: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        color: "primary",
        className:
          "bg-primary-1000 text-white hover:bg-primary-700 border-primary-1000 hover:border-primary-700 focus:border-primary-500 ",
      },
      {
        variant: "default",
        color: "neutral",
        className:
          "bg-transparent border-neutral-200 text-neutral-600 hover:border-neutral-400 hover:text-neutral-400 focus:border-neutral-500",
      },
      {
        variant: "outline",
        color: "primary",
        className:
          "bg-transparent border-primary-1000 text-primary-1000 hover:border-primary-700 focus:border-primary-500",
      },
      {
        variant: "outline",
        color: "neutral",
        className:
          "bg-transparent border-neutral-100 text-neutral-1000 hover:border-neutral-700 focus:border-neutral-500",
      },
      {
        variant: "success",
        color: "success",
        className:
          "bg-success-1000 text-white hover:bg-success-700 border-success-1000 hover:border-success-700 focus:border-success-500",
      },
      {
        variant: "error",
        color: "error",
        className:
          "bg-error-1000 text-white hover:bg-error-700 border-error-1000 hover:border-error-700 focus:border-error-500",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      color: "primary",
    },
  }
);

function Button({
  className,
  variant,
  size,
  color,
  loading = false,
  asChild = false,
  children,
  disabled,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
    color?: "primary" | "neutral" | "success" | "error";
  }) {
  const Comp = asChild ? Slot : "button";
  const isDisabled = disabled || loading;

  if (asChild) {
    if (React.isValidElement(children)) {
      const childElement = children as React.ReactElement<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
      return (
        <Comp
          data-slot="button"
          className={cn(buttonVariants({ variant, size, className, color }))}
          data-disabled={isDisabled}
          aria-disabled={isDisabled}
          {...(isDisabled && { disabled: true })}
          {...props}
        >
          {React.cloneElement(childElement, {
            ...childElement.props,
            children: (
              <>
                {loading && <Spinner />}
                {childElement.props.children}
              </>
            ),
          })}
        </Comp>
      );
    }

    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className, color }))}
        data-disabled={isDisabled}
        aria-disabled={isDisabled}
        {...(isDisabled && { disabled: true })}
        {...props}
      >
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className, color }))}
      disabled={isDisabled}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
