import type { TMember } from "../sections/OurTeam";
import { Link } from "react-router";

type Props = {
  member: TMember;
};

const MemberCard = ({ member }: Props) => {
  return (
    <li className="flex flex-col items-center gap-4">
      <img src={member.image} className="w-44 h-44 lg:w-52 lg:h-52 object-cover rounded-full" />

      <div>
        <h3 className="text-xl font-semibold text-center">{member.name}</h3>
        <p className="description text-center font-medium">{member.role}</p>
      </div>

      <ul className="flex items-center gap-2">
        {member.socials.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className="block group p-2 bg-primary rounded-full"
            >
              <item.icon
                size={16}
                className="text-light group-hover:rotate-y-180 transition-transform duration-500"
              />
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default MemberCard;
