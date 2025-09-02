import { LucideIcon } from "lucide-react";
import { cn } from "../lib/utils";
import '../styles/base.css';

interface FilterItemProps {
  icon?: LucideIcon;
  iconUrl?: string;
  name: string;
  onClick: () => void;
  isSelected?: boolean;
  showCloseIcon?: boolean;
  noBorder?: boolean;
  className?: string; // Cambié esta propiedad a opcional para mejor flexibilidad
}

export const FilterItem = ({
  icon: Icon,
  iconUrl,
  name,
  className, // Recibimos className aquí
  onClick,
  isSelected,
  showCloseIcon,
  noBorder = false,
}: FilterItemProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white w-20 h-20 flex flex-col items-center justify-center mr-3 md:ml-5 lg:ml-5 xl:ml-5 sm:ml-3 xs:ml-3 p-3 rounded-lg text-center cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-lg",
        !noBorder && isSelected && "ring-2 ring-primary", // Aplica borde si está seleccionado
        className // Asegúrate de que className sea aplicado aquí
      )}
    >
      {Icon && <Icon className="w-12 h-12 mb-2 text-primary" />}
      {iconUrl && (
        <img
          src={iconUrl}
          alt={name}
          className="w-10 h-10 mb-2 object-contain"
        />
      )}
      <h3 className="font-outfit font-medium text-xs text-[#545D6B]">
        {name}
      </h3>
    </div>
  );
};
