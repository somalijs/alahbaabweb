"use client";
import { UserLoginSchema } from "@/lib/types/auth";
import { singInValidation } from "@/lib/validations/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "@/components/shared/PhoneInput";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
    setValue,
  } = useForm<UserLoginSchema>({
    resolver: zodResolver(singInValidation),
  });
  const phone = watch("phone");
  const password = watch("password");
  const onSubmit = async (datas: UserLoginSchema): Promise<void> => {
    console.log("Form submitted"); // Debug output
  };
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <PhoneInput
        setValue={setValue}
        clearErrors={clearErrors}
        name="phone"
        label="phone"
        error={errors.phone}
        placeholder="Enter phone number"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default LoginForm;
