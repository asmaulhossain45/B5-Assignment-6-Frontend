import { useDeleteLimitMutation } from "@/redux/features/limit/limit.api";
import type { TErrorResponse } from "@/types/ErrorResponse";
import type { ILimit } from "@/types/ILimit";
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
  limit: ILimit;
};

const DeleteLimitModal = ({ children, limit }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteLimit, { isLoading: isDeleting }] = useDeleteLimitMutation();

  const handleDelete = async () => {
    try {
      await deleteLimit({
        type: limit.type,
        role: limit.role,
      }).unwrap();
      toast.success("Limit Deleted Successfully");
      setIsOpen(false);
    } catch (err: unknown) {
      const error = err as { data: TErrorResponse };
      toast.error(error?.data?.message || "Limit Deleted Failed");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            You want to delete {limit.type}. Because this action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>

          <Button variant={"destructive"} size={"sm"} onClick={handleDelete}>
            {isDeleting ? <Spinner /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteLimitModal;
