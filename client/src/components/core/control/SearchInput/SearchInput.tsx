import { forwardRef, type ForwardedRef } from "react";
import type { SearchInputProps } from "./SearchInput.props";
import { cn } from "@/lib/utils";

function SearchInputComponent(
  { className, ...props }: SearchInputProps,
  ref?: ForwardedRef<HTMLInputElement>
) {
  const classNames = cn([
    `w-full border rounded rounded-[3px] min-h-[36px] px-2`,
    className,
  ]);
  return <input type="search" className={classNames} ref={ref} {...props} />;
}

export const SearchInput = forwardRef(SearchInputComponent);
