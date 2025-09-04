import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { TransactionStatus } from "@/constants/enums";
import type { ITransaction } from "@/types/ITransaction";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useCurrentUser } from "@/hooks/useCurrentUser";

type Props = {
  data: ITransaction[];
  isLoading: boolean;
  isFetching: boolean;
};

const UserTransactionTable = ({ data, isLoading, isFetching }: Props) => {
  const { currentUser } = useCurrentUser();
  return (
    <Table className="border">
      <TableHeader className="bg-sidebar">
        <TableRow>
          <TableHead className="flex flex-col gap-1 py-1">
            <span className="text-sm font-medium">Date</span>
            <span className="text-xs text-muted-foreground">Time</span>
          </TableHead>
          <TableHead>To / From</TableHead>
          <TableHead>Transaction ID</TableHead>
          <TableHead className="text-center">Type</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading || isFetching ? (
          Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-10 rounded-none" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-10 rounded-none" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-10 rounded-none" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-10 rounded-none" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-10 rounded-none" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-10 rounded-none" />
              </TableCell>
            </TableRow>
          ))
        ) : data?.length > 0 ? (
          data?.map((item: ITransaction, index: number) => (
            <TableRow key={index}>
              <TableCell>
                {item?.createdAt ? (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
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
                {item?.from?.email === currentUser?.email ? (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">
                      {item?.to?.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item?.to?.email}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">
                      {item?.from?.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item?.from?.email}
                    </span>
                  </div>
                )}
              </TableCell>

              <TableCell className="capitalize">
                {item?.transactionId}
              </TableCell>

              <TableCell className="capitalize text-center">
                {item?.type}
              </TableCell>

              <TableCell
                className={cn(
                  "capitalize text-center",
                  item?.status === TransactionStatus.COMPLETED &&
                    "text-success",
                  item?.status === TransactionStatus.FAILED &&
                    "text-destructive",
                  item?.status === TransactionStatus.PENDING && "text-warning"
                )}
              >
                {item?.status}
              </TableCell>

              <TableCell className="text-right text-base font-semibold">
                <span className="mr-1">$</span>
                {item?.amount.toFixed(2)}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center text-lg font-semibold py-24"
            >
              Not found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UserTransactionTable;
