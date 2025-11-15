import {
  useGetAllCommissionQuery,
  useToggleCommissionMutation,
} from "@/redux/features/commission/commission.api";
import type { TErrorResponse } from "@/types/ErrorResponse";
import type { ICommission } from "@/types/ICommission";
import type { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import CommissionModal from "../modal/CommissionModal";
import DeleteCommissionModal from "../modal/DeleteCommissionModal";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ListTable } from "./ListTable";

const CommissionsTable = () => {
  const { data: result, isLoading } = useGetAllCommissionQuery();
  const [toggleCommission, { isLoading: toggling }] =
    useToggleCommissionMutation();

  const handleToggleStatus = async (commission: ICommission) => {
    try {
      await toggleCommission(commission.type).unwrap();
    } catch (error) {
      const err = error as TErrorResponse;
      toast.error(err.message || "Status update Failed!");
    }
  };

  const columns: ColumnDef<ICommission>[] = [
    {
      accessorKey: "type",
      header: () => (
        <span>
          Transaction Type
          <br />
          <span className="text-xs text-muted-foreground">Active Status</span>
        </span>
      ),
      cell: ({ row }) => (
        <span className="capitalize">
          {row.original.type}
          <br />
          <span className="text-xs text-muted-foreground">
            {row.original.isActive ? "Active" : "Inactive"}
          </span>
        </span>
      ),
    },
    {
      accessorKey: "charge",
      header: "System Charge",
      meta: { className: "text-right" },
      cell: ({ row }) => <span>{row.original.charge?.toFixed(2)}%</span>,
    },
    {
      accessorKey: "commission",
      header: "Agent Commission",
      meta: { className: "text-right" },
      cell: ({ row }) => <span>{row.original.commission?.toFixed(2)}%</span>,
    },
    {
      header: "Actions",
      meta: { className: "text-center" },
      cell: ({ row }) => {
        const commission = row.original;

        return (
          <div className="flex items-center justify-center gap-3">
            <Tooltip>
              <TooltipTrigger>
                <Switch
                  disabled={toggling}
                  checked={commission.isActive}
                  onCheckedChange={() => handleToggleStatus(commission)}
                />
              </TooltipTrigger>
              <TooltipContent side="left">
                <p className="text-xs text-light">
                  {commission.isActive ? "Active" : "Inactive"}
                </p>
              </TooltipContent>
            </Tooltip>

            <CommissionModal commission={commission}>
              <button>
                <EditIcon size={18} />
              </button>
            </CommissionModal>

            <DeleteCommissionModal commission={commission}>
              <button>
                <Trash2Icon size={18} className="text-destructive" />
              </button>
            </DeleteCommissionModal>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Commissions</h1>

        <CommissionModal>
          <Button variant={"outline"} size={"sm"} className="btn btn-primary">
            New
          </Button>
        </CommissionModal>
      </div>

      <ListTable
        data={result?.data ?? []}
        columns={columns}
        isLoading={isLoading}
        skeletonCount={5}
      />
    </div>
  );
};

export default CommissionsTable;
