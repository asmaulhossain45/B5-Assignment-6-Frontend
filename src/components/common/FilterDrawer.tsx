import { X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Form } from "../ui/form";
import type {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { useState } from "react";

type Props<T extends FieldValues = FieldValues> = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  form: UseFormReturn<T>;
  onApply: SubmitHandler<T>;
  onReset: () => void;
};

const FilterDrawer = <T extends FieldValues>({
  trigger,
  children,
  onApply,
  onReset,
  form,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="flex-row items-center justify-between">
          <DrawerTitle>Filter By</DrawerTitle>

          <DrawerClose asChild>
            <Button variant={"outline"} size={"icon"}>
              <X />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <Form {...form}>
          <form
            id="filter-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(onApply)();
              setIsOpen(false);
            }}
            onReset={() => {
              onReset();
              form.reset();
            }}
            className="grid grid-cols-1 gap-6 px-4"
          >
            {children}
          </form>

          <DrawerFooter>
            <Button
              form="filter-form"
              variant={"outline"}
              size={"sm"}
              type="reset"
              className="rounded-none"
            >
              Reset
            </Button>

            <DrawerClose>
              <Button
                form="filter-form"
                variant={"default"}
                size={"sm"}
                type="submit"
                className="rounded-none w-full disabled:cursor-not-allowed"
                disabled={!form.formState.isValid}
              >
                Apply
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterDrawer;
