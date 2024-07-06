'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import useSWRMutation from 'swr/mutation'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { DesignSystem } from '@/domain/entities/design-system'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  url: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  visibility: z.enum(['public', 'private'], {
    required_error: 'You need to select a notification type.',
  }),
})

async function updateDesignSystem(
  url: string,
  { arg }: { arg: { name: string; slug: string; isPublic: boolean } }
) {
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(arg),
  }).then((r) => r.json())
}

interface Props {
  designSystem: DesignSystem
  defaultName: string
  defaultSlug: string
  defaultVisibility: 'public' | 'private'
}

export function FormInput({
  designSystem,
  defaultName,
  defaultSlug,
  defaultVisibility,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultName,
      url: defaultSlug,
      visibility: defaultVisibility,
    },
  })

  const { trigger, isMutating } = useSWRMutation(
    `/api/design-system/${designSystem.id}`,
    updateDesignSystem
  )

  const router = useRouter()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const slug = values.url

    const { success, reason } = await trigger({
      name: values.name,
      slug,
      isPublic: values.visibility === 'public',
    })

    if (success) {
      router.push(`/${slug}`)
    } else if (reason === 'slug_duplicated') {
      console.log('duplicating')
      form.setError('url', {
        type: 'custom',
        message: 'This slug already exists.',
        on,
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Design System Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <div className="min-h-5">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="Url" {...field} />
              </FormControl>
              <div className="min-h-5">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="visibility"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Visibility</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="public" />
                    </FormControl>
                    <FormLabel className="font-normal">Public</FormLabel>
                    <FormDescription>
                      Everybody will be access to the design system.
                    </FormDescription>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="private" />
                    </FormControl>
                    <FormLabel className="font-normal">Private</FormLabel>
                    <FormDescription>
                      Only members of the organization and invited users will be
                      able to access the design system.
                    </FormDescription>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            disabled={form.formState.isSubmitting || !form.formState.isValid}
            type="submit"
          >
            {form.formState.isSubmitting && (
              <svg
                className="animate-spin h-5 w-5 -ml-1 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}
