import React from "react";
import PhoneInputComponent from "react-phone-input-2";
type PhoneInputProps = {
  setValue: any;
  name: string;
  label: string;
  error: any;
  placeholder: string;
  clearErrors: any;
};
function PhoneInput({
  setValue,
  name = "",
  label,
  error,
  placeholder = "",
  clearErrors,
}: PhoneInputProps) {
  const onPhoneChange = (value: string, data: object) => {
    const { dialCode }: { dialCode?: string } = data;
    // Ensure the dialCode starts with "+"
    const formattedDialCode = dialCode?.startsWith("+")
      ? dialCode
      : `+${dialCode}`;
    // Remove the dial code (including the "+" symbol) from the value
    const phoneNumber = value?.replace(dialCode || "", "")?.trim();
    // Set the values in the form
    setValue(`${name}.dialCode`, formattedDialCode); // Update dialCode field
    setValue(`${name}.number`, phoneNumber); // Update phone field
    clearErrors("phone");
  };

  return (
    <main className="flex-1">
      <div>
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900 capitalize"
        >
          {label}
        </label>
        <PhoneInputComponent
          placeholder={placeholder}
          containerClass="w-full  h-[42px] rounded-xl ant-input css-dev-only-do-not-override-7ny38l ant-input-outlined  boder-[1px] border-gray-300 "
          inputStyle={{
            width: "100%",
            height: "100%",
          }}
          buttonClass="rounded-2xl"
          containerStyle={{
            padding: "0px",
            paddingLeft: "1px",
          }}
          onChange={onPhoneChange} // Handle changes
        />
      </div>
      {error && (
        <span className="mt-2 text-xs text-red-500">
          {error?.dialCode?.message}
          {error?.dialCode ? "," : ""} {error?.number?.message}
        </span>
      )}
    </main>
  );
}

export default PhoneInput;
