import { ApprovalStatus } from "@/constants/enums";
import { useUpdateAgentApprovalMutation } from "@/redux/features/admin/admin.api";
import type { TErrorResponse } from "@/types/ErrorResponse";
import type { IAccount } from "@/types/IAccount";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, ShieldUser } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
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
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  agent: IAccount;
};

const formSchema = z.object({
  approvalStatus: z.enum(Object.values(ApprovalStatus)),
});

const AgentApprovalModal = ({ agent }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateAgentApproval, { isLoading }] = useUpdateAgentApprovalMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      approvalStatus: agent.approvalStatus,
    },
  });

  const handleApproval = async (value: z.infer<typeof formSchema>) => {
    const toastId = "Approval updating...";
    try {
      await updateAgentApproval({
        email: agent.email,
        approvalStatus: value.approvalStatus,
      }).unwrap();
      toast.success(`${agent.name} ${value.approvalStatus} successfully.`, {
        id: toastId,
      });
    } catch (err: unknown) {
      const error = err as { data: TErrorResponse };
      toast.error(error?.data?.message || "Approval update Failed!", {
        id: toastId,
      });
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <ShieldUser size={20} className="text-success" />
      </DialogTrigger>

      <DialogContent className="w-96 rounded-none" showCloseButton={false}>
        <DialogHeader className="items-center gap-6">
          <DialogTitle>
            <CircleAlert size={56} className="text-success" />
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to update {agent.name} approval status?
            Because this action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id="update-form" onSubmit={form.handleSubmit(handleApproval)}>
            <FormField
              control={form.control}
              name="approvalStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">
                    Agent Approval Status
                  </FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="capitalize w-full rounded-none">
                        <SelectValue placeholder="Approval Status" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent className="rounded-none">
                      {Object.values(ApprovalStatus).map((status) => (
                        <SelectItem
                          key={status}
                          value={status}
                          className="capitalize"
                        >
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter className="mt-6 sm:justify-center">
          <DialogClose asChild>
            <Button variant={"outline"} className="rounded-none">
              Cancel
            </Button>
          </DialogClose>

          <Button
            variant={"success"}
            type="submit"
            form="update-form"
            className="rounded-none"
            disabled={!form.formState.isDirty || isLoading}
          >
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AgentApprovalModal;
