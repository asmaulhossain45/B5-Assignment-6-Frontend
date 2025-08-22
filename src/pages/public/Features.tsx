import PageHeader from "@/components/public/common/PageHeader";
import FAQs from "@/components/public/sections/FAQs";
import KeyFeatures from "@/components/public/sections/KeyFeatures";
import WhyChooseUs from "@/components/public/sections/WhyChooseUs";

const Features = () => {
  return (
    <>
      <PageHeader
        pageName="Features"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        breadcrumb={["Home", "Features"]}
      />

      <KeyFeatures />

      <WhyChooseUs bgColor={true} />

      <FAQs />
    </>
  );
};

export default Features;
