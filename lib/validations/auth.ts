import { z } from "zod";

export const singInValidation = z.object({
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
  password: z.string().min(2, { message: "Password is required" }),
});
