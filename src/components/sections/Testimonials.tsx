import SectionHeading from "../common/SectionHeading";

import avatar1 from "@/assets/avatar/pic_1.jpg";
import avatar2 from "@/assets/avatar/pic_2.jpg";
import avatar3 from "@/assets/avatar/pic_3.jpg";
import avatar4 from "@/assets/avatar/pic_4.jpg";
import TestimonialCard from "../cards/TestimonialCard";
import AppSection from "../common/AppSection";

type Props = {
  bgColor?: boolean;
};

export type TTestimonial = {
  name: string;
  city: string;
  title: string;
  description: string;
  image: string;
};

const testimonialsData: TTestimonial[] = [
  {
    name: "Sarah Vadelah",
    city: "New York",
    title: "Payments made easy",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt consectetur adipiscing elit",
    image: avatar1,
  },
  {
    name: "John Doe",
    city: "London",
    title: "Super secure and reliable",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt consectetur adipiscing elit",
    image: avatar2,
  },
  {
    name: "Emma Jueis",
    city: "Sydney",
    title: "Fast and hassle-free",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt consectetur adipiscing elit",
    image: avatar3,
  },
  {
    name: "Michael Luixz",
    city: "Toronto",
    title: "Love the analytics feature",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt consectetur adipiscing elit",
    image: avatar4,
  },
];

const Testimonials = ({ bgColor }: Props) => {
  return (
    <AppSection
      as="section"
      bgColor={bgColor}
      className="space-y-7 lg:space-y-14"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-4">
        <SectionHeading title="What Our Clients Say" subtitle="Testimonials" />

        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-7">
        {testimonialsData.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            testimonial={testimonial}
            bgColor={bgColor}
          />
        ))}
      </ul>
    </AppSection>
  );
};

export default Testimonials;
