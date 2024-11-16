type ContentType = "text" | "image" | "video";

const CustomAccordionItem = ({
  type,
  index,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  listAvailableContentType,
  isLast,
  content,
}: {
  type?: ContentType;
  index: number;
  onChange: (value: StoredProductDescription) => void;
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  listAvailableContentType: ContentType[];
  isLast: boolean;
  content: string;
}) => {
  const [currentType, setCurrenType] = useState<string>(element.type);
  useEffect(() => {}, [element]);
  return (
    <>
      <div className="mb-3 flex w-full gap-3">
        <div className="w-full">
          <Select
            onValueChange={(value) => setCurrenType(value)}
            defaultValue={currentType}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              {listContentType.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div>
            {currentType === "text" ? (
              <RichTextV2
                content={element.content || ""}
                onChange={(value) =>
                  onChange({ ...element, content: value, type: currentType })
                }
              />
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {onMoveUp && (
            <Button
              variant="outline"
              size="sm"
              onClick={onMoveUp}
              disabled={index === 0}
            >
              <MoveUp size={12} />
            </Button>
          )}

          {onMoveDown && (
            <Button
              variant="outline"
              size="sm"
              onClick={onMoveDown}
              disabled={isLast}
            >
              <MoveDown size={12} />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={onDelete?.call}
              className=" hover:bg-red-500/15 text-red-500 bg-red-500/10"
            >
              <Trash2 size={13} />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
