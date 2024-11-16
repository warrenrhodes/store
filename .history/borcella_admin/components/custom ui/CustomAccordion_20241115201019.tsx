import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const CustomAccordion = ({
  title,
  children,
  defaultCollapsed = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md">
      <button
        type="button"
        className="w-full flex items-center justify-between bg-white dark:bg-card p-5 text-base text-gray-800 dark:text-foreground font-medium transition-colors"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <span>{title}</span>
        {isCollapsed ? (
          <ChevronDown
            className="text-gray-500 dark:text-muted-foreground"
            size={20}
          />
        ) : (
          <ChevronUp
            className="text-gray-500 dark:text-muted-foreground"
            size={20}
          />
        )}
      </button>

      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          isCollapsed ? "max-h-0" : "max-h-[1000px]"
        }`}
      >
        <div className="p-5 border-t dark:border-border bg-white dark:bg-card">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomAccordion;
