import { Check, ChevronsUpDown, icons, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import * as LucideIcons from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FixedSizeList as List } from "react-window";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface IconSelectorProps {
  selectedIcon?: string;
  onSelectIcon: (icon: string) => void;
}

const IconSelector = ({ selectedIcon, onSelectIcon }: IconSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedIcon || "");

  useEffect(() => {
    onSelectIcon(value);
  }, [onSelectIcon, value]);

  const iconNames = Object.keys(LucideIcons).filter(
    (name) => name !== "createLucideIcon" && name !== "default"
  );

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? iconNames.find((iconName) => iconName.toLowerCase() === value)
                : "Select icon..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setValue("")}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search icon..." />
            <CommandList>
              <CommandEmpty>No icon found.</CommandEmpty>
              <CommandGroup>
                {iconNames.map((iconName, index) => {
                  const LucideIcon = icons[iconName as keyof typeof icons];
                  if (!LucideIcon) return null;

                  return (
                    <CommandItem
                      key={`${iconName}-${index}`}
                      value={iconName}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <LucideIcon className="w-6 h-6" />
                        <span>{iconName}</span>
                      </div>
                      <Check
                        className={cn(
                          "ml-auto",
                          value === iconName ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export { IconSelector };
