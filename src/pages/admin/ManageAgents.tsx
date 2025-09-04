import { useListTableParams } from "@/hooks/useListTableParams";
import { ListTable, type SortOption } from "@/components/table/ListTable";
import { useGetAgentListQuery } from "@/redux/features/admin/admin.api";
import useUserColumns from "@/hooks/useUserColumns";
import { Roles } from "@/constants/enums";

const sortOptions: SortOption[] = [
  { label: "Name", value: "name" },
  { label: "Created At", value: "createdAt" },
];

const ManageAgents = () => {
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
  const { data, isLoading, isFetching } = useGetAgentListQuery(params);
  const { columns } = useUserColumns({role: Roles.AGENT});

  return (
    <>
      <ListTable
        columns={columns}
        data={data?.data || []}
        meta={data?.meta}
        isLoading={isLoading}
        isFetching={isFetching}
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

export default ManageAgents;
