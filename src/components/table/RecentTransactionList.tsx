import { TransactionStatus } from "@/constants/enums";
import { cn } from "@/lib/utils";
import type { ITransaction } from "@/types/ITransaction";
import type { ColumnDef } from "@tanstack/react-table";
import { ListTable } from "./ListTable";

type Props = {
  transactions: ITransaction[];
  isLoading: boolean;
  isFetching: boolean;
};

const RecentTransactionList = ({
  transactions,
  isLoading,
  isFetching,
}: Props) => {
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
    { header: "Transaction ID", accessorKey: "transactionId" },
    {
      header: "Type",
      accessorKey: "type",
      meta: { className: "capitalize text-center" },
    },
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
      meta: { className: "capitalize text-center" },
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: ({ row }) => (
        <div className="text-base text-right font-medium">
          ${row.original.amount.toFixed(2)}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">Recent Transactions</h3>

      <ListTable
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        data={transactions}
      />
    </div>
  );
};

export default RecentTransactionList;
