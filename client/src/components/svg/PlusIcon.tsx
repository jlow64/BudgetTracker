import { cn } from "@/lib/utils";

export const PlusIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox='0 0 33 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn(
        "stroke-2 stroke-inherit [stroke-linecap:round]",
        className
      )}
    >
      <path d='M16.4886 3.5V28.5' strokeLinecap='round' />
      <path d='M3.98865 16H28.9886' strokeLinecap='round' />
    </svg>
  );
};
