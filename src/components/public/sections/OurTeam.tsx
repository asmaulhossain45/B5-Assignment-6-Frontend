import type { ElementType } from "react";
import AppSection from "../common/AppSection";
import {
  Dribbble,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

import member1 from "@/assets/avatar/pic_1.jpg";
import member2 from "@/assets/avatar/pic_2.jpg";
import member3 from "@/assets/avatar/pic_3.jpg";
import member4 from "@/assets/avatar/pic_4.jpg";
import SectionHeading from "../common/SectionHeading";
import MemberCard from "../cards/MemberCard";

type Props = {
  bgColor?: boolean;
};

export type TMember = {
  name: string;
  role: string;
  image: string;
  socials: { icon: ElementType; path: string }[];
};

const teamMembers: TMember[] = [
  {
    name: "Alex Johnson",
    role: "CEO & Founder",
    image: member1,
    socials: [
      { icon: Linkedin, path: "https://linkedin.com/in/alex" },
      { icon: Twitter, path: "https://twitter.com/alex" },
      { icon: Github, path: "https://github.com/alex" },
    ],
  },
  {
    name: "Sophia Martinez",
    role: "Lead Designer",
    image: member2,
    socials: [
      { icon: Dribbble, path: "https://dribbble.com/sophia" },
      { icon: Instagram, path: "https://instagram.com/sophia" },
      { icon: Facebook, path: "https://behance.net/sophia" },
    ],
  },
  {
    name: "Ethan Carter",
    role: "Head of Development",
    image: member3,
    socials: [
      { icon: Github, path: "https://github.com/ethan" },
      { icon: Linkedin, path: "https://linkedin.com/in/ethan" },
      { icon: Twitter, path: "https://twitter.com/ethan" },
    ],
  },
  {
    name: "Lily Chen",
    role: "Marketing Strategist",
    image: member4,
    socials: [
      { icon: Linkedin, path: "https://linkedin.com/in/lily" },
      { icon: Instagram, path: "https://instagram.com/lily" },
      { icon: Twitter, path: "https://twitter.com/lily" },
    ],
  },
];

const OurTeam = ({ bgColor }: Props) => {
  return (
    <AppSection
      as="section"
      bgColor={bgColor}
      className="space-y-7 lg:space-y-14"
    >
      <SectionHeading
        title="The Professionals Behind Our Innovation"
        subtitle="Our Team"
        align="center"
        className="max-w-2xl mx-auto"
      />

      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-14">
        {teamMembers.map((member, index) => (
          <MemberCard key={index} member={member} />
        ))}
      </ul>
    </AppSection>
  );
};

export default OurTeam;
