"use client";
import { UserLoginSchema } from "@/lib/types/auth";
import { singInValidation } from "@/lib/validations/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "@/components/shared/PhoneInput";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import InputField from "@/components/shared/InputField";

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

  const phone = watch("phone"); // Watch the phone field object
  const password = watch("password");

  const onSubmit = async (datas: UserLoginSchema): Promise<void> => {
    console.log("Form submitted", datas); // Debug output
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <PhoneInput
        setValue={setValue}
        clearErrors={clearErrors}
        name="phone" // Main phone field name
        label="Phone"
        error={errors.phone}
        placeholder="Enter phone number"
      />
      <InputField
        register={register}
        clearErrors={clearErrors}
        name="password"
        label="Password"
        error={errors.password} // Error related to the password field
        placeholder="Enter password"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default LoginForm;
