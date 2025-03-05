import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-h1",
        "text-h2",
        "text-h3",
        "text-h4",
        "text-h5",
        "text-h6",
        "text-subHeading",
        "text-paragraphLg",
        "text-paragraphBase",
        "text-paragraphSm",
      ],
    },
  },
});
export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
