/**
 * FormField - Wrapper de compatibilidade para Input com label
 * 
 * Este componente permite duas formas de uso:
 * 1. Uso legado (compatibilidade): <FormInput label="Nome" ... />
 * 2. Uso recomendado com React Hook Form: Field + Controller + Input
 * 
 * Para novos forms, use o padrão oficial shadcn/ui:
 * <Field>
 *   <FieldLabel>Nome</FieldLabel>
 *   <Input {...register("name")} />
 *   <FieldError>{error}</FieldError>
 * </Field>
 */

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"

interface FormInputProps extends React.ComponentProps<typeof Input> {
    label?: string
    error?: string
}

/**
 * FormInput - Input com label e error embutidos para compatibilidade
 * 
 * @deprecated Use Field + FieldLabel + Input + FieldError para novos componentes
 */
function FormInput({ label, error, id, ...props }: FormInputProps) {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined)

    if (!label && !error) {
        // Sem label nem error, renderiza apenas o Input
        return <Input id={inputId} {...props} />
    }

    return (
        <Field data-invalid={!!error}>
            {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}
            <Input
                id={inputId}
                aria-invalid={!!error}
                {...props}
            />
            {error && <FieldError>{error}</FieldError>}
        </Field>
    )
}

export { FormInput }
