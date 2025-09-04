import type { IMetaResponse } from "@/types/IMeta";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { Skeleton } from "../ui/skeleton";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "../ui/select";
import { ListFilter } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCallback } from "react";

export interface SortOption {
  label: string;
  value: string;
}

interface ListTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  isFetching?: boolean;
  meta?: IMetaResponse;

  searchInput?: string;
  setSearchInput?: (val: string) => void;

  sortBy?: string;
  sortOrder?: "asc" | "desc";
  setSort?: (field: string, order: "asc" | "desc") => void;
  sortOptions?: SortOption[];

  page?: number;
  setPage?: (page: number) => void;
}

export const ListTable = <TData, TValue>({
  columns,
  data,
  isLoading = true,
  isFetching = false,
  meta,

  searchInput,
  setSearchInput,
  sortBy,
  sortOrder,
  setSort,
  sortOptions,

  page,
  setPage,
}: ListTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSortChange = useCallback(
    (field: string) => {
      if (!field) return;
      const order = field === sortBy && sortOrder === "asc" ? "desc" : "asc";
      setSort?.(field, order);
    },
    [sortBy, sortOrder, setSort]
  );

  const toggleSortOrder = useCallback(() => {
    if (!sortBy) return;
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSort?.(sortBy, order);
  }, [sortBy, sortOrder, setSort]);

  return (
    <div className="">
      <div className="flex flex-col md:flex-row md:justify-between gap-2">
        <Input
          placeholder="Search..."
          className="rounded-none w-full md:w-72 py-[5px] bg-sidebar dark:bg-sidebar"
          value={searchInput}
          onChange={(e) => setSearchInput?.(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full lg:w-44 rounded-none bg-sidebar dark:bg-sidebar">
              {sortBy ? (
                sortOptions?.find((option) => option.value === sortBy)?.label
              ) : (
                <span className="text-muted-foreground">Sort by field</span>
              )}
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select a field to sort</SelectLabel>
                {sortOptions?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            variant={"outline"}
            className="rounded-none bg-sidebar dark:bg-sidebar disabled:cursor-not-allowed disabled:opacity-50"
            onClick={toggleSortOrder}
            disabled={isLoading || isFetching || !sortBy}
          >
            <ListFilter
              className={cn(
                sortOrder === "asc" && "rotate-x-180",
                "transition-transform duration-300 ease-in-out"
              )}
            />
          </Button>
        </div>
      </div>

      <Table className="border w-full my-4">
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
        <TableBody>
          {isLoading || isFetching ? (
            Array.from({ length: meta?.limit || 10 }).map((_, index) => (
              <TableRow key={index}>
                {columns.map((_, idx) => (
                  <TableCell key={idx}>
                    <Skeleton className="h-11 rounded" />
                  </TableCell>
                ))}
              </TableRow>
            ))
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
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between">
        <p>
          {meta?.page || 1} of {meta?.totalPage || 1} pages
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant={"outline"}
            className="rounded-none bg-sidebar"
            size={"sm"}
            disabled={(page || 1) === 1}
            onClick={() => setPage?.((page || 1) - 1)}
          >
            Previous
          </Button>
          <Button
            variant={"outline"}
            className="rounded-none bg-sidebar"
            size={"sm"}
            disabled={(page || 1) === (meta?.totalPage || 1)}
            onClick={() => setPage?.((page || 1) + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
