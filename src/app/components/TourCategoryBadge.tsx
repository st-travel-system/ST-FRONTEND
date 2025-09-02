import { Badge } from "../components/ui/badge";

interface TourCategoryBadgeProps {
  category: string;
}

export const TourCategoryBadge = ({ category }: TourCategoryBadgeProps) => {
  return (
    <a 
      href={`/tours/${category.toLowerCase().replace(/\s+/g, '-')}`}
      className="inline-block"
    >
      <Badge 
        className="bg-[#2d0a44] text-[#fff] font-semibold px-4 py-2 rounded-full text-sm hover:bg-[#4d1a7a] transition"
      >
        {category}
      </Badge>
    </a>
  );
};
