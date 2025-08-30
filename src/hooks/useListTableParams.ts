import { useState, useCallback } from "react";
import { useDebounce } from "./useDebounce";

export const useListTableParams = (initialLimit = 10) => {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const debouncedSearch = useDebounce(searchInput, 500);

  const setSort = useCallback((field: string, order: "asc" | "desc") => {
    setSortBy(field);
    setSortOrder(order);
    setPage(1);
  }, []);

  const params = {
    search: debouncedSearch,
    page,
    limit,
    sort: sortBy ? (sortOrder === "desc" ? `-${sortBy}` : sortBy) : undefined,
  };

  return {
    params,
    searchInput,
    setSearchInput,
    page,
    setPage,
    limit,
    setLimit,
    sortBy,
    sortOrder,
    setSort,
  };
};
