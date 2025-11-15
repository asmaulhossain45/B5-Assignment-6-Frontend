import TransactionTable from "@/components/table/TransactionTable";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useGetUserTransactionQuery } from "@/redux/features/user/user.api";

const UserTransaction = () => {
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

  const { data, isLoading, isFetching } = useGetUserTransactionQuery(params);

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

export default UserTransaction;
