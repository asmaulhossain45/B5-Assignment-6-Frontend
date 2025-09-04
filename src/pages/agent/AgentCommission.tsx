import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TransactionStatus } from "@/constants/enums";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { cn } from "@/lib/utils";
import { useGetAgentCommissionQuery } from "@/redux/features/agent/agent.api";
import type { ITransaction } from "@/types/ITransaction";
import { useState } from "react";

const AgentCommission = () => {
  const { currentUser } = useCurrentUser();
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useGetAgentCommissionQuery({
    page,
    limit: 10,
  });

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl lg:text-2xl font-semibold">
          Commission History
        </h2>
      </div>

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
            <TableHead className="text-center">Commission</TableHead>
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
          ) : data?.data.length > 0 ? (
            data?.data.map((item: ITransaction, index: number) => (
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
                  {item?.commission.toFixed(2)}
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

      <div className="flex items-center justify-between gap-4">
        <p>
          {data?.meta?.page || 1} of {data?.meta?.totalPage || 1} pages
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => setPage(data?.meta?.page - 1)}
            disabled={data?.meta?.page === 1 || isLoading || isFetching}
            className="bg-sidebar rounded-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </Button>
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => setPage(data?.meta?.page + 1)}
            disabled={
              data?.meta?.page === data?.meta?.totalPage ||
              isLoading ||
              isFetching
            }
            className="bg-sidebar rounded-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AgentCommission;
