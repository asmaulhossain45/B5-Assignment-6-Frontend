import FilterDrawer, {
  type FilterConfig,
} from "@/components/table/controll/FilterDrawer";
import SearchControll from "@/components/table/controll/SearchControll";
import SortControl from "@/components/table/controll/SortControl";
import TablePagination from "@/components/table/controll/TablePagination";
import { ListTable, type SortOption } from "@/components/table/ListTable";
import { TransactionStatus, TransactionType } from "@/constants/enums";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useQueryParams } from "@/hooks/useQueryParams";
import { cn } from "@/lib/utils";
import { useGetAgentCommissionQuery } from "@/redux/features/agent/agent.api";
import type { ITransaction } from "@/types/ITransaction";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import z from "zod";

const sortOptions: SortOption[] = [
  { label: "Type", value: "type" },
  { label: "Status", value: "status" },
  { label: "Commission", value: "commission" },
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

const AgentCommission = () => {
  const { currentUser } = useCurrentUser();
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
  const { data, isLoading, isFetching } = useGetAgentCommissionQuery(params);

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
          To / From
          <br />
          <span className="text-xs text-muted-foreground">Email Address</span>
        </span>
      ),
      accessorKey: "toFrom",
      cell: ({ row }) => {
        const { from, to } = row.original;
        const isSender = from?.email === currentUser?.email;
        const result = isSender ? to : from;

        return (
          <span>
            {result?.name} <br />
            <span className="text-xs text-muted-foreground">
              {result?.email}
            </span>
          </span>
        );
      },
    },
    {
      accessorKey: "transactionId",
      header: () => "Transaction ID",
    },
    {
      accessorKey: "type",
      header: () => "Type",
      meta: { className: "capitalize" },
    },
    {
      accessorKey: "status",
      header: () => "Status",
      meta: { className: "capitalize" },
      cell: ({ row }) => {
        const status = row.original.status;

        return (
          <span
            className={cn(
              "capitalize",
              status === TransactionStatus.PENDING && "text-warning",
              status === TransactionStatus.COMPLETED && "text-success",
              status === TransactionStatus.FAILED && "text-destructive"
            )}
          >
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "commission",
      header: () => "Commission",
      cell: ({ row }) => {
        const commission = row.original.commission;

        return <div className="text-right">$ {commission.toFixed(2)}</div>;
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
        isLoading={isLoading}
        isFetching={isFetching}
      />

      <TablePagination
        meta={data?.meta}
        setPage={setPage}
        isFetching={isFetching}
      />
    </section>
  );
};

export default AgentCommission;
