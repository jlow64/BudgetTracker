import { cn } from "@/lib/utils";
import React from "react";

export const CashflowIcon = () => {
  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn("w-lg h-lg stroke-foreground")}
    >
      <path d='M9.41504 19.01H5.91504V24.735H9.41504V19.01Z' fill='#C0E1F6' />
      <path d='M15.915 11.56H12.415V24.735H15.915V11.56Z' fill='#BFCFF5' />
      <path d='M22.415 14.1H18.915V24.735H22.415V14.1Z' fill='#C0E1F6' />
      <path d='M28.915 6.53999H25.415V24.74H28.915V6.53999Z' fill='#BFCFF5' />
      <path d='M2.87988 3.39V27.82H30.8499' />
    </svg>
  );
};
