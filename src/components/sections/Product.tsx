import { cn } from "@/lib/utils";
import SectionHeading from "../common/SectionHeading";
import type { ElementType } from "react";
import { Wallet } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import mockup_4 from "@/assets/mockup/4.png";
import AppSection from "../common/AppSection";

type Props = {
  bgColor?: boolean;
};

type Card = {
  icon: ElementType;
  title: string;
  description: string;
  path: string;
};

const stats: { title: string; value: string }[] = [
  { title: "Active Users", value: "72K+" },
  { title: "Daily Transactions", value: "45K+" },
  { title: "Security Guaranteed", value: "99%" },
  { title: "Integrated Merchants", value: "500+" },
];

const productData1: Card[] = [
  {
    icon: Wallet,
    title: "Digital Wallet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    path: "/",
  },
  {
    icon: Wallet,
    title: "Data Protection",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    path: "/",
  },
];

const productData2: Card[] = [
  {
    icon: Wallet,
    title: "Global Support",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    path: "/",
  },
  {
    icon: Wallet,
    title: "Secure & Reliable",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    path: "/",
  },
];

const Product = ({ bgColor }: Props) => {
  return (
    <AppSection
      as="section"
      bgColor={bgColor}
      className="space-y-7 lg:space-y-14"
    >
      <SectionHeading
        title="Why Millions Trust Us for Their Payments"
        subtitle="Product"
        align="center"
        className="max-w-2xl mx-auto"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-4">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          {productData1.map((card, index) => (
            <li
              key={index}
              className={cn(
                "relative flex flex-col gap-4 p-6 rounded-xl border",
                bgColor ? "bg-background" : "bg-muted/40"
              )}
            >
              <div className="absolute bg-primary p-3 rounded-full -top-2 right-4">
                <card.icon size={24} className="text-light" />
              </div>
              <h4 className="text-xl font-semibold">{card.title}</h4>
              <p className="description">{card.description}</p>

              <Link to={card.path}>
                <Button>Read More</Button>
              </Link>
            </li>
          ))}
        </ul>

        <div className="group relative">
          <div className="absolute w-3/4 h-3/4 mx-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary/30 rounded-full blur-3xl z-0" />

          <img
            src={mockup_4}
            alt="mockup 4"
            className="relative w-3/4 md:w-1/4 lg:w-2/4 h-auto mx-auto move-up"
          />
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          {productData2.map((card, index) => (
            <li
              key={index}
              className={cn(
                "relative flex flex-col gap-4 p-6 rounded-xl border",
                bgColor ? "bg-background" : "bg-muted/40"
              )}
            >
              <div className="absolute bg-primary p-3 rounded-full -top-2 right-4">
                <card.icon size={24} className="text-light" />
              </div>
              <h4 className="text-xl font-semibold">{card.title}</h4>
              <p className="description">{card.description}</p>

              <Link to={card.path}>
                <Button>Read More</Button>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <ul
        className={cn(
          "grid grid-cols-2 lg:grid-cols-4 gap-7 border rounded-xl p-6 lg:p-10",
          bgColor ? "bg-background" : "bg-muted/40"
        )}
      >
        {stats.map((stat, index) => (
          <li
            key={index}
            className="flex flex-col items-start md:items-center gap-2"
          >
            <h3 className="text-4xl text-primary font-semibold">
              {stat.value}
            </h3>
            <p className="description font-medium">{stat.title}</p>
          </li>
        ))}
      </ul>
    </AppSection>
  );
};

export default Product;
