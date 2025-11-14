import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Accessibility,
  Eye,
  Moon,
  Type,
  Vibrate,
  Save,
  RotateCcw,
} from "lucide-react";

type DisabilityType = "none" | "deaf" | "blind" | "deafblind";
type FontSize = "small" | "medium" | "large" | "extra-large";

interface Settings {
  disability: DisabilityType;
  fontSize: FontSize;
  darkMode: boolean;
  vibrations: boolean;
}

const IndividualSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    disability: "none",
    fontSize: "medium",
    darkMode: false,
    vibrations: true,
  });

  const [hasChanges, setHasChanges] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("studentSettings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
        applySettings(parsed);
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    }
  }, []);

  // Apply settings to the document
  const applySettings = (newSettings: Settings) => {
    // Apply dark mode
    if (newSettings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Apply font size
    const fontSizeMap = {
      small: "14px",
      medium: "16px",
      large: "18px",
      "extra-large": "20px",
    };
    document.documentElement.style.fontSize = fontSizeMap[newSettings.fontSize];
  };

  // Handle setting changes
  const handleSettingChange = (key: keyof Settings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    setHasChanges(true);
  };

  // Save settings
  const handleSave = () => {
    localStorage.setItem("studentSettings", JSON.stringify(settings));
    applySettings(settings);
    setHasChanges(false);

    // Optional: Show success message
    if (settings.vibrations && "vibrate" in navigator) {
      navigator.vibrate(200);
    }
  };

  // Reset to defaults
  const handleReset = () => {
    const defaultSettings: Settings = {
      disability: "none",
      fontSize: "medium",
      darkMode: false,
      vibrations: true,
    };
    setSettings(defaultSettings);
    setHasChanges(true);
  };

  return (
    <div className="min-h-dvh bg-bgColor px-4 py-6 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-textColor mb-2">
            Settings
          </h1>
          <p className="text-secondarytext">
            Customize your learning experience
          </p>
        </div>

        {/* Accessibility Settings Card */}
        <Card className="p-6 mb-6 border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Accessibility className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-textColor">
                Accessibility
              </h2>
              <p className="text-sm text-secondarytext">
                Configure accessibility options
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Disability Type Selection */}
            <div className="space-y-2">
              <Label
                htmlFor="disability"
                className="text-textColor flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Disability Type
              </Label>
              <Select
                value={settings.disability}
                onValueChange={(value: DisabilityType) =>
                  handleSettingChange("disability", value)
                }
              >
                <SelectTrigger id="disability" className="w-full">
                  <SelectValue placeholder="Select disability type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="deaf">Deaf</SelectItem>
                  <SelectItem value="blind">Blind</SelectItem>
                  <SelectItem value="deafblind">Deaf-Blind</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-secondarytext">
                Select your accessibility needs for a customized experience
              </p>
            </div>

            {/* Font Size Selection */}
            <div className="space-y-2">
              <Label
                htmlFor="fontSize"
                className="text-textColor flex items-center gap-2"
              >
                <Type className="w-4 h-4" />
                Font Size
              </Label>
              <Select
                value={settings.fontSize}
                onValueChange={(value: FontSize) =>
                  handleSettingChange("fontSize", value)
                }
              >
                <SelectTrigger id="fontSize" className="w-full">
                  <SelectValue placeholder="Select font size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium (Default)</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="extra-large">Extra Large</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-secondarytext">
                Adjust text size for better readability
              </p>
            </div>
          </div>
        </Card>

        {/* Display & Interaction Settings Card */}
        <Card className="p-6 mb-6 border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Moon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-textColor">
                Display & Interaction
              </h2>
              <p className="text-sm text-secondarytext">
                Customize visual and haptic feedback
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-border">
              <div className="flex items-start gap-3 flex-1">
                <Moon className="w-5 h-5 text-secondary-foreground mt-0.5" />
                <div className="flex-1">
                  <Label
                    htmlFor="darkMode"
                    className="text-textColor cursor-pointer"
                  >
                    Dark Mode
                  </Label>
                  <p className="text-sm text-secondary-foreground mt-1">
                    Reduce eye strain with a darker color scheme
                  </p>
                </div>
              </div>
              <Switch
                id="darkMode"
                checked={settings.darkMode}
                onCheckedChange={(checked: boolean) =>
                  handleSettingChange("darkMode", checked)
                }
              />
            </div>

            {/* Vibrations Toggle */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-border">
              <div className="flex items-start gap-3 flex-1">
                <Vibrate className="w-5 h-5 text-textColor mt-0.5" />
                <div className="flex-1">
                  <Label
                    htmlFor="vibrations"
                    className="text-textColor cursor-pointer"
                  >
                    Vibrations
                  </Label>
                  <p className="text-sm text-secondarytext mt-1">
                    Enable haptic feedback for interactions
                  </p>
                </div>
              </div>
              <Switch
                id="vibrations"
                checked={settings.vibrations}
                onCheckedChange={(checked: boolean) =>
                  handleSettingChange("vibrations", checked)
                }
              />
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className="flex-1 sm:flex-none"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex-1 sm:flex-none"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
        </div>

        {hasChanges && (
          <p className="text-sm text-amber-600 dark:text-amber-400 mt-4 text-center">
            You have unsaved changes
          </p>
        )}
      </div>
    </div>
  );
};

export default IndividualSettings;
