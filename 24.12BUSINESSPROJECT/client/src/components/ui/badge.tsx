import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent px-8 py-1 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 text-gray-800 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 dark:text-gray-200 m-4",
        secondary:
          "border-transparent px-8 py-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white dark:bg-gradient-to-r dark:from-blue-700 dark:via-blue-800 dark:to-blue-900 dark:text-gray-200 m-4",
        destructive:
          "border-transparent bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white hover:from-red-500 hover:via-red-600 hover:to-red-700 dark:bg-gradient-to-r dark:from-red-700 dark:via-red-800 dark:to-red-900 dark:text-gray-100 dark:hover:from-red-800 dark:hover:via-red-900 dark:hover:to-red-950",
        outline:
          "border border-gray-300 bg-gradient-to-r from-transparent via-gray-100 to-transparent text-gray-900 hover:from-gray-200 hover:via-gray-300 hover:to-gray-400 dark:border-gray-600 dark:bg-gradient-to-r dark:from-transparent dark:via-gray-700 dark:to-transparent dark:text-gray-200 dark:hover:from-gray-600 dark:hover:via-gray-500 dark:hover:to-gray-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
