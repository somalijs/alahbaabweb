import React from "react";
import PhoneInputComponent from "react-phone-input-2";
import { Input } from "antd";
type PhoneInputProps = {
  register: any;
  name: string;
  label: string;
  error: any;
  placeholder: string;
  clearErrors: any;
};
function InputField({
  register,
  name = "",
  label,
  error,
  placeholder = "",
}: PhoneInputProps) {
  console.log(error);
  return (
    <main className="flex-1">
      <div>
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900 capitalize"
        >
          {label}
        </label>
        <Input
          className="h-[40px]"
          type="text"
          placeholder={placeholder}
          {...register(name)}
        />
      </div>
      {error && (
        <span className="mt-2 text-xs text-red-500">
          {error.message || "This field is required"}
        </span>
      )}
    </main>
  );
}

export default InputField;
