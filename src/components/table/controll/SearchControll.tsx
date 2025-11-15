import { Input } from "@/components/ui/input";

type Props = {
  placeholder: string;
  searchInput: string;
  setSearchInput: (value: string) => void;
};

const SearchControll = ({
  placeholder,
  searchInput,
  setSearchInput,
}: Props) => {
  return (
    <Input
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      placeholder={placeholder || "Search here..."}
      className="py-2 rounded-none bg-sidebar dark:bg-sidebar md:max-w-64"
    />
  );
};

export default SearchControll;
