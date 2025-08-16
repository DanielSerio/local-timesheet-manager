import { useRef, useState, type KeyboardEvent } from "react";

let searchTimeout: NodeJS.Timeout;

export function useSearchState(timeout: number = 400) {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Should be applied to a `<search>` element that is wrapped around the input.
   */
  const onSearchKeyDown = (ev: KeyboardEvent<HTMLElement>) => {
    ev.stopPropagation();

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(() => {
      if (inputRef.current) {
        const { value } = inputRef.current;

        setSearchText(value);
      }
    }, timeout);
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
