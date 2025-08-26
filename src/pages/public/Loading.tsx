import { cn } from "@/lib/utils";

type LoadingProps = {
  size?: "sm" | "md" | "lg" | number;
  type?: "page" | "card" | "inline";
  className?: string;
};

const Loading = ({ size = "md", type = "card", className }: LoadingProps) => {
  const sizes: Record<string, string> = {
    sm: "h-12 w-12 border-4",
    md: "h-20 w-20 border-6",
    lg: "h-28 w-28 border-8",
  };

  const typeClass = {
    page: "min-h-screen flex items-center justify-center",
    card: "flex items-center justify-center",
    inline: "inline-flex items-center justify-center",
  };

  const spinnerSize =
    typeof size === "number"
      ? `h-[${size}px] w-[${size}px] border-4`
      : sizes[size];

  return (
    <section className={cn(typeClass[type], className)}>
      <div
        className={cn(
          spinnerSize,
          "border-x-transparent border-y-primary animate-spin rounded-full"
        )}
      />
    </section>
  );
};

export default Loading;
