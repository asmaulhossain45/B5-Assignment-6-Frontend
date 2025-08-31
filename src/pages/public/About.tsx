import PageHeader from "@/components/common/PageHeader";
import AboutUs from "@/components/sections/AboutUs";
import OurTeam from "@/components/sections/OurTeam";
import Product from "@/components/sections/Product";
import WhyChooseUs from "@/components/sections/WhyChooseUs";


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
