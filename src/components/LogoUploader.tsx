
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Image } from 'lucide-react';

interface LogoUploaderProps {
  logo?: string;
  logoSize: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  onLogoChange: (logo?: string) => void;
  onLogoSizeChange: (size: number) => void;
  onErrorCorrectionLevelChange: (level: 'L' | 'M' | 'Q' | 'H') => void;
}

const LogoUploader = ({
  logo,
  logoSize,
  errorCorrectionLevel,
  onLogoChange,
  onLogoSizeChange,
  onErrorCorrectionLevelChange
}: LogoUploaderProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Logo image must be smaller than 2MB');
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      onLogoChange(event.target?.result as string);
      setIsLoading(false);
      toast.success('Logo uploaded successfully');
    };

    reader.onerror = () => {
      setIsLoading(false);
      toast.error('Failed to load logo image');
    };

    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    onLogoChange(undefined);
    toast.success('Logo removed');
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="block mb-2">Upload Logo</Label>
        
        {!logo ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 cursor-pointer hover:bg-muted/50 transition-colors">
            <Image className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag & drop logo or click to browse
            </p>
            <Input
              id="logo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoUpload}
              disabled={isLoading}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('logo-upload')?.click()}
              disabled={isLoading}
            >
              {isLoading ? 'Uploading...' : 'Select Logo'}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="border rounded-lg p-2 mb-2 bg-muted/30">
              <img
                src={logo}
                alt="Logo Preview"
                className="max-h-24 max-w-full object-contain"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('logo-upload')?.click()}
              >
                Change
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={removeLogo}
              >
                Remove
              </Button>
              <Input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <Label>Logo Size: {logoSize}%</Label>
        <Slider
          value={[logoSize]}
          min={5}
          max={30}
          step={1}
          className="mt-2"
          onValueChange={(value) => onLogoSizeChange(value[0])}
          disabled={!logo}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Recommended size: 15-25%
        </p>
      </div>

      <div>
        <Label className="block mb-2">Error Correction Level</Label>
        <RadioGroup
          value={errorCorrectionLevel}
          onValueChange={(value) => 
            onErrorCorrectionLevelChange(value as 'L' | 'M' | 'Q' | 'H')
          }
          className="grid grid-cols-4 gap-2"
        >
          <ErrorLevelOption 
            value="L" 
            label="Low (7%)" 
            selected={errorCorrectionLevel === 'L'} 
            recommended={!logo}
          />
          <ErrorLevelOption 
            value="M" 
            label="Medium (15%)" 
            selected={errorCorrectionLevel === 'M'} 
            recommended={logo && logoSize < 15}
          />
          <ErrorLevelOption 
            value="Q" 
            label="High (25%)" 
            selected={errorCorrectionLevel === 'Q'} 
            recommended={logo && logoSize >= 15 && logoSize < 25}
          />
          <ErrorLevelOption 
            value="H" 
            label="Max (30%)" 
            selected={errorCorrectionLevel === 'H'} 
            recommended={logo && logoSize >= 25}
          />
        </RadioGroup>
        <p className="text-xs text-muted-foreground mt-2">
          Higher levels increase QR code reliability when using a logo
        </p>
      </div>
    </div>
  );
};

interface ErrorLevelOptionProps {
  value: string;
  label: string;
  selected: boolean;
  recommended: boolean;
}

const ErrorLevelOption = ({ 
  value, 
  label, 
  selected, 
  recommended 
}: ErrorLevelOptionProps) => {
  return (
    <div>
      <RadioGroupItem 
        value={value} 
        id={`error-level-${value}`} 
        className="peer sr-only" 
      />
      <Label
        htmlFor={`error-level-${value}`}
        className={`
          flex flex-col items-center justify-center p-2 border rounded-md 
          cursor-pointer transition-all text-center
          ${selected 
            ? 'border-primary bg-primary/5 text-primary' 
            : 'border-muted hover:border-primary/30 hover:bg-primary/5'
          }
          ${recommended && !selected ? 'border-accent/50' : ''}
          peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2
        `}
      >
        <span className="font-bold">{value}</span>
        <span className="text-xs">{label}</span>
        {recommended && (
          <span className="text-xs text-accent mt-1">Recommended</span>
        )}
      </Label>
    </div>
  );
};

export default LogoUploader;
