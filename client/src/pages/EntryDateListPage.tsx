import { SearchInput } from "@/components/core/control";
import { Search } from "@/components/core/form";
import { PageTitle } from "@/components/layout/Page/PageTitile";
import { EntryDateList } from "@/components/modules/EntryDate";
import { Button } from "@/components/ui/button";
import { useEntryDateList, useEntryDateSearch } from "@/hooks";
import { Link } from "@tanstack/react-router";

export function EntryDateListPage() {
  const [{ inputRef, searchText }, { onSearchKeyDown }] = useEntryDateSearch();
  const entryDateListQuery = useEntryDateList(searchText);

  return (
    <>
      <PageTitle text="Timesheet Collections">
        <Link to="/create">
          <Button className="w-full">Create Timesheet</Button>
        </Link>
      </PageTitle>
      <Search onKeyDown={onSearchKeyDown}>
        <SearchInput
          placeholder="Search Timesheet Collections..."
          ref={inputRef}
        />
      </Search>
      <EntryDateList query={entryDateListQuery} />
    </>
  );
}
