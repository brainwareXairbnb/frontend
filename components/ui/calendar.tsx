"use client"

import * as React from "react"
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react"
import { DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "dropdown",
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      className={cn(
        "w-fit rounded-[34px] border border-zinc-200/80 bg-white p-8 shadow-[0_25px_80px_rgba(0,0,0,0.10)] backdrop-blur-xl",
        className
      )}
      classNames={{
        ...defaultClassNames,

        root: "w-fit",

        months: "relative flex flex-col gap-6",

        month: "space-y-5",

        nav: "absolute top-0 left-0 right-0 flex items-center justify-between",

        button_previous:
          "h-11 w-11 rounded-full border border-zinc-200 bg-white shadow-sm flex items-center justify-center hover:shadow-md hover:scale-105 transition-all",

        button_next:
          "h-11 w-11 rounded-full border border-zinc-200 bg-white shadow-sm flex items-center justify-center hover:shadow-md hover:scale-105 transition-all",

        month_caption:
          "flex justify-center items-center pb-1",

        dropdowns: "flex items-center gap-3",

        dropdown:
          "h-11 min-w-[105px] rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm font-semibold text-zinc-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500",

        caption_dropdowns:
          "flex items-center gap-3",

        years_dropdown:
          "h-11 min-w-[105px] rounded-2xl border border-zinc-200 bg-zinc-50 px-4 shadow-sm",

        months_dropdown:
          "h-11 min-w-[105px] rounded-2xl border border-zinc-200 bg-zinc-50 px-4 shadow-sm",
        caption_label:
          "hidden",

        table: "w-full border-collapse mt-3",

        weekdays: "flex mb-3",

        weekday:
          "flex-1 text-center text-[11px] font-semibold tracking-[0.18em] uppercase text-zinc-400",

        week: "flex w-full mb-2",

        day: "relative h-12 w-12 p-0",

        day_button:
          "h-12 w-12 rounded-full text-[15px] font-medium text-zinc-800 transition-all duration-200 hover:bg-zinc-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-rose-500/20",

        selected:
          "bg-gradient-to-br rounded-full from-rose-500 to-pink-500 text-white shadow-[0_10px_25px_rgba(244,63,94,0.35)] hover:from-rose-500 hover:to-pink-500",

        today:
          "border border-zinc-300 rounded-full font-semibold text-zinc-900 bg-zinc-50",

        outside:
          "text-zinc-300 opacity-100",

        disabled:
          "text-zinc-200 opacity-50 cursor-not-allowed",

        range_start:
          "bg-gradient-to-br from-rose-500 to-pink-500 text-white rounded-full",

        range_end:
          "bg-gradient-to-br from-rose-500 to-pink-500 text-white rounded-full",

        range_middle:
          "bg-rose-50 text-zinc-900 rounded-none",

        hidden: "invisible",

        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeft
                className={cn("h-4 w-4 text-zinc-700", className)}
                {...props}
              />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRight
                className={cn("h-4 w-4 text-zinc-700", className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDown
              className={cn("h-4 w-4 text-zinc-700", className)}
              {...props}
            />
          )
        },
      }}
      {...props}
    />
  )
}

export { Calendar }