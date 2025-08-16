import { useReportsList } from "./useReportsList";
import { useSearchState } from "./useSearchState";

export function useReportCollectionList() {
  const [{ inputRef, searchText }, methods] = useSearchState();
  const reportsListQuery = useReportsList(searchText);

  const state = {
    inputRef,
    searchText,
    reportsListQuery,
  };

  return [state, methods] as const;
}
