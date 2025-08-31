// name, email, password, dob, phone, gender, location, status, isVerified
// role, wallet (User)
// role, wallet, businessName, isApproved, ApprovedBy, approvedAt (Agent)

import ConfirmationModal from "@/components/modal/ConfirmationModal";
import { StatusUpdateModal } from "@/components/modal/StatusUpdateModal";
import { UserStatus } from "@/constants/enums";
import { cn } from "@/lib/utils";
import { useUpdateUserStatusMutation } from "@/redux/features/admin/admin.api";
import type { TErrorResponse } from "@/types/ErrorResponse";
import type { IAdmin } from "@/types/IAdmin";
import type { CellContext, ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

// role (Admin)
const useUserColumns = () => {
  const [updateUserStatus, { isLoading: isUpdating }] =
    useUpdateUserStatusMutation();

  const handleStatusUpdate = async (status: string, userInfo: IAdmin) => {
    const toastId = toast.loading("Updating status...");

    try {
      await updateUserStatus({ email: userInfo.email, status }).unwrap();
      toast.success("Status updated successfully!", { id: toastId });
    } catch (err: unknown) {
      const error = err as { data: TErrorResponse };
      toast.error(error?.data?.message || "Failed to update status!", {
        id: toastId,
      });
    }
  };

  const handleDelete = async (userInfo: IAdmin) => {
    const toastId = toast.loading(`Deleting ${userInfo.name}...`);

    try {
      await updateUserStatus({
        email: userInfo.email,
        status: UserStatus.DELETED,
      }).unwrap();
      toast.success(`${userInfo.name} deleted successfully!`, { id: toastId });
    } catch (err: unknown) {
      const error = err as { data: TErrorResponse };
      toast.error(error?.data?.message || "Failed to update status!", {
        id: toastId,
      });
    }
  };

  const columns: ColumnDef<IAdmin>[] = [
    {
      header: "Serial",
      cell: (info) => info.row.index + 1,
      meta: { className: "text-center" },
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <>
          <span className="capitalize text-base font-medium">{row.original.name}</span> <br />
          <span className="text-xs text-muted-foreground">
            {row.original.email}
          </span>
        </>
      ),
    },
    {
      header: "Role",
      accessorKey: "role",
      meta: { className: "capitalize text-center" },
    },
    {
      header: "Status",
      accessorKey: "status",
      meta: { className: "text-center capitalize" },
    },
    {
      header: "Verified",
      accessorKey: "isVerified",
      cell: ({ row }) => (
        <span
          className={cn(
            row.original.isVerified ? "text-success" : "text-destructive"
          )}
        >
          {row.original.isVerified ? "Yes" : "No"}
        </span>
      ),
      meta: { className: "text-center" },
    },
    {
      header: () => "Actions",
      accessorKey: "actions",
      cell: (info: CellContext<IAdmin, unknown>) => (
        <div className="flex items-center justify-center gap-4">
          <StatusUpdateModal
            isLoading={isUpdating}
            currentStatus={info.row.original.status}
            statusType="user"
            title="Are you sure?"
            description={`You want to change the status of ${info.row.original.name}? Because this action can't be undone.`}
            onConfirm={(status: string) =>
              handleStatusUpdate(status, info.row.original)
            }
            children={
              <button className="">
                <Edit size={24} />
              </button>
            }
          />

          <ConfirmationModal
            description={`You want to delete ${info.row.original.name}? Because this action is cannot be undone.`}
            confirmText="Delete"
            Children={
              <button className="text-destructive">
                <Trash2 size={24} />
              </button>
            }
            onConfirm={() => handleDelete(info.row.original)}
          />
        </div>
      ),
      meta: { className: "text-center" },
    },
  ];

  return { columns, isUpdating };
};

export default useUserColumns;
