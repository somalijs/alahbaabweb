import { z } from "zod";
import {countriesString} from "@/lib/shorts";
export const  singInValidation = z.object({
    phone: z.object({
      dialCode: z
        .string()
        .min(1, {
          message: "Dial code is required",
        })
        .regex(/^\+\d+$/, {
          message: "Dial code must start with '+' followed by numbers",
        }),
        number: z
        .string()
        .min(5, {
          message: "Phone number must be at least 5 characters",
        })
        .regex(/^\d+$/, {
          message: "Phone number can only contain digits",
        }),
    }),
    password: z.string().min(1, { message: "Password is required" }),
  });
export const profileDetailsValidation = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters " }),
    surname: z.string().min(3, { message: "Surname must be at least 3 characters " }),
    country: z.string().min(2, { message: "Country must be at least 2 characters " }).refine((value) => countriesString.includes(value.toLowerCase()), {
      message: "Invalid country",
    }),
    gender: z
    .string()
    .min(1, { message: "Gender is required" })
    .refine((value) => ["male", "female"].includes(value), {
      message: "Gender must be 'male' or 'female'",
    }),
})