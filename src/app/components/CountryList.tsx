import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FilterItem } from "./FilterItem";

interface Country {
  id: string;
  name: string;
  region: string;
}

interface CountryListProps {
  countries: Country[];
  selectedCountries: string[];
  onCountrySelect: (countryId: string) => void;
}

export const CountryList = ({ countries, selectedCountries, onCountrySelect }: CountryListProps) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      handleScroll();
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = 200;
    const container = scrollContainerRef.current;
    const newScrollLeft = container.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
    
    container.scrollTo({
      left: Math.max(0, newScrollLeft),
      behavior: "smooth"
    });
  };

  return (
    <div className="relative">
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
      )}
      
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide"
        style={{ 
          scrollbarWidth: "none", 
          msOverflowStyle: "none",
          maxHeight: "180px" // Aproximadamente 2 filas de elementos
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-max">
          {countries.map((country) => (
            <FilterItem
              key={country.id}
              {...country}
              isSelected={selectedCountries.includes(country.id)}
              onClick={() => onCountrySelect(country.id)}
            />
          ))}
        </div>
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      )}
    </div>
  );
};