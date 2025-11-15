import ManageUserTable from "@/components/table/ManageUserTable";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useGetAdminListQuery } from "@/redux/features/superAdmin/superAdmin.api";

const ManageAdmin = () => {
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
  const { data, isLoading, isFetching } = useGetAdminListQuery(params);

  return (
    <>
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
    </>
  );
};

export default ManageAdmin;
