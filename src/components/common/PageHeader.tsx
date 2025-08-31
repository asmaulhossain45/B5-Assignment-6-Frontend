import { ChevronsRight } from "lucide-react";
import AppSection from "./AppSection";
import CompanyMarquee from "./CompanyMarquee";

import pageHeaderPhoto from "@/assets/images/Business_Man_1.jpg";
import { cn } from "@/lib/utils";

type Props = {
  pageName: string;
  description?: string;
  breadcrumb: string[];
};

const PageHeader = ({ pageName, description, breadcrumb }: Props) => {
  return (
    <>
      <div className="relative min-h-96 flex flex-col justify-center mt-16">
        <img
          src={pageHeaderPhoto}
          alt=""
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute h-full w-full bg-gradient-to-r from-background/95 via-background/80 to-transparent" />

        <AppSection
          as="section"
          className="relative flex flex-col gap-4 lg:gap-6"
        >
          <h1 className="text-4xl lg:text-5xl font-bold capitalize">{pageName}</h1>

          <p className="description max-w-xl">{description}</p>

          <ul className="font-medium flex">
            {breadcrumb.map((item, index) => (
              <li key={index} className="flex items-center">
                <span
                  className={cn("capitalize text-lg font-medium",
                    index === breadcrumb.length - 1 && "text-primary"
                  )}
                >
                  {item}
                </span>

                {index !== breadcrumb.length - 1 && (
                  <ChevronsRight size={24} className="text-primary mx-1" />
                )}
              </li>
            ))}
          </ul>
        </AppSection>
      </div>
      <CompanyMarquee />
    </>
  );
};

export default PageHeader;
