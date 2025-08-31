import PageHeader from "@/components/common/PageHeader";
import FAQs from "@/components/sections/FAQs";
import KeyFeatures from "@/components/sections/KeyFeatures";
import WhyChooseUs from "@/components/sections/WhyChooseUs";


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
