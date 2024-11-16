// IconSelector.tsx
import React, { useState } from "react";
import * as LucideIcons from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertCircle,
  Archive,
  AreaChart,
  ArrowDown,
  ArrowUp,
  Bell,
  BookOpen,
  Calendar,
  Camera,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Copy,
  CreditCard,
  Download,
  Edit,
  Eye,
  File,
  FileText,
  Filter,
  Folder,
  FolderOpen,
  Grid,
  Heart,
  Home,
  Image,
  Info,
  Link,
  List,
  Lock,
  Mail,
  Map,
  Menu,
  MessageCircle,
  Moon,
  MoreHorizontal,
  MoreVertical,
  Package,
  Pencil,
  Phone,
  Plus,
  PlusCircle,
  Radio,
  RefreshCw,
  Save,
  Search,
  Send,
  Settings,
  Share,
  ShoppingCart,
  Slash,
  Star,
  Sun,
  Tag,
  Trash,
  Trophy,
  Upload,
  User,
  Users,
  Video,
  Volume,
  X,
  Zap,
  // Add more icons as needed
} from "lucide-react";

// Define the icon mapping
const ICONS = {
  AlertCircle,
  Archive,
  AreaChart,
  ArrowDown,
  ArrowUp,
  Bell,
  BookOpen,
  Calendar,
  Camera,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Copy,
  CreditCard,
  Download,
  Edit,
  Eye,
  File,
  FileText,
  Filter,
  Folder,
  FolderOpen,
  Grid,
  Heart,
  Home,
  Image,
  Info,
  Link,
  List,
  Lock,
  Mail,
  Map,
  Menu,
  MessageCircle,
  Moon,
  MoreHorizontal,
  MoreVertical,
  Package,
  Pencil,
  Phone,
  Plus,
  PlusCircle,
  Radio,
  RefreshCw,
  Save,
  Search,
  Send,
  Settings,
  Share,
  ShoppingCart,
  Slash,
  Star,
  Sun,
  Tag,
  Trash,
  Trophy,
  Upload,
  User,
  Users,
  Video,
  Volume,
  X,
  Zap,
};

interface IconSelectorProps {
  selectedIcon?: string;
  onSelectIcon: (icon: string) => void;
  className?: string;
}
type IconName = keyof typeof ICONS;

const IconSelector = ({
  selectedIcon,
  onSelectIcon,
  className,
}: IconSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Get all icon names from lucide-react
  const iconNames = Object.keys(ICONS) as IconName[];

  const iconName = Object.keys(LucideIcons).filter(
    (name) => name !== "createLucideIcon" && name !== "default"
  );
  console.log(iconName);

  // Filter icons based on search term
  const filteredIcons = iconNames.filter((name) =>
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
          <div className="grid grid-cols-8 gap-4">
            {filteredIcons.map((iconName) => {
              const IconComponent = ICONS[iconName];
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
                  <IconComponent className="w-6 h-6" />
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
