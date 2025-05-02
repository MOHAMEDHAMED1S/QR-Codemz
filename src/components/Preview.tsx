
import { RefObject } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface PreviewProps {
  qrRef: RefObject<HTMLDivElement>;
}

const Preview = ({ qrRef }: PreviewProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-6">QR Code Preview</h2>
      
      <Card className="bg-muted/30 shadow-md w-full max-w-md mx-auto p-2">
        <CardContent className="flex items-center justify-center p-8">
          <div 
            ref={qrRef} 
            className="qr-code-container flex items-center justify-center w-full max-w-xs aspect-square"
          />
        </CardContent>
      </Card>
      
      <p className="text-sm text-muted-foreground mt-4 text-center">
        Live preview. Changes are applied instantly.
      </p>
    </div>
  );
};

export default Preview;
