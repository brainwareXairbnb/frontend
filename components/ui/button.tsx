import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-on-surface text-surface hover:bg-primary transition-all active:scale-95 font-black text-[10px] uppercase tracking-[0.2em] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "bg-white border-2 border-outline-variant/5 text-on-surface hover:bg-[#FAFAFA] hover:border-primary/20 transition-all active:scale-[0.98] font-black text-[10px] uppercase tracking-widest",
        secondary:
          "bg-secondary-container text-secondary hover:bg-secondary-container/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-14 px-8",
        sm: "h-10 px-6 text-[9px]",
        lg: "h-16 px-10",
        icon: "h-10 w-10",
      },
      rounded: {
        default: "rounded-full",
        md: "rounded-[1rem]",
        lg: "rounded-[2rem]",
        xl: "rounded-[3rem]",
        "2xl": "rounded-2xl",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
