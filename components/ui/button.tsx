import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  `
  relative inline-flex items-center justify-center gap-2
  whitespace-nowrap select-none cursor-pointer overflow-hidden
  transition-all duration-300 ease-out
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40 focus-visible:ring-offset-2
  disabled:pointer-events-none disabled:opacity-50
  active:scale-[0.98]
  [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
  text-sm font-semibold
  `,
  {
    variants: {
      variant: {
        /* Airbnb Primary */
        default: `
          bg-gradient-to-r from-rose-500 to-pink-500
          text-white
          shadow-[0_10px_30px_rgba(255,56,92,0.25)]
          hover:shadow-[0_18px_40px_rgba(255,56,92,0.32)]
          hover:-translate-y-[1px]
        `,

        destructive: `
          bg-red-500 text-white
          hover:bg-red-600
          shadow-sm
        `,

        /* Clean Airbnb Outline */
        outline: `
          bg-white text-zinc-800
          border border-zinc-300
          hover:border-zinc-400
          hover:bg-zinc-50
          shadow-sm
        `,

        secondary: `
          bg-zinc-100 text-zinc-900
          hover:bg-zinc-200
        `,

        ghost: `
          text-zinc-700
          hover:bg-zinc-100
        `,

        link: `
          text-rose-500 underline-offset-4 hover:underline
        `,
      },

      size: {
        xs: 'h-8 px-2 text-xs',
        sm: 'h-10 px-4 text-sm',
        default: 'h-12 px-5 text-sm',
        lg: 'h-14 px-6 text-base',
        xl: 'h-16 px-8 text-base',
        icon: 'h-12 w-12',
      },

      rounded: {
        sm: 'rounded-xl',
        default: 'rounded-2xl',
        md: 'rounded-2xl',
        lg: 'rounded-3xl',
        xl: 'rounded-full',
        '2xl': 'rounded-[24px]',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, rounded, asChild = false, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, rounded }),
          'w-full sm:w-auto', // mobile responsive
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }