
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ContentType, EmailData, VCardData, WiFiData, GeoData, CalendarData } from '@/utils/qrTypes';
import { getContentTypeLabel, formatContent } from '@/utils/qrUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

interface ContentTypeSelectorProps {
  value: string;
  type: ContentType;
  onValueChange: (value: string) => void;
  onTypeChange: (type: ContentType) => void;
}

const ContentTypeSelector = ({
  value,
  type,
  onValueChange,
  onTypeChange
}: ContentTypeSelectorProps) => {
  // State for complex content types
  const [vcard, setVcard] = useState<VCardData>({
    firstName: '',
    lastName: '',
    organization: '',
    title: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    note: ''
  });

  const [email, setEmail] = useState<EmailData>({
    address: '',
    subject: '',
    body: ''
  });

  const [wifi, setWifi] = useState<WiFiData>({
    ssid: '',
    password: '',
    encryption: 'WPA2',
    hidden: false
  });

  const [geo, setGeo] = useState<GeoData>({
    latitude: 0,
    longitude: 0,
    altitude: 0
  });

  const [calendar, setCalendar] = useState<CalendarData>({
    title: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    allDay: false
  });

  // Update content when changing complex content types
  const updateComplexContent = (contentType: ContentType) => {
    switch (contentType) {
      case 'vcard':
        onValueChange(formatContent('vcard', vcard));
        break;
      case 'email':
        onValueChange(formatContent('email', email));
        break;
      case 'wifi':
        onValueChange(formatContent('wifi', wifi));
        break;
      case 'geo':
        onValueChange(formatContent('geo', geo));
        break;
      case 'calendar':
        onValueChange(formatContent('calendar', calendar));
        break;
      default:
        break;
    }
  };

  const handleTypeChange = (newType: ContentType) => {
    onTypeChange(newType);
    updateComplexContent(newType);
  };

  // Update vCard when fields change
  const updateVCard = (field: keyof VCardData, value: string) => {
    const updatedVCard = { ...vcard, [field]: value };
    setVcard(updatedVCard);
    onValueChange(formatContent('vcard', updatedVCard));
  };

  // Update email when fields change
  const updateEmail = (field: keyof EmailData, value: string) => {
    const updatedEmail = { ...email, [field]: value };
    setEmail(updatedEmail);
    onValueChange(formatContent('email', updatedEmail));
  };

  // Update WiFi when fields change
  const updateWifi = (field: keyof WiFiData, value: any) => {
    const updatedWifi = { ...wifi, [field]: value };
    setWifi(updatedWifi);
    onValueChange(formatContent('wifi', updatedWifi));
  };

  // Update Geo when fields change
  const updateGeo = (field: keyof GeoData, value: number) => {
    const updatedGeo = { ...geo, [field]: value };
    setGeo(updatedGeo);
    onValueChange(formatContent('geo', updatedGeo));
  };

  // Update Calendar when fields change
  const updateCalendar = (field: keyof CalendarData, value: any) => {
    const updatedCalendar = { ...calendar, [field]: value };
    setCalendar(updatedCalendar);
    onValueChange(formatContent('calendar', updatedCalendar));
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Content Type</Label>
        <Select value={type} onValueChange={(value) => handleTypeChange(value as ContentType)}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select content type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="url">{getContentTypeLabel('url')}</SelectItem>
            <SelectItem value="text">{getContentTypeLabel('text')}</SelectItem>
            <SelectItem value="vcard">{getContentTypeLabel('vcard')}</SelectItem>
            <SelectItem value="email">{getContentTypeLabel('email')}</SelectItem>
            <SelectItem value="wifi">{getContentTypeLabel('wifi')}</SelectItem>
            <SelectItem value="geo">{getContentTypeLabel('geo')}</SelectItem>
            <SelectItem value="calendar">{getContentTypeLabel('calendar')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {type === 'url' && (
        <div>
          <Label htmlFor="url-input">Website URL</Label>
          <Input
            id="url-input"
            className="mt-1"
            type="url"
            placeholder="https://mohamed.codemz.com/"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
          />
        </div>
      )}

      {type === 'text' && (
        <div>
          <Label htmlFor="text-input">Text Content</Label>
          <Textarea
            id="text-input"
            className="mt-1"
            placeholder="Enter your text here..."
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
          />
        </div>
      )}

      {type === 'vcard' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                placeholder="Mohamed"
                value={vcard.firstName}
                onChange={(e) => updateVCard('firstName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                placeholder="Hamed"
                value={vcard.lastName}
                onChange={(e) => updateVCard('lastName', e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="organization">Organization</Label>
            <Input
              id="organization"
              placeholder="Company Inc."
              value={vcard.organization}
              onChange={(e) => updateVCard('organization', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Mohamed@example.com"
              value={vcard.email}
              onChange={(e) => updateVCard('email', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="+1234567890"
              value={vcard.phone}
              onChange={(e) => updateVCard('phone', e.target.value)}
            />
          </div>
        </div>
      )}

      {type === 'email' && (
        <div className="space-y-3">
          <div>
            <Label htmlFor="email-address">Email Address</Label>
            <Input
              id="email-address"
              type="email"
              placeholder="name@example.com"
              value={email.address}
              onChange={(e) => updateEmail('address', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="email-subject">Subject</Label>
            <Input
              id="email-subject"
              placeholder="Email Subject"
              value={email.subject}
              onChange={(e) => updateEmail('subject', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="email-body">Message</Label>
            <Textarea
              id="email-body"
              placeholder="Your email message..."
              value={email.body}
              onChange={(e) => updateEmail('body', e.target.value)}
            />
          </div>
        </div>
      )}

      {type === 'wifi' && (
        <div className="space-y-3">
          <div>
            <Label htmlFor="wifi-ssid">Network Name (SSID)</Label>
            <Input
              id="wifi-ssid"
              placeholder="WiFi Network Name"
              value={wifi.ssid}
              onChange={(e) => updateWifi('ssid', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="wifi-password">Password</Label>
            <Input
              id="wifi-password"
              type="password"
              placeholder="Network Password"
              value={wifi.password}
              onChange={(e) => updateWifi('password', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="wifi-encryption">Encryption Type</Label>
            <Select 
              value={wifi.encryption} 
              onValueChange={(value) => updateWifi('encryption', value as 'WEP' | 'WPA' | 'WPA2' | 'nopass')}
            >
              <SelectTrigger id="wifi-encryption">
                <SelectValue placeholder="Select encryption" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nopass">None</SelectItem>
                <SelectItem value="WEP">WEP</SelectItem>
                <SelectItem value="WPA">WPA/WPA2</SelectItem>
                <SelectItem value="WPA2">WPA2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="hidden-network"
              checked={wifi.hidden}
              onCheckedChange={(checked) => updateWifi('hidden', checked)}
            />
            <Label htmlFor="hidden-network">Hidden Network</Label>
          </div>
        </div>
      )}

      {type === 'geo' && (
        <div className="space-y-3">
          <div>
            <Label htmlFor="geo-lat">Latitude</Label>
            <Input
              id="geo-lat"
              type="number"
              step="0.000001"
              placeholder="0.000000"
              value={geo.latitude}
              onChange={(e) => updateGeo('latitude', parseFloat(e.target.value) || 0)}
            />
          </div>
          
          <div>
            <Label htmlFor="geo-lng">Longitude</Label>
            <Input
              id="geo-lng"
              type="number"
              step="0.000001"
              placeholder="0.000000"
              value={geo.longitude}
              onChange={(e) => updateGeo('longitude', parseFloat(e.target.value) || 0)}
            />
          </div>
          
          <div>
            <Label htmlFor="geo-alt">Altitude (optional)</Label>
            <Input
              id="geo-alt"
              type="number"
              placeholder="0"
              value={geo.altitude || 0}
              onChange={(e) => updateGeo('altitude', parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
      )}

      {type === 'calendar' && (
        <div className="space-y-3">
          <div>
            <Label htmlFor="event-title">Event Title</Label>
            <Input
              id="event-title"
              placeholder="Meeting Title"
              value={calendar.title}
              onChange={(e) => updateCalendar('title', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="event-location">Location</Label>
            <Input
              id="event-location"
              placeholder="123 Main St, City"
              value={calendar.location}
              onChange={(e) => updateCalendar('location', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="event-description">Description</Label>
            <Textarea
              id="event-description"
              placeholder="Event details..."
              value={calendar.description}
              onChange={(e) => updateCalendar('description', e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="event-start">Start Date/Time</Label>
              <Input
                id="event-start"
                type="datetime-local"
                value={calendar.startDate}
                onChange={(e) => updateCalendar('startDate', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="event-end">End Date/Time</Label>
              <Input
                id="event-end"
                type="datetime-local"
                value={calendar.endDate}
                onChange={(e) => updateCalendar('endDate', e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="all-day"
              checked={calendar.allDay}
              onCheckedChange={(checked) => updateCalendar('allDay', checked)}
            />
            <Label htmlFor="all-day">All Day Event</Label>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentTypeSelector;
