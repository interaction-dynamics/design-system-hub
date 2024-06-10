import { z } from 'zod'
import {
  CodeComponentProvider,
  CodeComponentProviderValidator,
} from './code-component-provider'
import { Component } from '@/domain/entities/component'
import { ComponentVariant } from '@/domain/entities/component-variant'

export const CodeComponentValidator = z.object({
  providers: z.object({
    code: CodeComponentProviderValidator,
  }),
})

export interface CodeComponent extends Component<CodeComponentProvider> {}

export function validateCodeComponent(
  component: Component | ComponentVariant
): component is CodeComponent {
  return Boolean(CodeComponentValidator.safeParse(component))
}
