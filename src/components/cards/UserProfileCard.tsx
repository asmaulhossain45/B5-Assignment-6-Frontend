import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { NavLink } from "react-router";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/formatdate";

// name, email, dob, phone, gender, location, status, isVerified
const UserProfileCard = () => {
  const { currentUser, userRole } = useCurrentUser();

  const dob = currentUser?.dob
    ? formatDate(new Date(currentUser.dob))
    : undefined;

  return (
    <div className="bg-sidebar grid grid-cols-1 lg:grid-cols-4 gap-6 border p-4 md:p-6 w-full max-w-96 lg:max-w-2xl">
      <Avatar
        className={cn(
          "lg:col-span-1 h-32 w-32 border p-1 mx-auto lg:mx-0",
          currentUser?.isVerified ? "border-success" : "border-destructive"
        )}
      >
        <AvatarImage
          src={"https://github.com/shadcn.png"}
          alt={currentUser?.name}
          className={cn("object-cover rounded-full")}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="lg:col-span-3 w-full border-t pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-6">
        <div className="flex justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">{currentUser?.name}</h3>
            <span className="text-xs text-muted-foreground">
              {currentUser?.email}
            </span>
          </div>

          <NavLink to={`/dashboard/${userRole}/profile-management`}>
            <Button className="rounded-none">Edit</Button>
          </NavLink>
        </div>

        <Separator className="my-4 md:my-6" />

        <div className="space-y-4">
          <h5>
            Email:{" "}
            <span className="text-muted-foreground">
              {currentUser?.email || "Not Provided"}
            </span>
          </h5>
          <h5>
            Phone:{" "}
            <span className="text-muted-foreground">
              {currentUser?.phone || "Not Provided"}
            </span>
          </h5>
          <h5>
            DOB:{" "}
            <span className="text-muted-foreground">
              {dob ? dob : "Not Provided"}
            </span>
          </h5>
          <h5>
            Gender:{" "}
            <span className="text-muted-foreground">
              {currentUser?.gender || "Not Provided"}
            </span>
          </h5>
          <h5>
            Division:{" "}
            <span className="text-muted-foreground">
              {currentUser?.location?.division || "Not Provided"}
            </span>
          </h5>
          <h5>
            District:{" "}
            <span className="text-muted-foreground">
              {currentUser?.location?.district || "Not Provided"}
            </span>
          </h5>

          <h5>
            Address:{" "}
            <span className="text-muted-foreground">
              {currentUser?.location?.address || "Not Provided"}
            </span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
