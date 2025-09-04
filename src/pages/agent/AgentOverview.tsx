import RecentTransactionList from "@/components/table/RecentTransactionList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  useGetAgentSummaryQuery,
  useGetAgentTransactionQuery,
} from "@/redux/features/agent/agent.api";
import { ListChecks, Receipt, TrendingDown, TrendingUp } from "lucide-react";
import type { ElementType } from "react";

interface IAgentSummary {
  Icon: ElementType;
  title: string;
  value: number;
  count: number;
  color: string;
}

const AgentOverview = () => {
  const { data } = useGetAgentSummaryQuery();
  const { data: transaction, isLoading: isLoadingTransaction } =
    useGetAgentTransactionQuery({ limit: 10 });

  const summary: IAgentSummary[] = [
    {
      Icon: ListChecks,
      title: "Total Transactions",
      value: data?.data?.totalTransactionsAmount ?? 0,
      count: data?.data?.totalTransactionsCount ?? 0,
      color: "bg-chart-1",
    },
    {
      Icon: Receipt,
      title: "Total Commissions",
      value: data?.data?.totalCommissionsAmount ?? 0,
      count: data?.data?.totalTransactionsCount ?? 0,
      color: "bg-chart-2",
    },
    {
      Icon: TrendingDown,
      title: "Total Cash In",
      value: data?.data?.totalCashInAmount ?? 0,
      count: data?.data?.totalCashInCount ?? 0,
      color: "bg-chart-3",
    },
    {
      Icon: TrendingUp,
      title: "Total Cash Out",
      value: data?.data?.totalCashOutAmount ?? 0,
      count: data?.data?.totalCashOutCount ?? 0,
      color: "bg-chart-4",
    },
  ];

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {summary.map((item, index) => (
          <Card key={index} className="bg-sidebar dark:bg-sidebar">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>

            <CardContent className="flex items-end justify-between gap-4">
              <span className="text-2xl lg:text-3xl font-semibold">
                $ {item.value.toFixed(2)}
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
        isLoadingTransaction={isLoadingTransaction}
      />
    </section>
  );
};

export default AgentOverview;
