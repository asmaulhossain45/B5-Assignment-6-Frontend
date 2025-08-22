import PageHeader from "@/components/public/common/PageHeader";
import FAQs from "@/components/public/sections/FAQs";
import Product from "@/components/public/sections/Product";

const FAQ = () => {
  return (
    <>
      <PageHeader
        pageName="FAQs"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        breadcrumb={["Home", "FAQs"]}
      />

      <Product bgColor={true} />

      <FAQs />
    </>
  );
};

export default FAQ;
