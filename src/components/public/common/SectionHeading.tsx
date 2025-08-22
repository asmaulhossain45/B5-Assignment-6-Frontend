import { cn } from "@/lib/utils";

interface Props {
  title?: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

const SectionHeading = ({
  title,
  subtitle,
  description,
  align = "left",
  className,
}: Props) => {
  const alignment = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <div className={cn("flex flex-col gap-4", alignment[align], className)}>
      {subtitle && (
        <h3 className="text-base lg:text-lg text-primary font-semibold uppercase">{subtitle}</h3>
      )}

      {title && (
        <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold leading-[1.4]">
          {title}
        </h2>
      )}

      {description && <p className="description">{description}</p>}
    </div>
  );
};

export default SectionHeading;
