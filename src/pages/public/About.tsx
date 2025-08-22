import PageHeader from "@/components/public/common/PageHeader";
import AboutUs from "@/components/public/sections/AboutUs";
import OurTeam from "@/components/public/sections/OurTeam";
import Product from "@/components/public/sections/Product";
import WhyChooseUs from "@/components/public/sections/WhyChooseUs";

const About = () => {
  return (
    <>
      <PageHeader
        pageName="About Us"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        breadcrumb={["Home", "About"]}
      />

      <AboutUs bgColor={true} />

      <WhyChooseUs />

      <Product bgColor={true} />

      <OurTeam />
    </>
  );
};

export default About;
