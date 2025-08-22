import { Star } from "lucide-react";

const RatingGroup = () => {
  return (
    <ul className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <li key={index}>
          <Star size={18} className="text-warning" />
        </li>
      ))}
    </ul>
  );
};

export default RatingGroup;
