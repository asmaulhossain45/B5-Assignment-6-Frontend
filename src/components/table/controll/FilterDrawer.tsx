import { X } from "lucide-react";
import { useState } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Button } from "../../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../ui/form";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

export interface FilterConfig {
  field: string;
  label: string;
  type: "radio" | "select" | "boolean";
  options?: { label: string; value: string | boolean }[];
}

export type FilterValue = string | number | boolean | undefined;

type Props<T extends FieldValues = FieldValues> = {
  form: UseFormReturn<T>;
  filterConfig: FilterConfig[];
  setFilters: (filters: Record<string, FilterValue>) => void;
  setPage: (page: number) => void;
};

const FilterDrawer = <T extends FieldValues>({
  form,
  filterConfig,
  setFilters,
  setPage,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const applyFilters = (data: T) => {
    const updatedData: Record<string, FilterValue> = Object.fromEntries(
      Object.entries(data).filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, value]) => value !== "" && value !== undefined
      )
    );
    setFilters(updatedData);
    setPage(1);
    setIsOpen(false);
  };

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          variant={"outline"}
          className="rounded-none bg-sidebar dark:bg-sidebar"
        >
          Filter
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="flex-row items-center justify-between gap-4 border-b mb-4">
          <div>
            <DrawerTitle>Filter By</DrawerTitle>
            <DrawerDescription>Select options to filter</DrawerDescription>
          </div>

          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => setIsOpen(!isOpen)}
          >
            <X />
          </Button>
        </DrawerHeader>

        <Form {...form}>
          <form id="filter-form" className="flex flex-col px-4 gap-6">
            {filterConfig.map((filter, index) => (
              <FormField
                key={index}
                control={form.control}
                name={filter.field as Path<T>}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{filter.label}</FormLabel>

                      {filter.type === "radio" && (
                        <FormControl>
                          <RadioGroup
                            value={field.value ?? ""}
                            onValueChange={field.onChange}
                          >
                            {filter.options?.map((option, index) => (
                              <FormItem
                                key={index}
                                className="flex items-center gap-3"
                              >
                                <FormControl>
                                  <RadioGroupItem
                                    value={String(option.value)}
                                  />
                                </FormControl>
                                <FormLabel>{option.label}</FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      )}

                      {filter.type === "boolean" && (
                        <FormControl>
                          <RadioGroup
                            onValueChange={(val) =>
                              field.onChange(val === "true")
                            }
                            value={
                              field.value !== undefined
                                ? String(field.value)
                                : ""
                            }
                            className="flex flex-col gap-2"
                          >
                            {filter.options?.map((option, index) => (
                              <FormItem
                                key={index}
                                className="flex items-center gap-3"
                              >
                                <RadioGroupItem value={String(option.value)} />
                                <FormLabel>{option.label}</FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      )}

                      {filter.type === "select" && (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full max-w-64 rounded-none dark:bg-transparent">
                              <SelectValue placeholder={filter.label} />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>{filter.label}</SelectLabel>
                              {filter.options?.map((option, index) => (
                                <SelectItem
                                  key={index}
                                  value={String(option.value)}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    </FormItem>
                  );
                }}
              />
            ))}
          </form>
        </Form>

        <DrawerFooter className="border-t">
          <Button
            variant={"outline"}
            className="rounded-none"
            onClick={() => {
              form.reset();
              setFilters({});
              setPage(1);
            }}
          >
            Reset
          </Button>

          <Button
            variant={"default"}
            className="rounded-none"
            onClick={form.handleSubmit(applyFilters)}
            disabled={!form.formState.isDirty}
          >
            Apply
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterDrawer;
