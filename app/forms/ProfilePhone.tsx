import PhoneInput from '@/components/shared/PhoneInput';
import { useAuth } from '@/context/Bint';
import useFetchHook from '@/hooks/useFetchHook';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type PhoneSchema = {
  phone: {
    dialCode: string;
    number: string;
  };
};

function ProfilePhone({
  editPhone,
  setEditPhone,
}: {
  editPhone: boolean;
  setEditPhone: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { phone, dialCode } = useAuth()?.data;
  const { isLoading } = useFetchHook();
  const phoneValidation = z.object({
    phone: z.object({
      dialCode: z
        .string()
        .min(1, {
          message: 'Dial code is required',
        })
        .regex(/^\+\d+$/, {
          message: "Dial code must start with '+' followed by numbers",
        }),
      number: z
        .string()
        .min(5, {
          message: 'Phone number must be at least 5 characters',
        })
        .regex(/^\d+$/, {
          message: 'Phone number can only contain digits',
        }),
    }),
  });
  const {
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
    setValue,
  } = useForm<PhoneSchema>({
    resolver: zodResolver(phoneValidation),
    defaultValues: {
      phone: {
        dialCode: '',
        number: phone,
      },
    },
  });
  // Watch the phone field object
  return (
    <div className='p-[20px] space-y-3 select-none'>
      <h1 className='text-center text-xl font-bold text-mainColor uppercase'>
        whatsapp Phone Number
      </h1>
      <PhoneInput
        setValue={setValue}
        defaultValue={`${dialCode}${phone}` || ''}
        clearErrors={clearErrors}
        name='phone' // Main phone field name
        label=''
        error={errors.phone}
        placeholder='Enter phone number'
        disabled={isLoading || !editPhone}
      />
      <footer className='flex  flex-wrap justify-between gap-3'>
        <h1
          className='text-sm text-mainColor capitalize underline hover:text-mainOrange cursor-pointer'
          onClick={() => setEditPhone(true)}
        >
          Change whatsapp number
        </h1>
        <h1 className='text-sm text-mainColor capitalize underline  hover:text-mainOrange cursor-pointer'>
          Change password
        </h1>
      </footer>
    </div>
  );
}

export default ProfilePhone;
