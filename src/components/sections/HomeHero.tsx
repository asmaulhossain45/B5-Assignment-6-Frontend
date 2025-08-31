import HeroImage from "@/assets/mockup/1.png";
import HeroImage2 from "@/assets/images/Activities.png";
import AvatarGroup from "@/components/common/AvatarGroup";
import RatingGroup from "@/components/common/RatingGroup";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import AppSection from "../common/AppSection";

const HomeHero = () => {
  return (
    <AppSection as="section">
      <div className="mt-16">
        <p className="fontmedium text-center mb-2">
          E-WALLET & PAYMENT GATEWAY
        </p>
        <h1 className="max-w-4xl mx-auto text-4xl md:text-5xl xl:text-6xl font-bold text-center">
          The Future of Digital Payments!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:items-center gap-4 xl:gap-8 mt-7 lg:mt-14">
          <div className="relative group md:col-span-2 xl:col-span-1 xl:order-2">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 rounded-full blur-3xl z-0" />

            <img
              src={HeroImage}
              alt="Hero Image"
              className="relative mx-auto move-up"
            />
          </div>

          <img
            src={HeroImage2}
            alt="Hero Image"
            className="xl:order-1 mx-auto"
          />

          <div className="xl:order-3 flex flex-col gap-4">
            <h3 className="text-lg font-semibold">
              Pay, Transfer & Manage Money Effortlessly & Securely
            </h3>

            <p>
              Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do
              eiusmod
            </p>

            <Link to={"/register"}>
              <Button>Get Started</Button>
            </Link>

            <div className="space-y-4">
              <RatingGroup />

              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold">9.5</span>
                <p>Lorem ipsum dolor sit amet, consectetur</p>
              </div>

              <AvatarGroup />
            </div>
          </div>
        </div>
      </div>
    </AppSection>
  );
};

export default HomeHero;
