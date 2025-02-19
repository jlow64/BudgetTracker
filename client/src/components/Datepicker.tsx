"use client";

import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { Calendar } from "@/components/ui";
import { CalendarIcon } from "./svg";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui";

export function DatePicker() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            "w-full max-w-[200px] h-input justify-center gap-4 font-comfortaa",
            date ? "text-foreground" : "text-foreground/75"
          )}
        >
          {date ? format(date, "PPP") : "Pick a date"}
          <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0' align='start'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
