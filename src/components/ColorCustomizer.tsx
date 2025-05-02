
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { QRColor, ColorType, GradientType, GradientDirection, ColorStop } from '@/utils/qrTypes';

interface ColorCustomizerProps {
  foreground: QRColor;
  background: QRColor;
  eyeColor: QRColor;
  onForegroundChange: (color: QRColor) => void;
  onBackgroundChange: (color: QRColor) => void;
  onEyeColorChange: (color: QRColor) => void;
}

const ColorCustomizer = ({
  foreground,
  background,
  eyeColor,
  onForegroundChange,
  onBackgroundChange,
  onEyeColorChange
}: ColorCustomizerProps) => {
  const [activeTab, setActiveTab] = useState<'foreground' | 'background' | 'eyes'>('foreground');

  const getActiveColor = (): QRColor => {
    switch (activeTab) {
      case 'foreground': return foreground;
      case 'background': return background;
      case 'eyes': return eyeColor;
      default: return foreground;
    }
  };

  const updateColor = (updates: Partial<QRColor>) => {
    const updatedColor = { ...getActiveColor(), ...updates };
    
    switch (activeTab) {
      case 'foreground':
        onForegroundChange(updatedColor);
        break;
      case 'background':
        onBackgroundChange(updatedColor);
        break;
      case 'eyes':
        onEyeColorChange(updatedColor);
        break;
    }
  };

  const updateGradientStop = (index: number, updates: Partial<ColorStop>) => {
    const activeColor = getActiveColor();
    if (!activeColor.gradient) return;
    
    const updatedStops = [...activeColor.gradient.stops];
    updatedStops[index] = { ...updatedStops[index], ...updates };
    
    updateColor({ 
      gradient: { 
        ...activeColor.gradient, 
        stops: updatedStops 
      } 
    });
  };

  const addGradientStop = () => {
    const activeColor = getActiveColor();
    if (!activeColor.gradient) return;
    
    const newStop: ColorStop = { 
      color: '#ffffff', 
      position: 50 
    };
    
    updateColor({ 
      gradient: { 
        ...activeColor.gradient, 
        stops: [...activeColor.gradient.stops, newStop] 
      } 
    });
  };

  const removeGradientStop = (index: number) => {
    const activeColor = getActiveColor();
    if (!activeColor.gradient || activeColor.gradient.stops.length <= 2) return;
    
    const updatedStops = activeColor.gradient.stops.filter((_, i) => i !== index);
    
    updateColor({ 
      gradient: { 
        ...activeColor.gradient, 
        stops: updatedStops 
      } 
    });
  };

  const handleColorTypeChange = (type: ColorType) => {
    if (type === 'solid') {
      updateColor({ 
        type, 
        solid: getActiveColor().solid || '#000000' 
      });
    } else {
      updateColor({
        type,
        gradient: getActiveColor().gradient || {
          type: 'linear',
          direction: 'to-r',
          stops: [
            { color: '#8B5CF6', position: 0 },
            { color: '#6E59A5', position: 100 }
          ]
        }
      });
    }
  };

  const handleGradientTypeChange = (type: GradientType) => {
    const activeColor = getActiveColor();
    if (!activeColor.gradient) return;
    
    updateColor({ 
      gradient: { 
        ...activeColor.gradient, 
        type 
      } 
    });
  };

  const handleGradientDirectionChange = (direction: GradientDirection) => {
    const activeColor = getActiveColor();
    if (!activeColor.gradient) return;
    
    updateColor({ 
      gradient: { 
        ...activeColor.gradient, 
        direction 
      } 
    });
  };

  const activeColor = getActiveColor();
  
  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="foreground">Dots</TabsTrigger>
          <TabsTrigger value="background">Background</TabsTrigger>
          <TabsTrigger value="eyes">Eyes</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        <div>
          <Label>Color Type</Label>
          <RadioGroup 
            className="grid grid-cols-2 gap-4 mt-2" 
            value={activeColor.type}
            onValueChange={(value) => handleColorTypeChange(value as ColorType)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="solid" id="solid" />
              <Label htmlFor="solid">Solid Color</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gradient" id="gradient" />
              <Label htmlFor="gradient">Gradient</Label>
            </div>
          </RadioGroup>
        </div>

        {activeColor.type === 'solid' ? (
          <div>
            <Label htmlFor="color-picker">Choose Color</Label>
            <div className="flex gap-2 items-center mt-1">
              <div 
                className="w-10 h-10 rounded-md border" 
                style={{ backgroundColor: activeColor.solid }}
              />
              <Input
                id="color-picker"
                type="color"
                value={activeColor.solid || '#000000'}
                className="w-full h-10"
                onChange={(e) => updateColor({ solid: e.target.value })}
              />
            </div>
          </div>
        ) : activeColor.gradient ? (
          <div className="space-y-4">
            <div>
              <Label>Gradient Type</Label>
              <RadioGroup 
                className="grid grid-cols-2 gap-4 mt-2" 
                value={activeColor.gradient.type}
                onValueChange={(value) => handleGradientTypeChange(value as GradientType)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="linear" id="linear" />
                  <Label htmlFor="linear">Linear</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="radial" id="radial" />
                  <Label htmlFor="radial">Radial</Label>
                </div>
              </RadioGroup>
            </div>

            {activeColor.gradient.type === 'linear' && (
              <div>
                <Label>Direction</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {(['to-t', 'to-tr', 'to-r', 'to-br', 'to-b', 'to-bl', 'to-l', 'to-tl'] as GradientDirection[]).map((dir) => (
                    <button
                      key={dir}
                      type="button"
                      className={`p-2 border rounded-md ${activeColor.gradient?.direction === dir ? 'border-primary bg-primary/10' : 'border-border'}`}
                      onClick={() => handleGradientDirectionChange(dir)}
                    >
                      <div className="w-6 h-6 flex items-center justify-center">
                        <span className={`transform ${
                          dir === 'to-t' ? 'rotate-0' :
                          dir === 'to-tr' ? 'rotate-45' :
                          dir === 'to-r' ? 'rotate-90' :
                          dir === 'to-br' ? 'rotate-135' :
                          dir === 'to-b' ? 'rotate-180' :
                          dir === 'to-bl' ? 'rotate-225' :
                          dir === 'to-l' ? 'rotate-270' :
                          'rotate-315'
                        }`}>→</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Color Stops</Label>
                {activeColor.gradient.stops.length < 5 && (
                  <button
                    type="button"
                    className="text-xs font-medium text-primary"
                    onClick={addGradientStop}
                  >
                    Add Stop
                  </button>
                )}
              </div>
              
              <div className="space-y-3">
                {activeColor.gradient.stops.map((stop, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <div 
                      className="w-6 h-6 rounded-md border" 
                      style={{ backgroundColor: stop.color }}
                    />
                    <Input
                      type="color"
                      className="w-1/3 h-8"
                      value={stop.color}
                      onChange={(e) => updateGradientStop(index, { color: e.target.value })}
                    />
                    <div className="flex-1">
                      <Slider
                        value={[stop.position]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => updateGradientStop(index, { position: value[0] })}
                      />
                    </div>
                    <span className="text-xs w-8">{stop.position}%</span>
                    
                    {activeColor.gradient.stops.length > 2 && (
                      <button
                        type="button"
                        className="text-destructive hover:text-destructive/80"
                        onClick={() => removeGradientStop(index)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        <div>
          <Label>Opacity: {activeColor.opacity}%</Label>
          <Slider
            value={[activeColor.opacity]}
            min={0}
            max={100}
            step={1}
            className="mt-2"
            onValueChange={(value) => updateColor({ opacity: value[0] })}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorCustomizer;
