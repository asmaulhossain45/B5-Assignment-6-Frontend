import { useListTableParams } from "@/hooks/useListTableParams";
import { ListTable, type SortOption } from "@/components/table/ListTable";
import useTransactionColumns from "@/hooks/useTransactionColumns";
import { useGetUserTransactionQuery } from "@/redux/features/user/user.api";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const sortOptions: SortOption[] = [
  { label: "Name", value: "name" },
  { label: "Created At", value: "createdAt" },
];

const UserTransaction = () => {
  const { currentUser } = useCurrentUser();
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
  const { data, isLoading } = useGetUserTransactionQuery(params);
  const { columns } = useTransactionColumns({
    currentUser: currentUser?.email,
  });

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

export default UserTransaction;
