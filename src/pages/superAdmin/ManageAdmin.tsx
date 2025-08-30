import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import type { IAdmin } from "@/types/IAdmin";
import { ListTable, type SortOption } from "@/components/table/ListTable";
import type { CellContext, ColumnDef } from "@tanstack/react-table";
import { useGetAdminListQuery } from "@/redux/features/superAdmin/superAdmin.api";
import { useListTableParams } from "@/hooks/useListTableParams";

const sortOptions: SortOption[] = [
  { label: "Name", value: "name" },
  { label: "Created At", value: "createdAt" },
];

const ManageAdmin = () => {
  const {
    params,
    searchInput,
    setSearchInput,
    setPage,
    setSort,
    sortBy,
    sortOrder,
    page,
  } = useListTableParams();
  const { data, isLoading } = useGetAdminListQuery(params);

  const handleDelete = (data: IAdmin) => {
    toast.success(`${data.name} deleted successfully!`);
  };

  const columns: ColumnDef<IAdmin>[] = [
    {
      header: "Serial",
      cell: (info) => info.row.index + 1,
      meta: { className: "text-center" },
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <>
          <span className="font-medium">{row.original.name}</span> <br />
          <span className="text-xs text-muted-foreground">
            {row.original.email}
          </span>
        </>
      ),
    },
    {
      header: "Role",
      accessorKey: "role",
    },
    {
      header: "Status",
      accessorKey: "status",
      meta: { className: "text-center" },
    },
    {
      header: "Verified",
      accessorKey: "isVerified",
      cell: ({ row }) => (
        <span
          className={cn(
            row.original.isVerified ? "text-success" : "text-destructive"
          )}
        >
          {row.original.isVerified ? "Yes" : "No"}
        </span>
      ),
      meta: { className: "text-center" },
    },
    {
      header: () => "Actions",
      accessorKey: "actions",
      cell: (info: CellContext<IAdmin, unknown>) => (
        <div className="flex items-center justify-center gap-2">
          <button
            className="text-destructive"
            onClick={() => handleDelete(info.row.original)}
          >
            <Trash2 size={24} />
          </button>
        </div>
      ),
      meta: { className: "text-center" },
    },
  ];

  return (
    <ListTable
      columns={columns}
      data={data?.data || []}
      meta={data?.meta}
      isLoading={isLoading}
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      sortBy={sortBy}
      sortOrder={sortOrder}
      setSort={setSort}
      sortOptions={sortOptions}
      page={page}
      setPage={setPage}
      limit={1}
    />
  );
};

export default ManageAdmin;
