import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  useGetUserTransactionQuery,
  useGetUserWalletQuery,
} from "@/redux/features/user/user.api";
import type { ITransaction } from "@/types/ITransaction";
import {
  CreditCard,
  HandCoins,
  MoveRight,
  PlusCircle,
  Wallet,
} from "lucide-react";
import { NavLink } from "react-router";

const UserOverview = () => {
  const { data } = useGetUserWalletQuery();
  const { data: transaction, isLoading: isLoadingTransaction } =
    useGetUserTransactionQuery({});

  const cardData = [
    {
      label: "Balance",
      value: data?.data?.balance || "0.00",
      Icon: Wallet,
      bgColor: "bg-chart-1",
      textColor: "text-chart-1",
    },
    {
      label: "Deposit",
      Icon: PlusCircle,
      path: "/dashboard/user/deposit-money",
      bgColor: "bg-chart-2",
      textColor: "text-chart-2",
    },
    {
      label: "Withdraw",
      Icon: CreditCard,
      path: "/dashboard/user/withdraw-money",
      bgColor: "bg-chart-3",
      textColor: "text-chart-3",
    },
    {
      label: "Send Money",
      Icon: HandCoins,
      path: "/dashboard/user/send-money",
      bgColor: "bg-chart-4",
      textColor: "text-chart-4",
    },
  ];

  return (
    <section className="space-y-4">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardData.map((item, index) =>
          item.path ? (
            <NavLink to={item.path} key={index}>
              <Card
                key={index}
                className="group p-4 h-full justify-between rounded-none"
              >
                <CardHeader className="flex items-center justify-between gap-4 p-0">
                  <CardTitle>{item.label}</CardTitle>

                  <div className={cn(`${item.bgColor}`, "p-2 rounded-md")}>
                    <item.Icon size={24} className="text-light" />
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <MoveRight
                    size={24}
                    className={cn(
                      item.textColor,
                      "group-hover:text-foreground transition-colors duration-300"
                    )}
                  />
                </CardContent>
              </Card>
            </NavLink>
          ) : (
            <Card
              key={index}
              className="p-4 h-full justify-between rounded-none"
            >
              <CardHeader className="flex items-center justify-between gap-4 p-0">
                <CardTitle>{item.label}</CardTitle>

                <div className={cn(`${item.bgColor}`, "p-2 rounded-md")}>
                  <item.Icon size={24} className="text-light" />
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <h2 className="text-3xl font-semibold">
                  <span className={cn(item.textColor)}>$</span> {item.value}
                </h2>
              </CardContent>
            </Card>
          )
        )}
      </ul>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Recent Transactions</h3>

        <Table className="border">
          <TableHeader className="bg-card">
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoadingTransaction
              ? Array.from({ length: 10 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-5 w-full rounded-none" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-full rounded-none" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-full rounded-none" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-full rounded-none" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-full rounded-none" />
                    </TableCell>
                  </TableRow>
                ))
              : transaction?.data
                  .slice(0, 10)
                  .map((item: ITransaction, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="capitalize">{item.transactionId}</TableCell>
                      <TableCell className="capitalize">{item.type}</TableCell>
                      <TableCell>${item.amount}</TableCell>
                      <TableCell className="capitalize">
                        {item.status}
                      </TableCell>
                      <TableCell>
                        {item.createdAt
                          ? new Date(item.createdAt).toDateString()
                          : ""}
                      </TableCell>
                    </TableRow>
                  ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default UserOverview;
