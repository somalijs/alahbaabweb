"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type userSchema = {
  phone: {
    number: string;
    dialCode: string;
  };
  password: string;
};
function LoginForm() {
  const User = z.object({
    phone: z.object({
      number: z.string().min(1, { message: "Phone number is required" }),
      dialCode: z.string(),
    }),
    password: z.string().min(1, { message: "Password is required" }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userSchema>({
    resolver: zodResolver(User),
  });
  return <div>SignInForm</div>;
}

export default LoginForm;
