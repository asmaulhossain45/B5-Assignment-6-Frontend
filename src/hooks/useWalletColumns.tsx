// owner, balance, type, status, isSystem, createdAt, updatedAt

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Edit } from "lucide-react";
import type { IWallet } from "@/types/IWallet";
import { WalletStatus } from "@/constants/enums";
import type { TErrorResponse } from "@/types/ErrorResponse";
import type { CellContext, ColumnDef } from "@tanstack/react-table";
import { StatusUpdateModal } from "@/components/modal/StatusUpdateModal";
import { useUpdateWalletStatusMutation } from "@/redux/features/admin/admin.api";

const useWalletColumns = () => {
  const [updateWalletStatus, { isLoading: isUpdating }] =
    useUpdateWalletStatusMutation();

  const handleStatusUpdate = async (status: string, userInfo: IWallet) => {
    const toastId = toast.loading("Updating status...");

    try {
      await updateWalletStatus({ walletId: userInfo._id, status }).unwrap();
      toast.success("Status updated successfully!", { id: toastId });
    } catch (err: unknown) {
      const error = err as { data: TErrorResponse };
      toast.error(error?.data?.message || "Failed to update status!", {
        id: toastId,
      });
    }
  };

  const columns: ColumnDef<IWallet>[] = [
    {
      header: "Serial",
      cell: (info) => info.row.index + 1,
      meta: { className: "text-center" },
    },
    {
      header: "Name",
      accessorKey: "owner.name",
      cell: ({ row }) => (
        <>
          <span className="capitalize text-base font-medium">
            {row.original.owner?.name}
          </span>
          <br />
          <span className="text-xs text-muted-foreground">
            {row.original.owner?.email}
          </span>
        </>
      ),
    },
    {
      header: "balance",
      accessorKey: "balance",
      meta: { className: "text-center capitalize" },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <span
          className={cn(
            row.original.status === WalletStatus.BLOCKED
              ? "text-destructive"
              : row.original.status === WalletStatus.INACTIVE
              ? "text-warning"
              : "text-success"
          )}
        >
          {row.original.status}
        </span>
      ),
      meta: { className: "text-center capitalize" },
    },
    {
      header: "Type",
      accessorKey: "type",
      meta: { className: "text-center capitalize" },
    },

    {
      header: () => "Actions",
      accessorKey: "actions",
      cell: (info: CellContext<IWallet, unknown>) => (
        <div className="flex items-center justify-center gap-4">
          <StatusUpdateModal
            statusType="wallet"
            isLoading={isUpdating}
            title="Are you sure?"
            description={`You want to update wallet status of ${info.row.original.owner?.name}? Because this action can't be undone.`}
            currentStatus={info.row.original.status}
            onConfirm={(status: string) =>
              handleStatusUpdate(status, info.row.original)
            }
            children={
              <button className="">
                <Edit size={24} />
              </button>
            }
          />
        </div>
      ),
      meta: { className: "text-center" },
    },
  ];

  return { columns, isUpdating };
};

export default useWalletColumns;
