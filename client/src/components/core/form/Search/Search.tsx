import { forwardRef, type ForwardedRef } from "react";
import type { SearchProps } from "./Search.props";
import { cn } from "@/lib/utils";

function SearchComponent(
  { children, className, ...props }: SearchProps,
  ref?: ForwardedRef<HTMLElement>
) {
  return (
    <search ref={ref} className={cn(`flex mt-2`, className)} {...props}>
      {children}
    </search>
  );
}

export const Search = forwardRef(SearchComponent);
