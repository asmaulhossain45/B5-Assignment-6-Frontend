import type { IMetaResponse } from "@/types/IMeta";
import { Button } from "../ui/button";

type Props = {
  meta: IMetaResponse;
  setPage: (page: number) => void;
  isLoading?: boolean;
  isFetching?: boolean;
};

const TablePagination = ({
  meta = { page: 1, totalPage: 1 },
  setPage,
  isLoading,
  isFetching,
}: Props) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <p>
        {meta?.page || 1} of {meta?.totalPage || 1} pages
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => setPage(meta?.page - 1)}
          disabled={meta?.page === 1 || isLoading || isFetching}
          className="bg-sidebar rounded-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => setPage(meta?.page + 1)}
          disabled={meta?.page === meta?.totalPage || isLoading || isFetching}
          className="bg-sidebar rounded-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TablePagination;
