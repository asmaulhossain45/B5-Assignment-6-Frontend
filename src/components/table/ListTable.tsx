import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import Loading from "@/pages/public/Loading";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { Skeleton } from "../ui/skeleton";

export interface SortOption {
  label: string;
  value: string;
}

interface ListTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  isFetching?: boolean;
  skeletonCount?: number;
}

export const ListTable = <TData, TValue>({
  columns,
  data,
  isLoading = false,
  isFetching = false,
  skeletonCount = 10,
}: ListTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table className="border w-full">
      <TableHeader className="bg-sidebar">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  className={header.column.columnDef.meta?.className}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody className="relative overflow-hidden">
        {isLoading ? (
          Array.from({ length: data?.length || skeletonCount }).map(
            (_, index) => (
              <TableRow key={index}>
                {columns.map((_, idx) => (
                  <TableCell key={idx}>
                    <Skeleton className="h-11 rounded" />
                  </TableCell>
                ))}
              </TableRow>
            )
          )
        ) : table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={cell.column.columnDef.meta?.className}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-36 text-xl text-center"
            >
              No results found.
            </TableCell>
          </TableRow>
        )}

        {isFetching && !isLoading && (
          <div className="absolute inset-0 bg-sidebar/50 flex items-center justify-center h-full w-full">
            <Loading size="sm" type="inline" />
          </div>
        )}
      </TableBody>
    </Table>
  );
};
