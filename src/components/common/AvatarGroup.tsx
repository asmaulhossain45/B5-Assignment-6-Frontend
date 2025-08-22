import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const images = [
  "https://github.com/shadcn.png",
  "https://github.com/evilrabbit.png",
  "https://github.com/leerob.png",
  "https://github.com/shadcn.png",
  "https://github.com/evilrabbit.png",
  "https://github.com/leerob.png",
];

const AvatarGroup = () => {
  return (
    <div className="flex flex-row flex-wrap items-center">
      {images.map((_, index) => (
        <Avatar key={index}  className={cn(index !== 0 && "-ml-2")}>
          <AvatarImage src={images[index]} alt={`Avatar Image ${index}`} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
};

export default AvatarGroup;
