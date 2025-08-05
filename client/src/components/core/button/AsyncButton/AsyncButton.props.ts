import type { Button } from "@/components/ui/button";
import type { ComponentProps, ReactNode } from "react";

export interface AsyncButtonProps extends ComponentProps<typeof Button> {
  /*Is there an asyncronous operation running that disables this button? */
  isBusy?: boolean | null;
  // Slot for rendering on the right side of the button
  rightSection?: () => ReactNode;
}