import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export const CurrentUserAvatar = ({ className }: Props) => {
  const { currentUser } = useCurrentUser();
  return (
      <Avatar
        className={cn(
          className,
          "border p-[2px]",
          currentUser?.isVerified ? "border-success" : "border-destructive"
        )}
      >
        <AvatarImage
          src="https://github.com/shadcn.png"
          className="rounded-full"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
  );
};
