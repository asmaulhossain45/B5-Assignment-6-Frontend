import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";
import type { ITransaction } from "@/types/ITransaction";
import { TransactionStatus } from "@/constants/enums";
import { cn } from "@/lib/utils";

type Props = {
  transactions: ITransaction[];
  isLoadingTransaction: boolean;
};

const RecentTransactionList = ({
  transactions,
  isLoadingTransaction,
}: Props) => {
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">Recent Transactions</h3>

      <Table className="border">
        <TableHeader className="bg-card">
          <TableRow className="py-2">
            <TableHead className="flex flex-col gap-1 py-1">
              <span className="text-sm font-medium">Date</span>
              <span className="text-xs text-muted-foreground">Time</span>
            </TableHead>
            <TableHead>Transaction ID</TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoadingTransaction
            ? Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-10 w-full rounded-none" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-full rounded-none" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-full rounded-none" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-full rounded-none" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-full rounded-none" />
                  </TableCell>
                </TableRow>
              ))
            : transactions?.map((item: ITransaction, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    {item?.createdAt ? (
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium">
                          {new Date(item.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(item.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>

                  <TableCell className="capitalize">
                    {item.transactionId}
                  </TableCell>

                  <TableCell className="capitalize text-center">
                    {item.type}
                  </TableCell>

                  <TableCell
                    className={cn(
                      "capitalize text-center",
                      item?.status === TransactionStatus.COMPLETED &&
                        "text-success",
                      item?.status === TransactionStatus.FAILED &&
                        "text-destructive",
                      item?.status === TransactionStatus.PENDING &&
                        "text-warning"
                    )}
                  >
                    {item?.status}
                  </TableCell>

                  <TableCell className="text-right text-lg font-semibold">${item.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentTransactionList;
