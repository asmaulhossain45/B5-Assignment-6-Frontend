import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { BadgeCheck, Edit, Trash2 } from "lucide-react";
import { Roles, UserStatus } from "@/constants/enums";
import type { TErrorResponse } from "@/types/ErrorResponse";
import type { CellContext, ColumnDef } from "@tanstack/react-table";
import ConfirmationModal from "@/components/modal/ConfirmationModal";
import { StatusUpdateModal } from "@/components/modal/StatusUpdateModal";
import {
  useUpdateAgentApprovalMutation,
  useUpdateUserStatusMutation,
} from "@/redux/features/admin/admin.api";
import type { IAccount } from "@/types/IAccount";

type Props = {
  role: Roles;
};

const useUserColumns = ({ role }: Props) => {
  const [updateUserStatus, { isLoading: isUpdating }] =
    useUpdateUserStatusMutation();

  const [updateAgentApproval, { isLoading: isApproving }] =
    useUpdateAgentApprovalMutation();

  const handleStatusUpdate = async (status: string, userInfo: IAccount) => {
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

  const handleApprove = async (userInfo: IAccount) => {
    const toastId = toast.loading(
      `${userInfo.isApproved ? "Rejecting" : "Approving"} ${userInfo.name}...`
    );

    try {
      await updateAgentApproval({
        email: userInfo.email,
        isApproved: userInfo.isApproved ? false : true,
      }).unwrap();
      toast.success(
        `${userInfo.name} ${
          userInfo.isApproved ? "rejected" : "approved"
        } successfully!`,
        { id: toastId }
      );
    } catch (err: unknown) {
      const error = err as { data: TErrorResponse };
      toast.error(
        error?.data?.message ||
          `Failed to ${userInfo.isApproved ? "reject" : "approve"}`,
        {
          id: toastId,
        }
      );
    }
  };

  const handleDelete = async (userInfo: IAccount) => {
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

  const columns: ColumnDef<IAccount>[] = [
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
          <span className="capitalize text-base font-medium">
            {row.original.name}
          </span>{" "}
          <br />
          <span className="text-xs text-muted-foreground">
            {row.original.email}
          </span>
        </>
      ),
    },
    ...(role === Roles.AGENT
      ? [
          {
            header: () => (
              <div>
                <span>Approved Status</span> <br />
                <span className="text-xs text-muted-foreground">Action By</span>
              </div>
            ),
            accessorKey: "isApproved",
            cell: ({ row }: CellContext<IAccount, unknown>) => (
              <>
                <span>
                  {!row.original.approvedBy
                    ? "Pending"
                    : row.original.isApproved
                    ? "Approved"
                    : "Rejected"}
                </span>
                <br />
                <span className="text-xs text-muted-foreground">
                  {row.original?.approvedBy?.email}
                </span>
              </>
            ),
          },
        ]
      : []),
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
      cell: (info: CellContext<IAccount, unknown>) => (
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

          {info.row.original.role === Roles.AGENT && (
            <ConfirmationModal
              description={`You want to ${
                info.row.original.isApproved ? "reject" : "approve"
              } ${
                info.row.original.name
              }? Because this action can't be undone.`}
              Icon={BadgeCheck}
              confirmText={`${
                info.row.original.isApproved ? "Reject" : "Approve"
              }`}
              color="warning"
              Children={
                <button className="text-warning">
                  <BadgeCheck size={24} />
                </button>
              }
              onConfirm={() => handleApprove(info.row.original)}
            />
          )}

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

  return { columns, isUpdating, isApproving };
};

export default useUserColumns;
