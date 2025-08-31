import { useListTableParams } from "@/hooks/useListTableParams";
import { ListTable, type SortOption } from "@/components/table/ListTable";
import { useGetWalletListQuery } from "@/redux/features/admin/admin.api";
import useWalletColumns from "@/hooks/useWalletColumns";

const sortOptions: SortOption[] = [
  { label: "Name", value: "name" },
  { label: "Created At", value: "createdAt" },
];

const ManageWallets = () => {
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
  const { data, isLoading } = useGetWalletListQuery(params);
  const { columns } = useWalletColumns();

  console.log(data?.data);

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

export default ManageWallets;
