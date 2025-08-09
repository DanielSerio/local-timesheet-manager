import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";
import { Header } from "./Header";

export interface FrameProps extends PropsWithChildren {
  headerHeight?: number;
}

export function Frame({ children, headerHeight }: FrameProps) {
  const classNames = cn(["relative", "min-h-screen", "flex", "flex-col"]);

  return (
    <div
      className={classNames}
      style={headerHeight ? { paddingTop: headerHeight } : undefined}
    >
      <Header />
      {children}
    </div>
  );
}
