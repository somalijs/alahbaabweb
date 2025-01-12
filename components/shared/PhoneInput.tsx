import React from 'react';
import PhoneInputComponent from 'react-phone-input-2';
import { Input } from 'antd';
type PhoneInputProps = {
  setValue: any;
  name: string;
  label: string;
  error: any;
  placeholder: string;
  clearErrors: any;
  disabled: boolean;
  defaultValue?: string;
};

function PhoneInput({
  setValue,
  name = '',
  label,
  error,
  placeholder = '',
  clearErrors,
  disabled,
  defaultValue,
}: PhoneInputProps) {
  const onPhoneChange = (value: string, data: object) => {
    const { dialCode }: { dialCode?: string } = data;
    // Ensure the dialCode starts with "+"
    const formattedDialCode = dialCode?.startsWith('+')
      ? dialCode
      : `+${dialCode}`;
    // Remove the dial code (including the "+" symbol) from the value
    const phoneNumber = value?.replace(dialCode || '', '')?.trim();
    // Set the values in the form
    setValue(`${name}.dialCode`, formattedDialCode); // Update dialCode field
    setValue(`${name}.number`, phoneNumber); // Update phone field
    clearErrors('phone');
  };
  const message =
    error?.message || error?.dialCode?.message || error?.number?.message;

  return (
    <main className='flex-1'>
      <div>
        <label
          htmlFor={name}
          className='block mb-2 text-sm font-medium text-gray-900 capitalize'
        >
          {label}
        </label>
        <PhoneInputComponent
          placeholder={placeholder}
          containerClass={`w-full  h-[42px] rounded-xl  ant-input css-dev-only-do-not-override-7ny38l ant-input-outlined  boder-[1px] border-gray-300 ${
            disabled ? 'ant-input-disabled' : ''
          }`}
          inputStyle={{
            width: '100%',
            height: '100%',
          }}
          value={defaultValue}
          disabled={disabled}
          buttonClass='rounded-2xl'
          containerStyle={{
            padding: '0px',
            paddingLeft: '1px',
          }}
          onChange={onPhoneChange} // Handle changes
        />
        <div className='hidden'>
          <Input />
        </div>
      </div>
      {error && (
        <span className='text-xs text-red-500'>
          {message === 'Required' ? 'This field is required' : message || ''}
        </span>
      )}
    </main>
  );
}

export default PhoneInput;
