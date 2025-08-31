import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserStatus, WalletStatus } from "@/constants/enums";
import { Info } from "lucide-react";
import { useState } from "react";

type Props = {
  isLoading?: boolean;
  title?: string;
  description?: string;
  currentStatus: string;
  statusType: "user" | "wallet" | "transaction";
  children: React.ReactNode;
  onConfirm: (value: string) => void;
};

export function StatusUpdateModal({
  children,
  title,
  description,
  onConfirm,
  currentStatus,
  statusType,
  isLoading = false,
}: Props) {
  const [selectedOption, setSelectedOption] = useState<string>(currentStatus);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className="w-96">
        <AlertDialogHeader>
          <Info size={40} className="text-warning mx-auto" />

          <AlertDialogTitle className="text-center">
            {title ? title : "Are you sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {description ? description : "This action cannot be undone."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Select value={selectedOption} onValueChange={setSelectedOption}>
          <SelectTrigger className="w-full uppercase">
            <SelectValue placeholder="Select new status" />
          </SelectTrigger>
          <SelectContent>
            {statusType === "user"
              ? Object.values(UserStatus).map((status) => (
                  <SelectItem key={status} value={status} className="uppercase">
                    {status}
                  </SelectItem>
                ))
              : statusType === "wallet"
              ? Object.values(WalletStatus).map((status) => (
                  <SelectItem key={status} value={status} className="uppercase">
                    {status}
                  </SelectItem>
                ))
              : null}
          </SelectContent>
        </Select>

        <AlertDialogFooter className="md:mx-auto">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-warning hover:bg-warning/70 text-light"
            onClick={() => onConfirm(selectedOption)}
            disabled={selectedOption === currentStatus || isLoading}
          >
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
