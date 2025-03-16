"use client";

import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/common/components/ui";
import { Calendar } from "@/common/components/ui";
import { CalendarIcon } from "./svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/ui";
import { Control, FieldValues, Path, useController } from "react-hook-form";

interface IDatePicker<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}

export function DatePicker<T extends FieldValues>({
  name,
  control,
}: IDatePicker<T>) {
  const { field } = useController({ control, name });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            "w-full max-w-[200px] h-input justify-center gap-4 font-comfortaa",
            field.value ? "text-foreground" : "text-foreground/75"
          )}
        >
          {field.value ? format(field.value, "PPP") : "Pick a date"}
          <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0' align='start'>
        <Calendar
          mode='single'
          selected={field.value}
          onSelect={field.onChange}
          initialFocus
          disabled={{ after: new Date() }}
        />
      </PopoverContent>
    </Popover>
  );
}
