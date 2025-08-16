import { SearchInput } from "@/components/core/control";
import { Search } from "@/components/core/form";
import { PageTitle } from "@/components/layout/Page/PageTitile";
import { EntryDateList } from "@/components/modules/EntryDate";
import { useEntryDateList, useEntryDateSearch } from "@/hooks";

export function EntryDateListPage() {
  const [{ inputRef, searchText }, { onSearchKeyDown }] = useEntryDateSearch();
  const entryDateListQuery = useEntryDateList(searchText);

  return (
    <>
      <Search onKeyDown={onSearchKeyDown}>
        <SearchInput
          placeholder="Search Timesheet Collections..."
          ref={inputRef}
        />
      </Search>
      <PageTitle text="Timesheet Collections" />
      <EntryDateList query={entryDateListQuery} />
    </>
  );
}
