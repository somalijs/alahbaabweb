import React from 'react';
import PhoneInputComponent from 'react-phone-input-2';
import { Input } from 'antd';
type PhoneInputProps = {
  register: any;
  name: string;
  label: string;
  error: any;
  placeholder: string;
  clearErrors: any;
  disabled: boolean;
};
function InputField({
  register,
  name = '',
  label,
  error,
  placeholder = '',
  disabled,
}: PhoneInputProps) {
  return (
    <main className='flex-1'>
      <div>
        <label
          htmlFor={name}
          className='block mb-2 text-sm font-medium text-gray-900 capitalize'
        >
          {label}
        </label>
        <input
          className=' w-full  h-[42px] rounded-xl ant-input css-dev-only-do-not-override-7ny38l ant-input-outlined  boder-[1px] border-gray-300 '
          type='text'
          placeholder={placeholder}
          {...register(name)}
          disabled={disabled}
        />
        <div className='hidden'>
          <Input className='hidden' />
        </div>
      </div>
      {error && (
        <span className='mt-2 text-xs text-red-500'>
          {error.message || 'This field is required'}
        </span>
      )}
    </main>
  );
}

export default InputField;
