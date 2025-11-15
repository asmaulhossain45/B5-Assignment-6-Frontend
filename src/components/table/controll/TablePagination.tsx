import { Button } from "@/components/ui/button";
import type { IMetaResponse } from "@/types/IMeta";

type Props = {
  meta: IMetaResponse;
  isFetching: boolean;
  setPage: (page: number) => void;
};

const TablePagination = ({
  setPage,
  isFetching = false,
  meta = { page: 1, totalPage: 1 },
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
          disabled={meta?.page === 1 || isFetching}
          className="bg-sidebar rounded-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => setPage(meta?.page + 1)}
          disabled={meta?.page === meta?.totalPage || isFetching}
          className="bg-sidebar rounded-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TablePagination;
