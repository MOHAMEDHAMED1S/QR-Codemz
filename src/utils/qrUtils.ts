
import { 
  QRCodeOptions, ContentType, VCardData, WiFiData, GeoData, 
  CalendarData, EmailData, DownloadFormat 
} from './qrTypes';
import QRCodeStyling from 'qr-code-styling';

export const DEFAULT_QR_OPTIONS: QRCodeOptions = {
  content: 'https://mohamed.codemz.com/',
  contentType: 'url',
  foreground: {
    type: 'solid',
    solid: '#8B5CF6',
    opacity: 100
  },
  background: {
    type: 'solid',
    solid: '#FFFFFF',
    opacity: 100
  },
  dotShape: 'rounded',
  eyeShape: 'square',
  eyeColor: {
    type: 'solid',
    solid: '#8B5CF6',
    opacity: 100
  },
  logoSize: 20,
  errorCorrectionLevel: 'M'
};

export const formatContent = (
  contentType: ContentType, 
  data: string | VCardData | WiFiData | GeoData | CalendarData | EmailData
): string => {
  switch (contentType) {
    case 'url':
      return data as string;
    
    case 'text':
      return data as string;
    
    case 'vcard': {
      const vcard = data as VCardData;
      return `BEGIN:VCARD
VERSION:3.0
N:${vcard.lastName};${vcard.firstName};;;
FN:${vcard.firstName} ${vcard.lastName}
ORG:${vcard.organization}
TITLE:${vcard.title}
EMAIL:${vcard.email}
TEL:${vcard.phone}
URL:${vcard.website}
ADR:;;${vcard.address};;;
NOTE:${vcard.note}
END:VCARD`;
    }
    
    case 'email': {
      const email = data as EmailData;
      return `mailto:${email.address}?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`;
    }
    
    case 'wifi': {
      const wifi = data as WiFiData;
      return `WIFI:T:${wifi.encryption};S:${wifi.ssid};P:${wifi.password};H:${wifi.hidden ? 'true' : 'false'};;`;
    }
    
    case 'geo': {
      const geo = data as GeoData;
      return `geo:${geo.latitude},${geo.longitude},${geo.altitude || 0}`;
    }
    
    case 'calendar': {
      const cal = data as CalendarData;
      return `BEGIN:VEVENT
SUMMARY:${cal.title}
DESCRIPTION:${cal.description}
LOCATION:${cal.location}
DTSTART:${formatISOToCalendarDate(cal.startDate)}
DTEND:${formatISOToCalendarDate(cal.endDate)}
END:VEVENT`;
    }
    
    default:
      return data as string;
  }
};

const formatISOToCalendarDate = (isoString: string): string => {
  // Format: 20230101T120000Z
  return isoString
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '')
    .replace(' ', 'T') + 'Z';
};

export const createQRCode = (options: QRCodeOptions): QRCodeStyling => {
  const { 
    content, dotShape, eyeShape, foreground, background, 
    eyeColor, logo, logoSize, errorCorrectionLevel 
  } = options;
  
  // Determine dot type
  let dotType: any = 'square';
  switch (dotShape) {
    case 'circle': dotType = 'dots'; break;
    case 'rounded': dotType = 'rounded'; break;
    case 'diamond': dotType = 'classy'; break;
    case 'star': dotType = 'classy-rounded'; break;
    default: dotType = 'square';
  }
  
  // Determine eye style
  let cornerSquareType: any = 'square';
  let cornerDotType: any = 'square';
  
  switch (eyeShape) {
    case 'circle': 
      cornerSquareType = 'circle';
      cornerDotType = 'circle';
      break;
    case 'rounded': 
      cornerSquareType = 'rounded';
      cornerDotType = 'rounded';
      break;
    case 'leaf': 
      cornerSquareType = 'leaf';
      cornerDotType = 'dot';
      break;
    case 'shield': 
      cornerSquareType = 'extra-rounded';
      cornerDotType = 'square';
      break;
    default: 
      cornerSquareType = 'square';
      cornerDotType = 'square';
  }
  
  // Convert colors
  const getFgColor = () => {
    if (foreground.type === 'solid') {
      return foreground.solid;
    } else if (foreground.gradient) {
      // For simplicity, QR library doesn't support gradients directly
      // Return the first color in the gradient
      return foreground.gradient.stops[0]?.color || '#000000';
    }
    return '#000000';
  };
  
  const getBgColor = () => {
    if (background.type === 'solid') {
      return background.solid;
    } else if (background.gradient) {
      return background.gradient.stops[0]?.color || '#FFFFFF';
    }
    return '#FFFFFF';
  };

  const getEyeColor = () => {
    if (eyeColor.type === 'solid') {
      return eyeColor.solid;
    } else if (eyeColor.gradient) {
      return eyeColor.gradient.stops[0]?.color || getFgColor();
    }
    return getFgColor();
  };
  
  return new QRCodeStyling({
    width: 300,
    height: 300,
    data: content,
    dotsOptions: {
      color: getFgColor(),
      type: dotType,
    },
    backgroundOptions: {
      color: getBgColor(),
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 5,
      imageSize: logoSize / 100,
    },
    cornersSquareOptions: {
      color: getEyeColor(),
      type: cornerSquareType,
    },
    cornersDotOptions: {
      color: getEyeColor(),
      type: cornerDotType,
    },
    qrOptions: {
      errorCorrectionLevel,
    },
    ...(logo && { image: logo }),
  });
};

export const downloadQRCode = async (
  qrCode: QRCodeStyling,
  format: DownloadFormat,
  fileName: string = 'qrcode'
): Promise<void> => {
  if (format === 'pdf') {
    // For PDF format, download as SVG first
    await qrCode.download({
      name: fileName,
      extension: 'svg'
    });
  } else {
    await qrCode.download({
      name: fileName,
      extension: format === 'jpg' ? 'jpeg' : format
    });
  }
};

export const getContentTypeLabel = (type: ContentType): string => {
  switch (type) {
    case 'url': return 'Website URL';
    case 'text': return 'Plain Text';
    case 'vcard': return 'Contact Card';
    case 'email': return 'Email Address';
    case 'wifi': return 'WiFi Network';
    case 'geo': return 'Location';
    case 'calendar': return 'Calendar Event';
    default: return 'Text';
  }
};
