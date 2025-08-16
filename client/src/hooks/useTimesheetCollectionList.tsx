import { useEntryDateList } from "./useEntryDateList";
import { useSearchState } from "./useSearchState";

export function useTimesheetCollectionList() {
  const [{ inputRef, searchText }, methods] = useSearchState();
  const entryDateListQuery = useEntryDateList(searchText);

  const state = {
    inputRef,
    searchText,
    entryDateListQuery,
  };

  return [state, methods] as const;
}
