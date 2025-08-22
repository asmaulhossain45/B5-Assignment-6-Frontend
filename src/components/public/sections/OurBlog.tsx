import { Button } from "@/components/ui/button";
import AppSection from "../common/AppSection";
import SectionHeading from "../common/SectionHeading";
import { Link } from "react-router";
import BlogCard from "../cards/BlogCard";

import businessMan1 from "@/assets/images/Business_Man_1.jpg"
import businessWoman1 from "@/assets/images/Business_Woman_1.jpg"
import gamesCelebration1 from "@/assets/images/Games_Celebration_1.jpg"

type Props = {
  bgColor?: boolean;
};

export type TBlog = {
  title: string;
  description: string;
  category: string;
  image: string;
  date: string;
  link: string;
};

const blogsData: TBlog[] = [
  {
    title: "Cashback & Rewards: How to Maximize Your Spending",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, praesentium!",
    category: "Finance",
    image: businessMan1,
    date: "May 10, 2023",
    link: "/",
  },
  {
    title: "Digital Transaction Security: Tips to Protect Your Wallet",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, praesentium!",
    category: "Finance",
    image: businessWoman1,
    date: "May 10, 2023",
    link: "/",
  },
  {
    title: "5 Ways to Use Payment Gateway for Online Business",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, praesentium!",
    category: "Finance",
    image: gamesCelebration1,
    date: "May 10, 2023",
    link: "/",
  },
];

const OurBlog = ({ bgColor }: Props) => {
  return (
    <AppSection
      as="section"
      bgColor={bgColor}
      className="space-y-7 lg:space-y-14"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-4">
        <SectionHeading
          title="Stay Ahead in the Digital Payment World"
          subtitle="Our Blog"
        />

        <div className="flex md:justify-end">
          <Link to={"/"} className="w-fit">
            <Button>Read Our Blog</Button>
          </Link>
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 xl:gap-7">
        {blogsData.map((blog, index) => (
          <BlogCard key={index} blog={blog} bgColor={bgColor} />
        ))}
      </ul>
    </AppSection>
  );
};

export default OurBlog;
