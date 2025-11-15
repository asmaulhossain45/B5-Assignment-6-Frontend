import FilterDrawer, {
  type FilterConfig,
} from "@/components/table/controll/FilterDrawer";
import SearchControll from "@/components/table/controll/SearchControll";
import SortControl from "@/components/table/controll/SortControl";
import TablePagination from "@/components/table/controll/TablePagination";
import { ListTable, type SortOption } from "@/components/table/ListTable";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { TransactionStatus, TransactionType } from "@/constants/enums";
import { useQueryParams } from "@/hooks/useQueryParams";
import { cn } from "@/lib/utils";
import { useGetTransactionListQuery } from "@/redux/features/admin/admin.api";
import type { ITransaction } from "@/types/ITransaction";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import z from "zod";

const sortOptions: SortOption[] = [
  { label: "Type", value: "type" },
  { label: "Status", value: "status" },
  { label: "Amount", value: "amount" },
  { label: "Transaction Date", value: "createdAt" },
];

const filterConfig: FilterConfig[] = [
  {
    label: "Transaction Status",
    field: "status",
    type: "radio",
    options: [
      { label: "Failed", value: TransactionStatus.FAILED },
      { label: "Pending", value: TransactionStatus.PENDING },
      { label: "Completed", value: TransactionStatus.COMPLETED },
    ],
  },
  {
    label: "Transaction Type",
    field: "type",
    type: "radio",
    options: [
      { label: "Deposit", value: TransactionType.DEPOSIT },
      { label: "Withdraw", value: TransactionType.WITHDRAW },
      { label: "Send Money", value: TransactionType.SEND_MONEY },
      { label: "Cash In", value: TransactionType.CASH_IN },
      { label: "Cash Out", value: TransactionType.CASH_OUT },
    ],
  },
];

const filterSchema = z.object({
  status: z.string().optional(),
  type: z.string().optional(),
});

const TransactionHistory = () => {
  const {
    params,
    searchInput,
    setSearchInput,
    setFilters,
    order,
    setSort,
    setOrder,
    setPage,
  } = useQueryParams();
  const { data, isLoading, isFetching } = useGetTransactionListQuery(params);

  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
  });

  const columns: ColumnDef<ITransaction>[] = [
    {
      accessorKey: "createdAt",
      header: () => (
        <span>
          Date <br />
          <span className="text-xs text-muted-foreground">Time</span>
        </span>
      ),
      cell: ({ row }) => {
        const value = row.original.createdAt;

        if (!value) return "N/A";

        const dateObj = new Date(value);

        const date = dateObj.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        });
        const time = dateObj.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });

        return (
          <span>
            {date} <br />{" "}
            <span className="text-xs text-muted-foreground">{time}</span>
          </span>
        );
      },
    },
    {
      header: () => (
        <span>
          Sender
          <br />
          <span className="text-xs text-muted-foreground">Email Address</span>
        </span>
      ),
      accessorKey: "from.name",
      cell: ({ row }) => {
        const sender = row.original.from;

        if (!sender) return "N/A";

        return (
          <span>
            {sender.name} <br />
            <span className="text-xs text-muted-foreground">
              {sender.email}
            </span>
          </span>
        );
      },
    },
    {
      header: () => (
        <span>
          Receiver
          <br />
          <span className="text-xs text-muted-foreground">Email Address</span>
        </span>
      ),
      accessorKey: "to.name",
      cell: ({ row }) => {
        const sender = row.original.to;

        if (!sender) return "N/A";

        return (
          <span>
            {sender.name} <br />
            <span className="text-xs text-muted-foreground">
              {sender.email}
            </span>
          </span>
        );
      },
    },
    { header: "Transaction ID", accessorKey: "transactionId" },
    { header: "Type", accessorKey: "type", meta: { className: "capitalize" } },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;

        return (
          <span
            className={cn(
              status === TransactionStatus.COMPLETED && "text-success",
              status === TransactionStatus.FAILED && "text-destructive",
              status === TransactionStatus.PENDING && "text-warning"
            )}
          >
            {status}
          </span>
        );
      },
      meta: { className: "capitalize" },
    },
    {
      header: "Amount ($)",
      accessorKey: "amount",
      cell: ({ row }) => {
        const amount = row.original.amount.toFixed(2);
        const charge = row.original.charge.toFixed(2);
        const commission = row.original.commission.toFixed(2);

        return (
          <span className="flex items-center justify-between gap-2">
            <span className="text-base font-medium">{amount}</span> <br />
            <div className="flex flex-col items-end">
              <Tooltip>
                <TooltipTrigger className="text-xs text-muted-foreground">
                  {charge}
                </TooltipTrigger>
                <TooltipContent>Charge</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className="text-xs text-muted-foreground">
                  {commission}
                </TooltipTrigger>
                <TooltipContent>Commission</TooltipContent>
              </Tooltip>
            </div>
          </span>
        );
      },
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <SearchControll
          placeholder="Transaction Id"
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />

        <div className="flex items-center justify-between gap-2">
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
      </div>

      <ListTable
        columns={columns}
        data={data?.data}
        isFetching={isFetching}
        isLoading={isLoading}
      />

      <TablePagination
        meta={data?.meta}
        setPage={setPage}
        isFetching={isFetching}
      />
    </section>
  );
};

export default TransactionHistory;
