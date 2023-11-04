import { z } from "zod";

const now = new Date();

export function toAccountNumber(value: string): string {
    const onlyNums = value.replace(/[^\d]/g, "");

    let finalString = onlyNums.substring(0, 2);

    for (let step = 0; step < 6; step++) {
        const startIndex = 2 + step * 4;
        const nextPack = onlyNums.substring(startIndex, startIndex + 4);

        if (nextPack) {
            finalString += ` ${nextPack}`;
        } else {
            break;
        }
    }
    return finalString;
}

export const bankNumberRegex = RegExp("^[0-9]{2}(?:[ ][0-9]{4}){6}$");

export const EmailSchema = z.object({
    email: z.string().email("Niewłaściwy format adresu mailowego"),
});

export const LoginDataSchema = EmailSchema.extend({
    password: z.string().min(8, "Hasło musi mieć nie mniej niż 8 znaków"),
});

export const SignupDataSchema = LoginDataSchema.extend({
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Hasło nie zgadza się",
    path: ["confirmPassword"],
});

export const OrgNameSchema = z.object({
    name: z
        .string()
        .min(2, "Nazwa musi składać się z co najmniej 2 znaków")
        .max(40, "Nazwa nie może być dłuższa niż 40 znaków"),
});

export const EventSignupSchema = z.object({
    id: z.number().int().positive(),
});

export const OrgInfoSchema = OrgNameSchema.extend({
    description: z.string().max(2000, "Za długi opis"),
    contact_email: z
        .string()
        .email("Niewłaściwy format adresu mailowego")
        .optional()
        .or(z.literal("")),
    account_number: z
        .string()
        .regex(
            bankNumberRegex,
            "Niewłaściwy format numeru konta bankowego (26 cyfr)"
        )
        .optional()
        .or(z.literal("")),
});

export const NewEventSchema = z
    .object({
        name: z
            .string()
            .min(4, "Nazwa musi składać się z co najmniej 4 znaków")
            .max(60, "Nazwa nie może być dłuższa niż 60 znaków"),
        starts: z.coerce.date({
            required_error: "Podaj termin rozpoczęcia",
            invalid_type_error: "Nieprawidłowy format daty",
        }),
        ends: z.coerce.date({
            required_error: "Podaj termin rozpoczęcia",
            invalid_type_error: "Nieprawidłowy format daty",
        }),
        signupsClose: z.coerce.date({
            required_error: "Podaj termin rozpoczęcia",
            invalid_type_error: "Nieprawidłowy format daty",
        }),
        max_attendees: z
            .number()
            .min(1, "Minimalna wartość to 1 uczestnik")
            .max(499, "Maksymalny limit to 499 uczestników"),
        location: z.string().min(6, "Adres nie może być krótszy niż 6 znaków"),
        latitude: z.number(),
        longitude: z.number(),
        description: z.string().max(3000, "Za długi opis"),
        tags: z.coerce
            .number()
            .array()
            .nonempty("Musisz wybrać przynajmniej jeden tag"),
    })
    .refine((data) => data.starts >= data.signupsClose, {
        message:
            "Zapisy muszą być zamkniętę najpóźniej z początkiem wydarzenia",
        path: ["signupsClose"],
    })
    .refine((data) => data.ends > data.starts, {
        message: "Wydarzenie nie może kończyć się wcześniej niż się zaczyna",
        path: ["ends"],
    });

export const CapapPointSchema = z.object({
    type: z.literal("Point"),
    coordinates: z.number().array().length(2),
});
