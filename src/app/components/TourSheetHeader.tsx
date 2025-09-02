import { Button } from "./ui/button";
import { X, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TourSheetHeaderProps {
  onClose: () => void;
}

export const TourSheetHeader = ({ onClose }: TourSheetHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-outfit font-bold text-primary">
              París y Toda Centroeuropa
            </h2>
            <ExternalLink 
              className="w-5 h-5 text-primary cursor-pointer" 
              onClick={() => {
                onClose();
                navigate('/tour2/1');
              }}
            />
          </div>
          <p className="text-muted-foreground mt-1">18 días de aventura por Europa</p>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="relative h-64 overflow-hidden rounded-lg">
        <img
          src="https://images.unsplash.com/photo-1458668383970-8ddd3927deed"
          alt="Tour featured image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};