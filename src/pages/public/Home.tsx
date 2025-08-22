import CompanyMarquee from "@/components/public/common/CompanyMarquee";
import AboutUs from "@/components/public/sections/AboutUs";
import FAQs from "@/components/public/sections/FAQs";
import HomeHero from "@/components/public/sections/HomeHero";
import KeyFeatures from "@/components/public/sections/KeyFeatures";
import OurBlog from "@/components/public/sections/OurBlog";
import Product from "@/components/public/sections/Product";
import Testimonials from "@/components/public/sections/Testimonials";
import WhyChooseUs from "@/components/public/sections/WhyChooseUs";

const Home = () => {
  return (
    <>
      <HomeHero />
      <CompanyMarquee/>
      <AboutUs/>
      <WhyChooseUs bgColor={true}/>
      <KeyFeatures/>
      <Product bgColor={true}/>
      <Testimonials/>
      <OurBlog bgColor={true}/>
      <FAQs/>
    </>
  );
};

export default Home;
