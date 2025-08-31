import { cn } from "@/lib/utils";
import { Link } from "react-router";
import { CircleCheckBig } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TPlan } from "../sections/PricingPlan";

type Props = {
  plan: TPlan;
  bgColor: boolean;
};

const PricingCard = ({ plan, bgColor }: Props) => {
  return (
    <li
      className={cn(
        "relative flex flex-col gap-4 p-6 rounded-xl border",
        bgColor ? "bg-background" : "bg-section"
      )}
    >
      {plan.popular && (
        <h6
          className={cn(
            "absolute top-6 right-0 px-6 py-1 shadow-md",
            "text-sm text-center rounded-s-full",
            "bg-primary text-light"
          )}
        >
          Popular
        </h6>
      )}

      <h4 className="text-lg font-semibold">{plan.name}</h4>

      <h2 className="text-4xl font-bold">
        ${plan.price}
        <span className="text-base text-primary font-medium">/month</span>
      </h2>

      <p>{plan.description}</p>

      <div className="w-full h-[1px] bg-border" />

      <ul className="flex-grow space-y-4">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex gap-2">
            <CircleCheckBig size={14} className="text-primary mt-1" />
            <span className="description">{feature}</span>
          </li>
        ))}
      </ul>

      <Link to={"/contact"} className="block mt-6">
        <Button className="w-full">Get Started</Button>
      </Link>
    </li>
  );
};

export default PricingCard;
