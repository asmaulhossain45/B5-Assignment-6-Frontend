import { useMemo, useState } from "react";
import { useDebounce } from "./useDebounce";

export const useQueryParams = (initialLimit = 10) => {
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState<string>("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);

  const debouncedSearch = useDebounce(searchInput, 500);

  const params = useMemo(
    () => ({
      ...(debouncedSearch ? { search: debouncedSearch } : {}),
      ...filters,
      sort: order === "desc" ? `-${sort}` : sort,
      page,
      limit,
    }),
    [debouncedSearch, filters, page, limit, sort, order]
  );

  return {
    params,
    searchInput,
    setSearchInput,
    filters,
    setFilters,
    page,
    setPage,
    limit,
    setLimit,
    sort,
    order,
    setSort,
    setOrder,
  };
};
