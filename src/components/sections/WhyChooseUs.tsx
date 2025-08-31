import { Layers } from "lucide-react";
import SectionHeading from "../common/SectionHeading";

import mockup_3 from "@/assets/mockup/3.png";
import manPose1 from "@/assets/images/Man_Pose_1.png";
import { cn } from "@/lib/utils";
import AppSection from "../common/AppSection";

type Props = {
  bgColor?: boolean;
};

const WhyChooseUs = ({ bgColor }: Props) => {
  return (
    <AppSection as="section" bgColor={bgColor} className="space-y-7 lg:space-y-14">
      <SectionHeading
        title="Why Millions Trust Us for Their Payments"
        subtitle="Why Choose Us"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
        align="center"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 items-end gap-4 xl:gap-7">
        <div className="relative group h-[28rem] bg-chart-3 rounded-lg p-6 overflow-hidden">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl font-semibold text-light">
              The Best Payment <br /> Experience
            </h3>
            <div className="w-fit rounded-full bg-light p-3">
              <Layers size={24} className="text-primary" />
            </div>
          </div>

          <img src={mockup_3} alt="" className="absolute left-0 move-up" />
        </div>

        <div className="bg-primary rounded-lg p-6">
          <h3 className="text-5xl text-right font-semibold text-light">275+</h3>

          <h3 className="text-xl font-semibold text-light mt-28 mb-2">
            Fintech & Merchants <br /> Worldwide
          </h3>
          <p className="description text-light">
            Lorem ipsum dolor sit amet, cons ectetur , luctus nec
          </p>
        </div>

        <div
          className={cn(
            bgColor ? "bg-background" : "bg-muted/40",
            "relative group h-[28rem] border p-6 rounded-lg overflow-hidden"
          )}
        >
          <h3 className="text-xl text-right font-semibold">
            Future of Payments <br /> Together
          </h3>

          <img src={manPose1} alt="man pose" className="absolute right-0 move-up" />
        </div>
      </div>
    </AppSection>
  );
};

export default WhyChooseUs;
