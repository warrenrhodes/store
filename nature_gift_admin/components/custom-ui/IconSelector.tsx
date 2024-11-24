import { icons } from "lucide-react";
import { useState } from "react";
import * as LucideIcons from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface IconSelectorProps {
  selectedIcon?: string;
  onSelectIcon: (icon: string) => void;
}

const IconSelector = ({ selectedIcon, onSelectIcon }: IconSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState<string>(selectedIcon || "");

  const iconNames = Object.keys(LucideIcons).filter(
    (name) => name !== "createLucideIcon" && name !== "default"
  );

  const filteredIcons = iconNames.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Select an Icon</CardTitle>
        <Input
          type="search"
          placeholder="Search icons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          <div className="flex gap-2 flex-wrap">
            {filteredIcons.length > 0 &&
              filteredIcons.map((iconName) => {
                const LucideIcon = icons[iconName as keyof typeof icons];
                if (!LucideIcon) return null;
                return (
                  <button
                    key={iconName}
                    onClick={() => {
                      setSearchTerm(iconName);
                      onSelectIcon(iconName);
                    }}
                    className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                      selectedIcon === iconName
                        ? "bg-blue-100 dark:bg-blue-900"
                        : ""
                    }`}
                    title={iconName}
                  >
                    <LucideIcon className="w-6 h-6" />
                  </button>
                );
              })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export { IconSelector };
