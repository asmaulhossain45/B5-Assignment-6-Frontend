import {
  useGetAllLimitQuery,
  useToggleLimitMutation,
} from "@/redux/features/limit/limit.api";
import type { TErrorResponse } from "@/types/ErrorResponse";
import type { ILimit } from "@/types/ILimit";
import type { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import DeleteLimitModal from "../modal/DeleteLimitModal";
import LimitModal from "../modal/LimitModal";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ListTable } from "./ListTable";

const LimitTable = () => {
  const { data, isLoading } = useGetAllLimitQuery();
  const [toggleLimit, { isLoading: toggling }] = useToggleLimitMutation();

  const handleToggleStatus = async (limit: ILimit) => {
    try {
      await toggleLimit({ type: limit.type, role: limit.role }).unwrap();
    } catch (error) {
      const err = error as TErrorResponse;
      toast.error(err.message || "Status update Failed!");
    }
  };

  const columns: ColumnDef<ILimit>[] = [
    {
      accessorKey: "type",
      header: () => (
        <span>
          Transaction Type
          <br />
          <span className="text-xs text-muted-foreground">User Role</span>
        </span>
      ),
      cell: ({ row }) => (
        <span className="capitalize">
          {row.original.type}
          <br />
          <span className="text-xs text-muted-foreground">
            {row.original.role}
          </span>
        </span>
      ),
    },
    {
      accessorKey: "minAmount",
      meta: { className: "text-right" },
      header: () => (
        <span>
          Min Amount
          <br />
          <span className="text-xs text-muted-foreground">Max Amount</span>
        </span>
      ),
      cell: ({ row }) => (
        <span>
          $ {row.original?.minAmount?.toFixed(2) ?? "N/A"}
          <br />
          <span className="text-xs text-muted-foreground">
            $ {row.original?.maxAmount?.toFixed(2) ?? "N/A"}
          </span>
        </span>
      ),
    },
    {
      accessorKey: "dailyLimit",
      meta: { className: "text-right" },
      header: () => (
        <span>
          Daily Limit
          <br />
          <span className="text-xs text-muted-foreground">Weekly Limit</span>
        </span>
      ),
      cell: ({ row }) => (
        <span>
          $ {row.original?.dailyLimit?.toFixed(2) ?? "N/A"}
          <br />
          <span className="text-xs text-muted-foreground">
            $ {row.original?.weeklyLimit?.toFixed(2) ?? "N/A"}
          </span>
        </span>
      ),
    },
    {
      accessorKey: "monthlyLimit",
      header: "Monthly Limit",
      meta: { className: "text-right" },
      cell: ({ row }) => (
        <span>$ {row.original?.monthlyLimit?.toFixed(2) ?? "N/A"}</span>
      ),
    },
    {
      header: "Actions",
      meta: { className: "text-center" },
      cell: ({ row }) => {
        const limit = row.original;

        return (
          <div className="flex items-center justify-center gap-3">
            <Tooltip>
              <TooltipTrigger>
                <Switch
                  disabled={toggling}
                  checked={limit.isActive}
                  onCheckedChange={() => handleToggleStatus(limit)}
                />
              </TooltipTrigger>
              <TooltipContent side="left">
                <p className="text-xs text-light">
                  {limit.isActive ? "Active" : "Inactive"}
                </p>
              </TooltipContent>
            </Tooltip>

            <LimitModal limit={limit}>
              <button>
                <EditIcon size={18} />
              </button>
            </LimitModal>

            <DeleteLimitModal limit={limit}>
              <button>
                <Trash2Icon size={18} className="text-destructive" />
              </button>
            </DeleteLimitModal>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Limits</h1>

        <LimitModal>
          <Button size={"sm"} variant={"outline"}>
            New
          </Button>
        </LimitModal>
      </div>
      <ListTable
        data={data?.data ?? []}
        columns={columns}
        isLoading={isLoading}
        skeletonCount={5}
      />
    </div>
  );
};

export default LimitTable;
