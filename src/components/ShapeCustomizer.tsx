
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { DotShape, EyeShape } from '@/utils/qrTypes';
import { Square, Circle, Diamond, Star, BadgeCheck } from 'lucide-react';

interface ShapeCustomizerProps {
  dotShape: DotShape;
  eyeShape: EyeShape;
  onDotShapeChange: (shape: DotShape) => void;
  onEyeShapeChange: (shape: EyeShape) => void;
}

const ShapeCustomizer = ({
  dotShape,
  eyeShape,
  onDotShapeChange,
  onEyeShapeChange
}: ShapeCustomizerProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label className="block mb-3">Dot Shape</Label>
        <RadioGroup
          value={dotShape}
          onValueChange={(value) => onDotShapeChange(value as DotShape)}
          className="grid grid-cols-3 gap-3"
        >
          <ShapeOption 
            value="square" 
            label="Square" 
            selected={dotShape === 'square'}
            icon={<Square className="h-5 w-5" />} 
          />
          <ShapeOption 
            value="circle" 
            label="Circle" 
            selected={dotShape === 'circle'}
            icon={<Circle className="h-5 w-5" />} 
          />
          <ShapeOption 
            value="rounded" 
            label="Rounded" 
            selected={dotShape === 'rounded'}
            icon={<Square className="h-5 w-5 rounded-sm" />} 
          />
          <ShapeOption 
            value="diamond" 
            label="Diamond" 
            selected={dotShape === 'diamond'}
            icon={<Diamond className="h-5 w-5" />} 
          />
          <ShapeOption 
            value="star" 
            label="Star" 
            selected={dotShape === 'star'}
            icon={<Star className="h-5 w-5" />} 
          />
        </RadioGroup>
      </div>

      <div>
        <Label className="block mb-3">Eye Shape</Label>
        <RadioGroup
          value={eyeShape}
          onValueChange={(value) => onEyeShapeChange(value as EyeShape)}
          className="grid grid-cols-3 gap-3"
        >
          <ShapeOption 
            value="square" 
            label="Square" 
            selected={eyeShape === 'square'}
            icon={<Square className="h-5 w-5" />} 
          />
          <ShapeOption 
            value="circle" 
            label="Circle" 
            selected={eyeShape === 'circle'}
            icon={<Circle className="h-5 w-5" />} 
          />
          <ShapeOption 
            value="rounded" 
            label="Rounded" 
            selected={eyeShape === 'rounded'}
            icon={<Square className="h-5 w-5 rounded-sm" />} 
          />
          <ShapeOption 
            value="leaf" 
            label="Leaf" 
            selected={eyeShape === 'leaf'}
            icon={<BadgeCheck className="h-5 w-5" />} 
          />
          <ShapeOption 
            value="shield" 
            label="Shield" 
            selected={eyeShape === 'shield'}
            icon={<Square className="h-5 w-5 rounded-t-lg" />} 
          />
        </RadioGroup>
      </div>
    </div>
  );
};

interface ShapeOptionProps {
  value: string;
  label: string;
  selected: boolean;
  icon: React.ReactNode;
}

const ShapeOption = ({ value, label, selected, icon }: ShapeOptionProps) => {
  return (
    <div>
      <RadioGroupItem 
        value={value} 
        id={`shape-${value}`} 
        className="peer sr-only" 
      />
      <Label
        htmlFor={`shape-${value}`}
        className={`
          flex flex-col items-center justify-center p-2 border rounded-md 
          cursor-pointer transition-all
          ${selected 
            ? 'border-primary bg-primary/5 text-primary' 
            : 'border-muted hover:border-primary/30 hover:bg-primary/5'
          }
          peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2
        `}
      >
        <div className="mb-1">
          {icon}
        </div>
        <span className="text-xs font-medium">{label}</span>
      </Label>
    </div>
  );
};

export default ShapeCustomizer;
