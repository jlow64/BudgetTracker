import { cn } from "@/lib/utils";
import React from "react";

export const RightArrowIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 64 64'
      fill='none'
      className={cn("stroke-[5] stroke-foreground")}
    >
      <polyline points='18.86 57.47 44.12 30.84 18.86 6.58' />
    </svg>
  );
};
