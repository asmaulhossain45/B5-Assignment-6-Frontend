import { cn } from "@/lib/utils";
import type { IAccount } from "@/types/IAccount";
import { Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";

type Props = {
  user: IAccount;
};

const UserViewModal = ({ user }: Props) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Eye size={20} />
      </PopoverTrigger>

      <PopoverContent>
        <div className="space-y-2">
          <Avatar
            className={cn(
              "border p-[2px] mx-auto",
              user?.isVerified ? "border-success" : "border-destructive"
            )}
          >
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="object-cover rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-center mt-2">
            <h3 className="text-sm font-semibold">{user?.name}</h3>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <Separator className="my-2" />
          <div className="text-xs flex items-center gap-2 justify-between">
            <h6>DOB:</h6>

            <h6 className="text-muted-foreground">
              {user?.dob
                ? new Date(user.dob).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "N/A"}
            </h6>
          </div>
          <div className="text-xs flex items-center gap-2 justify-between">
            <h6>Gender:</h6>

            <h6 className="text-muted-foreground">{user?.gender || "N/A"}</h6>
          </div>
          <div className="text-xs flex items-center gap-2 justify-between">
            <h6>Phone:</h6>

            <h6 className="text-muted-foreground">{user?.phone || "N/A"}</h6>
          </div>
          <div className="text-xs flex items-center gap-2 justify-between">
            <h6>Division:</h6>

            <h6 className="text-muted-foreground">
              {user?.location?.division || "N/A"}
            </h6>
          </div>
          <div className="text-xs flex items-center gap-2 justify-between">
            <h6>District:</h6>

            <h6 className="text-muted-foreground">
              {user?.location?.district || "N/A"}
            </h6>
          </div>{" "}
          <div className="text-xs flex items-center gap-2 justify-between">
            <h6>Address:</h6>

            <h6 className="text-muted-foreground">
              {user?.location?.address || "N/A"}
            </h6>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserViewModal;
