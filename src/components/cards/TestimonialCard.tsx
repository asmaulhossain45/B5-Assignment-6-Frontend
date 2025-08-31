import { cn } from "@/lib/utils";
import type { TTestimonial } from "../sections/Testimonials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

type Props = {
  bgColor?: boolean;
  testimonial: TTestimonial;
};

const TestimonialCard = ({ testimonial, bgColor }: Props) => {
  return (
    <li
      className={cn(
        "relative flex flex-col gap-6 p-6 rounded-lg border",
        bgColor ? "bg-background" : "bg-muted/40"
      )}
    >
      <h3 className="text-lg xl:text-xl font-semibold">{testimonial.title}</h3>

      <p className="flex-grow description">"{testimonial.description}"</p>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage
              src={testimonial.image}
              alt={testimonial.name}
              className="object-cover"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <h4 className="font-semibold">{testimonial.name}</h4>
            <p className="description text-primary font-medium">
              {testimonial.city}
            </p>
          </div>
        </div>
        <Quote size={36} />
      </div>
    </li>
  );
};

export default TestimonialCard;
