"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DownArrowIcon } from "./svg";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

interface ICombobox {
  data: { value: string; label: string }[];
  popoverPlaceholder?: string;
  inputPlaceholder?: string;
}
export function Combobox({
  data,
  popoverPlaceholder = "Select Category",
  inputPlaceholder = "Seach Category",
}: ICombobox) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  // Will need to take in:
  // popoverPlaceholder
  // inputPlaceholder
  // list of Value and Labels

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn(
            "w-full max-w-[200px] justify-between",
            value ? "text-foreground" : "text-foreground/75"
          )}
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
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
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
