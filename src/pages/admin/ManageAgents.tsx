import ManageUserTable from "@/components/table/ManageUserTable";
import { Roles } from "@/constants/enums";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useGetAgentListQuery } from "@/redux/features/admin/admin.api";

const ManageAgents = () => {
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
  const { data, isLoading, isFetching } = useGetAgentListQuery(params);

  return (
    <ManageUserTable
      role={Roles.AGENT}
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

export default ManageAgents;
