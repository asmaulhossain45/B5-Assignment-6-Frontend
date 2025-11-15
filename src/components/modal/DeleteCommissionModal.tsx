import { useDeleteCommissionMutation } from "@/redux/features/commission/commission.api";
import type { TErrorResponse } from "@/types/ErrorResponse";
import type { ICommission } from "@/types/ICommission";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Spinner } from "../ui/spinner";

type Props = {
  children: React.ReactNode;
  commission: ICommission;
};

const DeleteCommissionModal = ({ children, commission }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteCommission, { isLoading: isDeleting }] =
    useDeleteCommissionMutation();

  const handleDeleteCommission = async () => {
    try {
      await deleteCommission(commission.type).unwrap();
      toast.success("Commission Deleted Successfully");
      setIsOpen(false);
    } catch (err: unknown) {
      const error = err as { data: TErrorResponse };
      toast.error(error?.data?.message || "Commission Deleted Failed");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            You want to delete {commission.type}. Because this action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>

          <Button
            size={"sm"}
            variant={"destructive"}
            onClick={handleDeleteCommission}
          >
            {isDeleting ? <Spinner /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCommissionModal;
