
import { Button } from '@/components/ui/button';
import { DownloadFormat } from '@/utils/qrTypes';

interface DownloadOptionsProps {
  onDownload: (format: DownloadFormat) => void;
}

const DownloadOptions = ({ onDownload }: DownloadOptionsProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-lg font-medium">Download QR Code</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <FormatButton 
          format="png" 
          label="PNG" 
          description="Best for web" 
          onClick={() => onDownload('png')} 
        />
        <FormatButton 
          format="svg" 
          label="SVG" 
          description="Scalable vector" 
          onClick={() => onDownload('svg')} 
        />
        <FormatButton 
          format="jpg" 
          label="JPG" 
          description="Common format" 
          onClick={() => onDownload('jpg')} 
        />
        <FormatButton 
          format="pdf" 
          label="PDF" 
          description="Print ready" 
          onClick={() => onDownload('pdf')} 
        />
      </div>
    </div>
  );
};

interface FormatButtonProps {
  format: DownloadFormat;
  label: string;
  description: string;
  onClick: () => void;
}

const FormatButton = ({ 
  format, 
  label, 
  description, 
  onClick 
}: FormatButtonProps) => {
  return (
    <Button
      variant="outline"
      className="h-auto flex flex-col items-center justify-center py-4 hover:bg-muted/50"
      onClick={onClick}
    >
      <span className="text-lg font-semibold">{label}</span>
      <span className="text-xs text-muted-foreground mt-1">{description}</span>
    </Button>
  );
};

export default DownloadOptions;
