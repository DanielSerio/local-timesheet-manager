import { Search } from "@/components/core/form";
import { SearchInput } from "@/components/core/control";
import type { UseQueryResult } from "@tanstack/react-query";
import type { ListResponse } from "@/lib/types/response.types";
import type { RefObject } from "react";
import { CollectionList } from "./CollectionList";
import type { ApiTableColumnDef } from "@/components/table/ApiTable/ApiTable.props";

export interface CollectionListSearchProps<Entity> {
  query: UseQueryResult<ListResponse<Entity>, Error>;
  inputRef: RefObject<HTMLInputElement | null>;
  columns: ApiTableColumnDef<Entity, unknown>[];
  prompt: string;
  onSearchKeyDown: (ev: React.KeyboardEvent<HTMLElement>) => void;
}

export function CollectionListSearch<Entity>({
  query,
  inputRef,
  columns,
  prompt,
  onSearchKeyDown,
}: CollectionListSearchProps<Entity>) {
  return (
    <div className="mb-4">
      <Search onKeyDown={onSearchKeyDown}>
        <SearchInput placeholder={prompt} ref={inputRef} />
      </Search>
      <CollectionList query={query} columns={columns} />
    </div>
  );
}
