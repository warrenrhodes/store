'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import CustomRichTextEditor from '@/components/accordion/CustomRichText'
import { Textarea } from '@/components/ui/textarea'
import { Path, PathValue, UseFormReturn } from 'react-hook-form'
import useAuthToken from '@/hooks/useAuthToken'

interface ContentEditorProps<T extends Record<string, any>> {
  form: UseFormReturn<T>
  contentTypeFieldKey: Path<T>
  contentFieldKey: Path<T>
  label: string
}

export const ContentEditor = <T extends Record<string, any>>({
  form,
  contentTypeFieldKey,
  contentFieldKey,
  label,
}: ContentEditorProps<T>) => {
  const { token } = useAuthToken()

  return (
    <div className="flex flex-col gap-2 w-full">
      <FormLabel>{label}</FormLabel>
      <FormField
        control={form.control}
        name={contentTypeFieldKey}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <Select
                onValueChange={e => {
                  form.setValue(contentFieldKey, '' as PathValue<T, Path<T>>, {
                    shouldValidate: true,
                  })
                  field.onChange(e)
                }}
                defaultValue={(field.value || '') as string}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HTML">HTML</SelectItem>
                  <SelectItem value="TEXT">Plain Text</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {form.watch(contentTypeFieldKey) === 'HTML' && token ? (
        <FormField
          control={form.control}
          name={contentFieldKey}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex gap-2">
                  <CustomRichTextEditor
                    token={token}
                    content={(field.value || '') as string}
                    onSave={field.onChange}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : (
        <FormField
          control={form.control}
          name={contentFieldKey}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder={`${label} ...`}
                  className="min-h-[50px]"
                  defaultValue={(field.value || '') as string}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  )
}
