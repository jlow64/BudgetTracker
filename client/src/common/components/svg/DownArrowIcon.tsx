import { cn } from "@/lib/utils";

export const DownArrowIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width='18'
      height='10'
      viewBox='0 0 18 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn(className, "h-[10px] w-[18px]")}
    >
      <path d='M1 1L9.37257 9L17 1' />
    </svg>
  );
};
