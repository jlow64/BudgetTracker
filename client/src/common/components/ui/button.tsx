import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex items-center justify-center gap-md whitespace-nowrap rounded-lg font-comfortaa transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-tertiary text-background shadow transition duration-300 ease-in-out hover:scale-105",
        secondary:
          "bg-secondary text-background shadow transition duration-300 ease-in-out hover:scale-105",
        outline:
          "border border-input bg-background text-foreground stroke-foreground shadow-sm hover:bg-foreground hover:text-background hover:stroke-background active:bg-foreground/75",
        input: "border border-transparent bg-foreground",
        calendar: "hover:bg-foreground/5 hover:text-background/75",
        ghost: "border border-transparent",
      },
      size: {
        default: "h-input w-fit px-xl py-lg",
        sm: "h-fit justify-center p-sm text-subHeading",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
