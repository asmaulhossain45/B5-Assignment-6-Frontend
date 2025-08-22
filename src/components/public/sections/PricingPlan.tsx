import PricingCard from "../cards/PricingCard";
import AppSection from "../common/AppSection";
import SectionHeading from "../common/SectionHeading";

type Props = {
  bgColor?: boolean;
};

export type TPlan = {
  name: string;
  price: number;
  description: string;
  features: string[];
  popular: boolean;
};

const plans: TPlan[] = [
  {
    name: "Starter",
    price: 0,
    description:
      "For individuals who want to try digital payments with no risk.",
    features: [
      "Create a free wallet account",
      "Send & receive money instantly",
      "Basic fraud protection",
      "Transaction history (last 30 days)",
      "Monthly limit: $1,000",
      "Community support",
    ],
    popular: false,
  },
  {
    name: "Personal",
    price: 4.99,
    description: "Great for personal users who make regular transactions.",
    features: [
      "Unlimited wallet transfers",
      "QR code payments",
      "Bill & mobile recharge support",
      "2FA account security",
      "Monthly limit: $10,000",
      "Standard support",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: 14.99,
    description: "Designed for freelancers & small business owners.",
    features: [
      "Unlimited transactions",
      "Priority 24/7 support",
      "Advanced fraud & dispute protection",
      "Transaction history export (CSV/PDF)",
      "Monthly limit: $100,000",
      "Wallet-to-bank transfers",
    ],
    popular: true,
  },
  {
    name: "Business",
    price: 39.99,
    description: "For enterprises handling large payment volumes.",
    features: [
      "Unlimited global transactions",
      "Multi-user team accounts",
      "Dedicated account manager",
      "API & integrations for custom apps",
      "Advanced reporting & analytics",
      "Custom transaction limits",
    ],
    popular: false,
  },
];

const PricingPlan = ({ bgColor = false }: Props) => {
  return (
    <AppSection
      as="section"
      bgColor={bgColor}
      className="space-y-7 lg:space-y-14"
    >
      <SectionHeading
        title="Choose the Right Plan for Your Needs"
        subtitle="Pricing Plan"
        align="center"
        className="max-w-2xl mx-auto"
      />

      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-7">
        {plans.map((plan, index) => (
          <PricingCard key={index} plan={plan} bgColor={bgColor} />
        ))}
      </ul>
    </AppSection>
  );
};

export default PricingPlan;
