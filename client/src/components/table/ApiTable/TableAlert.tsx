import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

export function TableAlert({
  children,
  mode,
}: PropsWithChildren<{ mode: "destructive" | "subtle" }>) {
  const classNames = cn([
    `flex items-center justify-center py-8 border`,
    `alert-${mode}`,
  ]);
  return <div className={classNames}>{children}</div>;
}
