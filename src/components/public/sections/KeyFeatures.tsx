import { type ElementType } from "react";
import AppSection from "../common/AppSection";
import { Button } from "@/components/ui/button";
import SectionHeading from "../common/SectionHeading";
import { BookAudio, CreditCard, MonitorStop, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  bgColor?: boolean;
};

const featuresData: {
  icon: ElementType;
  title: string;
  description: string;
}[] = [
  {
    icon: MonitorStop,
    title: "Analytics & Financial",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, praesentium!",
  },
  {
    icon: CreditCard,
    title: "Payment Gateway",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, praesentium!",
  },
  {
    icon: BookAudio,
    title: "Financial Reports",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, praesentium!",
  },
  {
    icon: Receipt,
    title: "Service & Cashback",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, praesentium!",
  },
];

const KeyFeatures = ({ bgColor }: Props) => {
  return (
    <AppSection
      as="section"
      bgColor={bgColor}
      className="space-y-7 lg:space-y-14"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-4 lg:gap-7">
        <SectionHeading
          title="Convenience at Your Fingertips"
          subtitle="Key Features"
        />

        <div className="space-y-4">
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt
          </p>

          <Button>Read More</Button>
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-7">
        {featuresData.map((feature, index) => (
          <li
            key={index}
            className={cn("flex flex-col p-6 rounded-xl border", bgColor ? "bg-background" : "bg-muted/40")}
          >
            <div className="w-fit bg-primary p-4 rounded-full">
              <feature.icon size={36} className="text-light" />
            </div>

            <h4 className="text-xl font-semibold mt-6 mb-4">{feature.title}</h4>

            <p className="description">{feature.description}</p>
          </li>
        ))}
      </ul>
    </AppSection>
  );
};

export default KeyFeatures;
