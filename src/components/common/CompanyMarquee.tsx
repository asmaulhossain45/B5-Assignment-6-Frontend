import Marquee from "react-fast-marquee";

import companyLogo1 from "@/assets/company/logo_1.png";
import companyLogo2 from "@/assets/company/logo_2.png";
import companyLogo3 from "@/assets/company/logo_3.png";
import companyLogo4 from "@/assets/company/logo_4.png";
import companyLogo5 from "@/assets/company/logo_5.png";
import companyLogo6 from "@/assets/company/logo_6.png";
import companyLogo7 from "@/assets/company/logo_7.png";
import companyLogo8 from "@/assets/company/logo_8.png";
import companyLogo9 from "@/assets/company/logo_9.png";
import companyLogo10 from "@/assets/company/logo_10.png";

const companies = [
  companyLogo1,
  companyLogo2,
  companyLogo3,
  companyLogo4,
  companyLogo5,
  companyLogo6,
  companyLogo7,
  companyLogo8,
  companyLogo9,
  companyLogo10,
];

const CompanyMarquee = () => {
  return (
    <Marquee className="bg-primary py-6 xl:py-8">
      {[...companies, ...companies].map((logo, index) => (
        <img
          src={logo}
          alt={`Company Logo ${index}`}
          key={index}
          className="w-auto brightness-0 invert h-4 md:h-6 xl:h-8 mx-3 md:mx-6 xl:mx-8"
        />
      ))}
    </Marquee>
  );
};

export default CompanyMarquee;
