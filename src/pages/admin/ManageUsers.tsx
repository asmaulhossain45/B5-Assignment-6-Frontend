import { useListTableParams } from "@/hooks/useListTableParams";
import { ListTable, type SortOption } from "@/components/table/ListTable";
import {
  useGetUserListQuery,
} from "@/redux/features/admin/admin.api";
import useUserColumns from "@/hooks/useUserColumns";

const sortOptions: SortOption[] = [
  { label: "Name", value: "name" },
  { label: "Created At", value: "createdAt" },
];

const ManageUsers = () => {
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
  const { data, isLoading } = useGetUserListQuery(params);
  const { columns } = useUserColumns();

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

export default ManageUsers;
