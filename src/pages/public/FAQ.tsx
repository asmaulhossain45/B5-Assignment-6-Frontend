import PageHeader from "@/components/common/PageHeader";
import FAQs from "@/components/sections/FAQs";
import Product from "@/components/sections/Product";


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
