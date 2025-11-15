import { UserStatus } from "@/constants/enums";
import { useUpdateUserStatusMutation } from "@/redux/features/admin/admin.api";
import type { TErrorResponse } from "@/types/ErrorResponse";
import type { IAccount } from "@/types/IAccount";
import { Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type Props = {
  user: IAccount;
};

const UserDeleteModal = ({ user }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateUserStatus, { isLoading }] = useUpdateUserStatusMutation();

  const handleDelete = async () => {
    const toastId = "User deleting...";
    try {
      await updateUserStatus({
        email: user.email,
        status: UserStatus.DELETED,
      });
      toast.success(`${user.name} deleted successfully.`, { id: toastId });
    } catch (err: unknown) {
      const error = err as { data: TErrorResponse };
      toast.error(error?.data?.message || "Deleting Failed!", { id: toastId });
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Trash2 size={20} className="text-destructive" />
      </DialogTrigger>

      <DialogContent className="w-96 rounded-none" showCloseButton={false}>
        <DialogHeader className="items-center gap-6">
          <DialogTitle className="border p-3 rounded-full border-destructive">
            <X size={30} className="text-destructive" />
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to delete {user.name}? Because this action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6 sm:justify-center">
          <DialogClose asChild>
            <Button variant={"outline"} className="rounded-none">
              Cancel
            </Button>
          </DialogClose>

          <Button
            variant={"destructive"}
            onClick={handleDelete}
            className="rounded-none"
            disabled={isLoading}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDeleteModal;
