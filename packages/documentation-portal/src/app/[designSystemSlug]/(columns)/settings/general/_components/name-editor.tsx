'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DesignSystem } from '@/domain/entities/design-system'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/atoms/spinner'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
})

export function NameEditor({ designSystem }: { designSystem: DesignSystem }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: designSystem.name,
    },
  })

  const isMutating = false

  async function onSubmit(values: z.infer<typeof formSchema>) {}

  return (
    <Card>
      <CardHeader>
        <CardTitle>Design System Name</CardTitle>
        <CardDescription>
          Used to identify your Design System in the Team Dashboard
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-t py-3 flex justify-end">
            <Button disabled={isMutating} type="submit">
              {isMutating && (
                <Spinner className="animate-spin h-5 w-5 -ml-1 mr-2" />
              )}
              Save
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
