"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/common/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/common/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/ui/popover";
import { FieldValues, Control, useController, Path } from "react-hook-form";
import { DownArrowIcon } from "./svg";

interface ICombobox<T extends FieldValues> {
  data: { value: string; label: string }[];
  name: Path<T>;
  control: Control<T>;
  popoverPlaceholder?: string;
  inputPlaceholder?: string;
}
export function Combobox<T extends FieldValues>({
  data,
  name,
  control,
  popoverPlaceholder = "Select Category",
  inputPlaceholder = "Search Category",
}: ICombobox<T>) {
  const { field } = useController({ control, name });
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn(
            "w-full max-w-[200px] justify-between",
            field.value ? "text-foreground" : "text-foreground/75"
          )}
        >
          {field.value
            ? data.find((el) => el.value === field.value)?.label
            : popoverPlaceholder}
          <DownArrowIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full max-w-[200px] p-0' align='start'>
        <Command>
          <CommandInput placeholder={inputPlaceholder} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {data.map((el) => (
                <CommandItem
                  key={el.value}
                  value={el.value}
                  onSelect={(currentValue) => {
                    field.onChange(
                      currentValue === field.value ? "" : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      field.value === el.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {el.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
