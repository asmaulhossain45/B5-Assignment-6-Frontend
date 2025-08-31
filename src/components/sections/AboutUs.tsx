import { Headset, Smartphone } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";
import MockupImage2 from "@/assets/mockup/2.png";
import AppSection from "../common/AppSection";

type Props = {
  bgColor?: boolean;
};

const cardData: { icon: ElementType; title: string; description: string }[] = [
  {
    icon: Smartphone,
    title: "Secure & Reliable",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    icon: Headset,
    title: "Global Support",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const AboutUs = ({ bgColor }: Props) => {
  return (
    <AppSection
      bgColor={bgColor}
      className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center"
    >
      <div className="space-y-7 lg:space-y-14">
        <SectionHeading
          title="Building the Future of Digital Payments"
          subtitle="About Us"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          align="left"
          className="max-w-2xl"
        />

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-7">
          {cardData.map((card, index) => (
            <li
              key={index}
              className={cn(
                "relative space-y-4 p-6 rounded-lg border",
                bgColor ? "bg-background" : "bg-muted/40"
              )}
            >
              <div className="absolute bg-primary rounded-full p-2 -top-2 right-4">
                <card.icon size={24} className="text-light" />
              </div>
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p>{card.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative group">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 blur-3xl rounded-full z-0" />
        <img
          src={MockupImage2}
          alt="About Us Image"
          className="relative mx-auto move-up"
        />
      </div>
    </AppSection>
  );
};

export default AboutUs;
