import { LucideProps, icons } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import React, { useState } from "react";
import * as LucideIcons from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface IconSelectorProps {
  selectedIcon?: string;
  onSelectIcon: (icon: string) => void;
  className?: string;
}

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

const IconSelector = ({
  selectedIcon,
  onSelectIcon,
  className,
}: IconSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const iconNames = Object.keys(LucideIcons).filter(
    (name) => name !== "createLucideIcon" && name !== "default"
  );

  // Filter icons based on search term
  const filteredIcons =
    searchTerm.length === 0
      ? iconNames
      : iconNames.filter((name) =>
          name.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Select an Icon</CardTitle>
        <Input
          type="search"
          placeholder="Search icons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
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
                    onClick={() => onSelectIcon(iconName)}
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

// IconDisplay.tsx - Component to display selected icon
const IconDisplay = ({ iconName }: { iconName: string }) => {
  const IconComponent = LucideIcons[
    iconName as keyof typeof LucideIcons
  ] as React.FC<{ className?: string }>;
  return IconComponent ? <IconComponent className="w-6 h-6" /> : null;
};

export { IconSelector, IconDisplay };
