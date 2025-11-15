import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ListFilter } from "lucide-react";

type Props = {
  isFetching: boolean;
  order: "asc" | "desc";
  setSort: (value: string) => void;
  setOrder: (value: "asc" | "desc") => void;
  sortOptions: { label: string; value: string }[];
};

const SortControl = ({
  isFetching = false,
  setSort,
  order,
  setOrder,
  sortOptions,
}: Props) => {
  return (
    <div className="flex items-center gap-2">
      <Select onValueChange={(value) => setSort(value)}>
        <SelectTrigger
          disabled={isFetching}
          className="w-36 rounded-none bg-sidebar dark:bg-sidebar"
        >
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent className="rounded-none">
          <SelectGroup>
            <SelectLabel>Select for sort</SelectLabel>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button
        variant={"outline"}
        className={cn("rounded-none bg-sidebar dark:bg-sidebar")}
        onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
        disabled={isFetching}
      >
        <ListFilter
          className={cn(
            order === "asc" ? "rotate-x-180" : "rotate-x-0",
            "transition-transform duration-200 ease-in-out"
          )}
        />
      </Button>
    </div>
  );
};

export default SortControl;
