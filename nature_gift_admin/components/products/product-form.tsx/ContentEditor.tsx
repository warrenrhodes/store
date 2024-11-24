"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContentSchema, productSchema } from "@/lib/validations/product";
import CustomAccordion from "@/components/accordion/CustomAccordion";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomRichTextEditor from "@/components/accordion/CustomRichText";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { Spacer } from "@/components/custom-ui/Spacer";

type Content = z.infer<typeof ContentSchema>;
interface ContentEditorProps {
  content: Content;
  label: string;
  onChange: (content: Content) => void;
  error?: string;
}

export function ContentEditor({
  content,
  label,
  onChange,
  error,
}: ContentEditorProps) {
  return (
    <div className="flex flex-col gap-2">
      <CustomAccordion title={label}>
        <FormItem>
          <FormLabel>Content Type</FormLabel>
          <Select
            onValueChange={(value) =>
              onChange({
                content: "",
                contentType: value as typeof content.contentType,
              })
            }
            defaultValue={content.contentType}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="TEXT">Plain Text</SelectItem>
              <SelectItem value="HTML">HTML</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
        <Spacer />
        <FormItem>
          <FormLabel>Content</FormLabel>
          {content.contentType === "TEXT" ? (
            <FormControl>
              <Textarea
                defaultValue={content.content}
                className="min-h-[50px]"
                onChange={(e) =>
                  onChange({ ...content, content: e.target.value })
                }
              />
            </FormControl>
          ) : (
            <FormControl>
              <CustomRichTextEditor
                content={content.content}
                onSave={(e) => onChange({ ...content, content: e })}
              />
            </FormControl>
          )}
          <FormMessage />
        </FormItem>
      </CustomAccordion>
    </div>
  );
}
