import RecentTransactionList from "@/components/table/RecentTransactionList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  useGetAdminSummartQuery,
  useGetTransactionListQuery,
} from "@/redux/features/admin/admin.api";
import { ListChecks, ShieldUser, UsersRound, UserStar } from "lucide-react";
import type { ElementType } from "react";

interface IAdminSummary {
  Icon: ElementType;
  title: string;
  value: number;
  volume?: number;
  color: string;
}

const AdminOverview = () => {
  const { data: summaryList } = useGetAdminSummartQuery();
  const {
    data: transaction,
    isLoading,
    isFetching,
  } = useGetTransactionListQuery({
    limit: 10,
  });

  const summary: IAdminSummary[] = [
    {
      Icon: ShieldUser,
      title: "Total Admins",
      value: summaryList?.data?.totalAdminCount ?? 0,
      color: "bg-chart-1",
    },
    {
      Icon: UserStar,
      title: "Total Agents",
      value: summaryList?.data?.totalAgentCount ?? 0,
      color: "bg-chart-2",
    },
    {
      Icon: UsersRound,
      title: "Total Users",
      value: summaryList?.data?.totalUserCount ?? 0,
      color: "bg-chart-3",
    },
    {
      Icon: ListChecks,
      title: "Total Transactions",
      value: summaryList?.data?.transactionCount ?? 0,
      volume: summaryList?.data?.transactionVolume ?? 0,
      color: "bg-chart-4",
    },
  ];

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {summary.map((item, index) => (
          <Card key={index} className="bg-sidebar dark:bg-sidebar">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>

            <CardContent className="flex items-end justify-between gap-4">
              <span className="text-2xl lg:text-3xl font-semibold">
                {item.value}
                {item.volume !== undefined && (
                  <Tooltip>
                    <TooltipTrigger className="text-muted-foreground text-sm ml-1">
                      ({item.volume.toFixed(2)})
                    </TooltipTrigger>
                    <TooltipContent side="top">Volume</TooltipContent>
                  </Tooltip>
                )}
              </span>

              <div className={cn("p-3 rounded-sm", item.color)}>
                <item.Icon size={16} className="text-light" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <RecentTransactionList
        transactions={transaction?.data ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    </section>
  );
};

export default AdminOverview;
