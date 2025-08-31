// from, to, type, amount, charge, commission, transactionId, agent, status, reference, notes, createdAt, updatedAt

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ITransaction } from "@/types/ITransaction";
import type { ColumnDef } from "@tanstack/react-table";

// role (Admin)
const useTransactionColumns = () => {
  const columns: ColumnDef<ITransaction>[] = [
    {
      header: "Serial",
      cell: (info) => info.row.index + 1,
      meta: { className: "text-center" },
    },
    {
      header: "Sender",
      accessorKey: "from.name",
      cell: ({ row }) => (
        <>
          <span className="font-medium">{row.original.from?.name}</span> <br />
          <span className="text-xs text-muted-foreground">
            {row.original.from?.email}
          </span>
        </>
      ),
    },
    {
      header: "Receiver",
      accessorKey: "to.name",
      cell: ({ row }) => (
        <>
          <span className="font-medium">{row.original.to?.name}</span> <br />
          <span className="text-xs text-muted-foreground">
            {row.original.to?.email}
          </span>
        </>
      ),
    },
    {
      header: "Agent",
      accessorKey: `agent.name`,
      cell: ({ row }) => (
        <>
          <span className="font-medium">{row.original.agent?.name}</span> <br />
          <span className="text-xs text-muted-foreground">
            {row.original.agent?.email}
          </span>
        </>
      ),
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
      meta: { className: "text-center capitalize" },
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
