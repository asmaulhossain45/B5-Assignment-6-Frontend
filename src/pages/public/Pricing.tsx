import PageHeader from "@/components/public/common/PageHeader";
import FAQs from "@/components/public/sections/FAQs";
import PricingPlan from "@/components/public/sections/PricingPlan";

const Pricing = () => {
  return (
    <>
      <PageHeader
        pageName="Pricing"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        breadcrumb={["Home", "Pricing"]}
      />

      <PricingPlan bgColor={true} />

      <FAQs />
    </>
  );
};

export default Pricing;
