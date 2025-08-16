import type { UseQueryResult } from "@tanstack/react-query";
import type { ListResponse } from "@/lib/types/response.types";
import { ApiTable } from "@/components/table";
import type { ApiTableColumnDef } from "@/components/table/ApiTable/ApiTable.props";

export interface CollectionListProps<Entity> {
  query: UseQueryResult<ListResponse<Entity>, Error>;
  columns: ApiTableColumnDef<Entity, unknown>[];
}

export function CollectionList<Entity>({
  query,
  columns,
}: CollectionListProps<Entity>) {
  return (
    <ApiTable
      isLoading={query.isLoading}
      data={query.data}
      error={query.error}
      columns={columns}
    />
  );
}
