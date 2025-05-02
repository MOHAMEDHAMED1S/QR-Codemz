
export type ContentType = 'url' | 'text' | 'vcard' | 'email' | 'wifi' | 'geo' | 'calendar';

export type DotShape = 'square' | 'circle' | 'diamond' | 'star' | 'rounded';

export type EyeShape = 'square' | 'circle' | 'rounded' | 'leaf' | 'shield';

export type DownloadFormat = 'png' | 'svg' | 'jpg' | 'pdf';

export type ColorType = 'solid' | 'gradient';

export type GradientType = 'linear' | 'radial';

export type GradientDirection = 
  'to-r' | 'to-l' | 'to-t' | 'to-b' | 
  'to-tr' | 'to-tl' | 'to-br' | 'to-bl';

export interface ColorStop {
  color: string;
  position: number; // 0-100
}

export interface QRColor {
  type: ColorType;
  solid?: string;
  gradient?: {
    type: GradientType;
    direction: GradientDirection;
    stops: ColorStop[];
  };
  opacity: number; // 0-100
}

export interface QRCodeOptions {
  content: string;
  contentType: ContentType;
  foreground: QRColor;
  background: QRColor;
  dotShape: DotShape;
  eyeShape: EyeShape;
  eyeColor: QRColor;
  logo?: string;
  logoSize: number; // 0-100 percentage of QR code
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
}

export interface VCardData {
  firstName: string;
  lastName: string;
  organization: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  note: string;
}

export interface WiFiData {
  ssid: string;
  password: string;
  encryption: 'WEP' | 'WPA' | 'WPA2' | 'nopass';
  hidden: boolean;
}

export interface GeoData {
  latitude: number;
  longitude: number;
  altitude?: number;
}

export interface CalendarData {
  title: string;
  description: string;
  location: string;
  startDate: string; // ISO string format
  endDate: string; // ISO string format
  allDay: boolean;
}

export interface EmailData {
  address: string;
  subject: string;
  body: string;
}
