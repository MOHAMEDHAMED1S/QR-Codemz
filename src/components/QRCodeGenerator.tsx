
import { useEffect, useRef, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { QRCodeOptions, DownloadFormat } from '@/utils/qrTypes';
import { DEFAULT_QR_OPTIONS, createQRCode } from '@/utils/qrUtils';
import QRCodeStyling from 'qr-code-styling';

import Preview from './Preview';
import ContentTypeSelector from './ContentTypeSelector';
import ColorCustomizer from './ColorCustomizer';
import ShapeCustomizer from './ShapeCustomizer';
import LogoUploader from './LogoUploader';
import DownloadOptions from './DownloadOptions';

// Storage key for saving user preferences
const STORAGE_KEY = 'qr_codemz_preferences';

// This component is already static and has no external dependencies
const QRCodeGenerator = () => {
  const [qrOptions, setQrOptions] = useState<QRCodeOptions>(DEFAULT_QR_OPTIONS);
  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);

  // Load saved preferences when component mounts
  useEffect(() => {
    try {
      const savedPreferences = localStorage.getItem(STORAGE_KEY);
      if (savedPreferences) {
        const parsedPreferences = JSON.parse(savedPreferences) as QRCodeOptions;
        setQrOptions(parsedPreferences);
        toast.success("Your saved preferences have been loaded");
      }
    } catch (error) {
      console.error('Failed to load saved preferences:', error);
      // Don't show error toast to users, silently fallback to defaults
    }
  }, []);

  // Save preferences to local storage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(qrOptions));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  }, [qrOptions]);

  useEffect(() => {
    try {
      const newQrCode = createQRCode(qrOptions);
      setQrCode(newQrCode);
      
      // Update QR code in the preview
      if (qrRef.current) {
        qrRef.current.innerHTML = '';
        newQrCode.append(qrRef.current);
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast.error('Failed to generate QR code. Please check your settings.');
    }
  }, [qrOptions]);

  const handleContentChange = (content: string) => {
    setQrOptions(prev => ({ ...prev, content }));
  };

  const handleContentTypeChange = (contentType: QRCodeOptions['contentType']) => {
    setQrOptions(prev => ({ ...prev, contentType }));
  };

  const handleShapeChange = (type: 'dotShape' | 'eyeShape', value: string) => {
    setQrOptions(prev => ({ ...prev, [type]: value }));
    console.log(`Shape changed: ${type} = ${value}`);
  };

  const handleDownload = async (format: DownloadFormat) => {
    if (!qrCode) return;

    try {
      // Special handling for PDF format
      if (format === 'pdf') {
        // For PDF, we'll download as SVG first (as a workaround)
        await qrCode.download({
          name: 'qrcode',
          extension: 'svg'
        });
        toast.success(`QR code downloaded as SVG. To convert to PDF, please use an online converter.`);
      } else {
        // For other formats, proceed normally
        await qrCode.download({
          name: 'qrcode',
          extension: format === 'jpg' ? 'jpeg' : format
        });
        toast.success(`QR code downloaded as ${format.toUpperCase()}`);
      }
    } catch (error) {
      console.error('Error downloading QR code:', error);
      toast.error('Failed to download QR code');
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      <div className="w-full md:w-1/3 lg:w-1/4">
        <div className="bg-card rounded-lg shadow-lg p-4 h-full overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Customize QR Code</h2>
          
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="shape">Shape</TabsTrigger>
              <TabsTrigger value="logo">Logo</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="mt-2">
              <ContentTypeSelector 
                value={qrOptions.content}
                type={qrOptions.contentType}
                onValueChange={handleContentChange}
                onTypeChange={handleContentTypeChange}
              />
            </TabsContent>
            
            <TabsContent value="colors" className="mt-2">
              <ColorCustomizer 
                foreground={qrOptions.foreground}
                background={qrOptions.background}
                eyeColor={qrOptions.eyeColor}
                onForegroundChange={(foreground) => 
                  setQrOptions(prev => ({ ...prev, foreground }))}
                onBackgroundChange={(background) => 
                  setQrOptions(prev => ({ ...prev, background }))}
                onEyeColorChange={(eyeColor) => 
                  setQrOptions(prev => ({ ...prev, eyeColor }))}
              />
            </TabsContent>
            
            <TabsContent value="shape" className="mt-2">
              <ShapeCustomizer 
                dotShape={qrOptions.dotShape}
                eyeShape={qrOptions.eyeShape}
                onDotShapeChange={(dotShape) => 
                  handleShapeChange('dotShape', dotShape)}
                onEyeShapeChange={(eyeShape) => 
                  handleShapeChange('eyeShape', eyeShape)}
              />
            </TabsContent>
            
            <TabsContent value="logo" className="mt-2">
              <LogoUploader 
                logo={qrOptions.logo}
                logoSize={qrOptions.logoSize}
                errorCorrectionLevel={qrOptions.errorCorrectionLevel}
                onLogoChange={(logo) => 
                  setQrOptions(prev => ({ ...prev, logo }))}
                onLogoSizeChange={(logoSize) => 
                  setQrOptions(prev => ({ ...prev, logoSize }))}
                onErrorCorrectionLevelChange={(errorCorrectionLevel) => 
                  setQrOptions(prev => ({ ...prev, errorCorrectionLevel }))}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <div className="w-full md:w-2/3 lg:w-3/4">
        <div className="bg-card rounded-lg shadow-lg p-6 h-full flex flex-col">
          <Preview qrRef={qrRef} />
          
          <div className="mt-6">
            <DownloadOptions onDownload={handleDownload} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
