import type { ElementType } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  Icon?: ElementType;
  Children: React.ReactNode;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  color?: "destructive" | "warning";
};

const ConfirmationModal = ({
  title,
  Icon,
  Children,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  color = "destructive",
}: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{Children}</AlertDialogTrigger>

      <AlertDialogContent className="w-96">
        <AlertDialogHeader>
          {Icon ? (
            <Icon size={40} className={cn("mx-auto", `text-${color}`)} />
          ) : (
            <Trash2 size={40} className={cn("mx-auto", `text-${color}`)} />
          )}

          <AlertDialogTitle className="text-center">
            {title ? title : "Are you sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="md:mx-auto">
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>

          <AlertDialogCancel
            onClick={onConfirm}
            className={cn(
              `bg-${color} hover:bg-${color}/70 dark:bg-${color} dark:hover:bg-${color}/70 text-light`
            )}
          >
            {confirmText}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationModal;
