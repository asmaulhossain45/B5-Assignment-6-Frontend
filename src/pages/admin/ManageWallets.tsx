import WalletUpdateModal from "@/components/modal/WalletUpdateModal";
import FilterDrawer, {
  type FilterConfig,
} from "@/components/table/controll/FilterDrawer";
import SortControl from "@/components/table/controll/SortControl";
import TablePagination from "@/components/table/controll/TablePagination";
import { ListTable, type SortOption } from "@/components/table/ListTable";
import { WalletStatus, WalletType } from "@/constants/enums";
import { useQueryParams } from "@/hooks/useQueryParams";
import { cn } from "@/lib/utils";
import { useGetWalletListQuery } from "@/redux/features/admin/admin.api";
import type { IWallet } from "@/types/IWallet";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ColumnDef } from "@tanstack/react-table";
import { CircleCheckBig } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const sortOptions: SortOption[] = [
  { label: "Balance", value: "balance" },
  { label: "Type", value: "type" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

const filterConfig: FilterConfig[] = [
  {
    label: "Wallet type",
    field: "type",
    type: "radio",
    options: [
      { label: "Personal", value: WalletType.PERSONAL },
      { label: "Agent", value: WalletType.AGENT },
      { label: "System", value: WalletType.SYSTEM },
    ],
  },
  {
    label: "Wallet Status",
    field: "status",
    type: "radio",
    options: [
      { label: "Active", value: WalletStatus.ACTIVE },
      { label: "Inactive", value: WalletStatus.INACTIVE },
      { label: "Blocked", value: WalletStatus.BLOCKED },
    ],
  },
];

const filterSchema = z.object({
  type: z.string().optional(),
  status: z.string().optional(),
});

const ManageWallets = () => {
  const { params, setFilters, order, setSort, setOrder, setPage } =
    useQueryParams();
  const { data, isLoading, isFetching } = useGetWalletListQuery(params);

  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
  });

  const columns: ColumnDef<IWallet>[] = [
    {
      header: "Serial",
      cell: ({ row }) => (
        <span>
          {(data?.meta?.page - 1) * (data?.meta?.limit ?? 10) + (row.index + 1)}
        </span>
      ),
    },
    {
      header: () => (
        <span>
          Owner
          <br />
          <span className="text-xs text-muted-foreground">Email Address</span>
        </span>
      ),
      accessorKey: "owner",
      cell: ({ row }) => (
        <span>
          <span className="flex items-center gap-2">
            {row.original.owner?.name}
            <CircleCheckBig
              size={16}
              className={cn(
                row.original.owner?.isVerified
                  ? "text-success"
                  : "text-destructive"
              )}
            />
          </span>
          <span className="text-xs text-muted-foreground">
            {row.original.owner?.email}
          </span>
        </span>
      ),
    },
    {
      header: "Balance",
      accessorKey: "balance",
    },
    {
      header: "Type",
      accessorKey: "type",
      meta: { className: "capitalize" },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;

        return (
          <span
            className={cn(
              "capitalize",
              status === WalletStatus.ACTIVE && "text-success",
              status === WalletStatus.INACTIVE && "text-warning",
              status === WalletStatus.BLOCKED && "text-destructive"
            )}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "Action",
      accessorKey: "action",
      meta: { className: "text-center" },
      cell: ({ row }) => {
        const wallet = row.original;

        return (
          <div className="flex items-center justify-center gap-2">
            <WalletUpdateModal wallet={wallet} />
          </div>
        );
      },
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <FilterDrawer
          form={form}
          filterConfig={filterConfig}
          setFilters={setFilters}
          setPage={setPage}
        />

        <SortControl
          order={order}
          setSort={setSort}
          setOrder={setOrder}
          isFetching={isFetching}
          sortOptions={sortOptions}
        />
      </div>

      <ListTable
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading}
        isFetching={isFetching}
      />

      <TablePagination
        isFetching={isFetching}
        meta={data?.meta}
        setPage={setPage}
      />
    </section>
  );
};

export default ManageWallets;
