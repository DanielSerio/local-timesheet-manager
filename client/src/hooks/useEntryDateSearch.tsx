import { useRef, useState, type KeyboardEvent } from "react";

let entryDateTimeout: NodeJS.Timeout;

export function useEntryDateSearch() {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Should be applied to a `<search>` element that is wrapped around the input.
   */
  const onSearchKeyDown = (ev: KeyboardEvent<HTMLElement>) => {
    ev.stopPropagation();

    if (entryDateTimeout) {
      clearTimeout(entryDateTimeout);
    }

    entryDateTimeout = setTimeout(() => {
      if (inputRef.current) {
        const { value } = inputRef.current;

        setSearchText(value);
        console.info("setSearchText", value);
      }
    }, 400);
  };

  const state = {
    inputRef,
    searchText,
  };
  const methods = {
    onSearchKeyDown,
  };

  return [state, methods] as const;
}
