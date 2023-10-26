import { z } from "zod";

export const EmailSchema = z.object({
    email: z.string().email("Niewłaściwy format adresu mailowego")
})

export const LoginDataSchema = EmailSchema.extend({
    password: z.string().min(8, "Hasło musi mieć nie mniej niż 8 znaków"),
});

export const SignupDataSchema = LoginDataSchema.extend({
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Hasła muszą być identyczne",
    path: ["confirmPassword"],
});

export const OrgNameSchema = z.object({
    name: z.string().min(2, "Nazwa musi składać się z co najmniej 2 znaków").max(40, "Nazwa nie może być dłuższa niż 40 znaków"),
})

export const EventSignupSchema = z.object({
    id: z.number().int().positive(),
})
