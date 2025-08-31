import { Button } from "@/components/ui/button";
import type { TBlog } from "../sections/OurBlog";
import { Link } from "react-router";
import { cn } from "@/lib/utils";

type Props = {
  blog: TBlog;
  bgColor?: boolean;
};

const BlogCard = ({ blog, bgColor }: Props) => {
  return (
    <li
      className={cn(
        "relative group space-y-4 p-4 lg:space-y-6 lg:p-6 rounded-xl border",
        bgColor ? "bg-background" : "bg-muted/40"
      )}
    >
      <div className="relative overflow-hidden">
        <div
          className={cn(
            "w-full h-full bg-accent absolute inset-0 rounded-lg opacity-0",
            "group-hover:opacity-50 transition-opacity duration-300"
          )}
        />

        <p className="absolute right-2 top-2 bg-primary text-light px-2 py-1 rounded-sm text-xs">{blog.category}</p>

        <img
          src={blog.image}
          alt={`${blog.title} Image`}
          className="w-full rounded-lg"
        />
      </div>

      <div className="flex flex-col gap-4">
        <h4
          className={cn(
            "text-lg lg:text-xl font-semibold line-clamp-2",
            "hover:text-primary transition-colors duration-300"
          )}
        >
          {blog.title}
        </h4>

        <p className="description">{blog.description}</p>

        <Link to={blog.link}>
          <Button>Read More</Button>
        </Link>
      </div>
    </li>
  );
};

export default BlogCard;
