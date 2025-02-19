import { cn } from "@/lib/utils";

export const CalendarIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn(className, "min-w-[28px] min-h-[28px] stroke-inherit")}
    >
      <path
        d='M19.4662 3.59625H4.53369C4.01592 3.59625 3.59619 4.01599 3.59619 4.53375V19.4663C3.59619 19.984 4.01592 20.4038 4.53369 20.4038H19.4662C19.984 20.4038 20.4037 19.984 20.4037 19.4663V4.53375C20.4037 4.01599 19.984 3.59625 19.4662 3.59625Z'
        strokeOpacity='0.75'
      />
      <path d='M3.59619 7.72125H20.4037' strokeOpacity='0.75' />
      <path d='M7.38745 3.59625V1.72125' strokeOpacity='0.75' />
      <path d='M16.3726 3.59625V1.72125' strokeOpacity='0.75' />
      <path
        d='M8.35874 10.47H6.05249V12.7763H8.35874V10.47Z'
        fill='#BFCFF5'
        strokeOpacity='0.75'
      />
      <path
        d='M13.0987 10.47H10.7925V12.7763H13.0987V10.47Z'
        fill='#C0E1F6'
        strokeOpacity='0.75'
      />
      <path
        d='M17.7787 10.47H15.4724V12.7763H17.7787V10.47Z'
        fill='#BFCFF5'
        strokeOpacity='0.75'
      />
      <path
        d='M8.44126 14.88H6.13501V17.1863H8.44126V14.88Z'
        fill='#C0E1F6'
        strokeOpacity='0.75'
      />
      <path
        d='M13.1849 14.88H10.8787V17.1863H13.1849V14.88Z'
        fill='#BFCFF5'
        strokeOpacity='0.75'
      />
      <path
        d='M17.8651 14.88H15.5588V17.1863H17.8651V14.88Z'
        fill='#C0E1F6'
        strokeOpacity='0.75'
      />
    </svg>
  );
};
