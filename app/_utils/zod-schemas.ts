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