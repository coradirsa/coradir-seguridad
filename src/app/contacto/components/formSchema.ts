import z from "zod";

export const FormSchema = z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
    email: z.string().email("Debes ingresar un email válido."),
    phone: z.string()
    .min(10, "El teléfono debe tener al menos 10 dígitos.")
    .regex(/^\+?\d{10,15}$/, "El teléfono solo puede contener números y un '+' inicial opcional."), 
    message: z.string().max(500, "El mensaje no puede tener más de 500 caracteres.").optional() 
});

export type InputForm = {
    name: keyof FormSchema;
    label: string;
    type: string;
    ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
    options?: string[];
}
 
export type FormSchema = z.infer< typeof FormSchema >;