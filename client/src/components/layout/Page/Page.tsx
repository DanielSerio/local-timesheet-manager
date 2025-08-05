import { cn } from "@/lib/utils";
import type { PageProps } from "./Page.props";

export function Page({ className, children, id, ...props }: PageProps) {
  const classNames = cn(["relative", "flex-1", className]);
  return (
    <main id={id ?? "page"} className={classNames} {...props}>
      {children}
    </main>
  );
}
