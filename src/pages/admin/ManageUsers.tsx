import ManageUserTable from "@/components/table/ManageUserTable";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useGetUserListQuery } from "@/redux/features/admin/admin.api";

const ManageUsers = () => {
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
  const { data, isLoading, isFetching } = useGetUserListQuery(params);

  return (
    <ManageUserTable
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
  );
};

export default ManageUsers;
