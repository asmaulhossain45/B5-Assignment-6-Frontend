import TransactionTable from "@/components/table/TransactionTable";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useGetAgentTransactionQuery } from "@/redux/features/agent/agent.api";

const AgentTransaction = () => {
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
  const { data, isLoading, isFetching } = useGetAgentTransactionQuery(params);

  return (
    <>
      <TransactionTable
        data={data?.data || []}
        meta={data?.meta}
        isLoading={isLoading}
        isFetching={isFetching}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setFilters={setFilters}
        order={order}
        setSort={setSort}
        setOrder={setOrder}
        setPage={setPage}
      />
    </>
  );
};

export default AgentTransaction;
