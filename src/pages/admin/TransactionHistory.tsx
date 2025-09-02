import { useListTableParams } from "@/hooks/useListTableParams";
import { ListTable, type SortOption } from "@/components/table/ListTable";
import { useGetTransactionListQuery } from "@/redux/features/admin/admin.api";
import useTransactionColumns from "@/hooks/useTransactionColumns";

const sortOptions: SortOption[] = [
  { label: "Name", value: "name" },
  { label: "Created At", value: "createdAt" },
];

const TransactionHistory = () => {
  const {
    params,
    searchInput,
    setSearchInput,
    setPage,
    setSort,
    sortBy,
    sortOrder,
    page,
  } = useListTableParams();
  const { data, isLoading } = useGetTransactionListQuery(params);
  const { columns } = useTransactionColumns();

  return (
    <>
      <ListTable
        columns={columns}
        data={data?.data || []}
        meta={data?.meta}
        isLoading={isLoading}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        sortBy={sortBy}
        sortOrder={sortOrder}
        setSort={setSort}
        sortOptions={sortOptions}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default TransactionHistory;
