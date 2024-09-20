'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import useSWRMutation from 'swr/mutation'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import { Spinner } from '@/components/atoms/spinner'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  url: z.string().min(2, {
    message: 'URL must be at least 2 characters.',
  }),
  visibility: z.enum(['public', 'private'], {
    required_error: 'You need to select a visibility type.',
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
}

export function FormInput({ designSystem }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: designSystem.name,
      url: designSystem.slug,
      visibility: designSystem.isPublic ? 'public' : 'private',
    },
  })

  const { trigger, isMutating } = useSWRMutation(
    `/api/design-system/${designSystem.id}`,
    updateDesignSystem
  )

  const router = useRouter()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const slug = values.url

    const { success } = await trigger({
      name: values.name,
      slug,
      isPublic: values.visibility === 'public',
    })

    if (success) {
      router.push(`/${slug}`)
    }
  }

  return (
    <>
      <CardContent>
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
                          Only members of the organization and invited users
                          will be able to access the design system.
                        </FormDescription>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button disabled={isMutating} type="submit">
                {isMutating && (
                  <Spinner className="animate-spin h-5 w-5 -ml-1 mr-2" />
                )}
                Save
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="border-t">
        <p>Card Footer</p>
      </CardFooter>
    </>
  )
}
