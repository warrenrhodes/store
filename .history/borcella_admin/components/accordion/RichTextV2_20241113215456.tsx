const RichTextV2 = ({
  content,
  onChange,
}: {
  content: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div>
      <div className="min-h-[150px] border rounded">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} className="ProseMirror-custom" />
      </div>
    </div>
  );
};

export default RichTextV2;
