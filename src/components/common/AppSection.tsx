import { cn } from "@/lib/utils";

interface Props {
  as?: "div" | "section" | "article";
  children: React.ReactNode;
  className?: string;
  bgColor?: boolean;
}

const AppSection = ({
  children,
  as: Component = "section",
  bgColor = false,
  className,
}: Props) => {
  return (
    <Component
      className={cn(
        bgColor && "bg-section border-y",
        Component === "section" && "py-14 lg:py-28"
      )}
    >
      <div
        className={cn(
          "max-w-screen-2xl mx-auto w-full px-4 md:px-8",

          className
        )}
      >
        {children}
      </div>
    </Component>
  );
};

export default AppSection;
