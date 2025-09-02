// from, to, type, amount, charge, commission, transactionId, agent, status, reference, notes, createdAt, updatedAt

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TransactionStatus } from "@/constants/enums";
import { cn } from "@/lib/utils";
import type { ITransaction } from "@/types/ITransaction";
import type { ColumnDef } from "@tanstack/react-table";

type Props = {
  currentUser?: string;
};

const useTransactionColumns = ({ currentUser = "" }: Props = {}) => {
  const columns: ColumnDef<ITransaction>[] = [
    {
      header: "Serial",
      cell: (info) => info.row.index + 1,
      meta: { className: "text-center" },
    },
    {
      header: "Sender",
      accessorKey: "from.name",
      cell: ({ row }) => {
        const { name, email } = row.original?.from ?? {};
        const isUser = currentUser === email;

        return (
          <>
            <span className={cn("font-medium", isUser && "text-primary")}>
              {name}
            </span>
            <br />
            <span className="text-xs text-muted-foreground">{email}</span>
          </>
        );
      },
    },
    {
      header: "Receiver",
      accessorKey: "to.name",
      cell: ({ row }) => {
        const { name, email } = row.original?.to ?? {};
        const isUser = currentUser === email;

        return (
          <>
            <span className={cn("font-medium", isUser && "text-primary")}>
              {name}
            </span>
            <br />
            <span className="text-xs text-muted-foreground">{email}</span>
          </>
        );
      },
    },
    {
      header: "Transaction Id",
      accessorKey: "transactionId",
      meta: { className: "capitalize" },
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
        const { status } = row.original ?? {};

        return (
          <span
            className={cn(
              "capitalize",
              status === TransactionStatus.FAILED
                ? "text-destructive"
                : status === TransactionStatus.COMPLETED
                ? "text-success"
                : "text-warning"
            )}
          >
            {status}
          </span>
        );
      },
      meta: { className: "text-center" },
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: ({ row }) => (
        <div className="flex items-center justify-between gap-2">
          <Tooltip>
            <TooltipTrigger className="text-base font-medium">
              {row.original.amount}
            </TooltipTrigger>

            <TooltipContent>
              <span>Transfer Amount</span>
            </TooltipContent>
          </Tooltip>

          <div className="flex flex-col justify-between">
            <Tooltip>
              <TooltipTrigger className="text-right text-muted-foreground text-xs">
                {row.original.charge}
              </TooltipTrigger>

              <TooltipContent>
                <span>System Charge</span>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger className="text-right text-muted-foreground text-xs">
                {row.original.commission}
              </TooltipTrigger>

              <TooltipContent>
                <span>Agent Commission</span>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];

  return { columns, isUpdating: false };
};

export default useTransactionColumns;
