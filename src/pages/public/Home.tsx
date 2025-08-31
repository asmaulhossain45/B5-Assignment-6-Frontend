import CompanyMarquee from "@/components/common/CompanyMarquee";
import AboutUs from "@/components/sections/AboutUs";
import FAQs from "@/components/sections/FAQs";
import HomeHero from "@/components/sections/HomeHero";
import KeyFeatures from "@/components/sections/KeyFeatures";
import OurBlog from "@/components/sections/OurBlog";
import Product from "@/components/sections/Product";
import Testimonials from "@/components/sections/Testimonials";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

const Home = () => {
  return (
    <>
      <HomeHero />
      <CompanyMarquee />
      <AboutUs />
      <WhyChooseUs bgColor={true} />
      <KeyFeatures />
      <Product bgColor={true} />
      <Testimonials />
      <OurBlog bgColor={true} />
      <FAQs />
    </>
  );
};

export default Home;
