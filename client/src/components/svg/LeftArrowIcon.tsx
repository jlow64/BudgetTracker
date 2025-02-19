import { cn } from "@/lib/utils";
import React from "react";

export const LeftArrowIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 64 64'
      fill='none'
      className={cn("stroke-[5] stroke-foreground")}
    >
      <polyline points='45.15 57.47 19.88 30.84 45.15 6.58' />
    </svg>
  );
};
