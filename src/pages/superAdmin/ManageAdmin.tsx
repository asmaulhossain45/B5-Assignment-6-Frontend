import { ListTable, type SortOption } from "@/components/table/ListTable";
import { useGetAdminListQuery } from "@/redux/features/superAdmin/superAdmin.api";
import { useListTableParams } from "@/hooks/useListTableParams";
import useUserColumns from "@/hooks/useUserColumns";
import { Roles } from "@/constants/enums";

const sortOptions: SortOption[] = [
  { label: "Name", value: "name" },
  { label: "Created At", value: "createdAt" },
];

const ManageAdmin = () => {
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
  const { data, isLoading, isFetching } = useGetAdminListQuery(params);
  const { columns } = useUserColumns({ role: Roles.ADMIN });

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

export default ManageAdmin;
