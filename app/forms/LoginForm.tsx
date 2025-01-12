'use client';
import { UserLoginSchema } from '@/lib/types/auth';
import { singInValidation } from '@/lib/validations/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PhoneInput from '@/components/shared/PhoneInput';
import { Button } from '@/components/ui/button';
import InputField from '@/components/shared/InputField';
import useFetchHook from '@/hooks/useFetchHook';
import { Spin } from 'antd';

import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

function LoginForm() {
  const { Post, isLoading } = useFetchHook();
  const router = useRouter();
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

  const phone = watch('phone'); // Watch the phone field object
  const password = watch('password');

  const onSubmit = async (datas: UserLoginSchema): Promise<void> => {
    const { phone, password } = datas;

    try {
      const res = await Post({
        url: '/users/userLogin',
        body: {
          dialCode: phone.dialCode,
          phone: phone.number,
          password,
        },
        method: 'POST',
        v: 2,
      });
      if (!res.ok) {
        toast({
          variant: 'destructive',
          description: res?.message,
          duration: 3000,
        });
        return;
      }
      router.push('/profile');
      toast({
        description: 'Login successful',
        duration: 3000,
      });
    } catch (error: any) {
      console.error('Login failed', error);
      toast({
        variant: 'destructive',
        description: error?.message || 'Login failed',
        duration: 3000,
      });
    }
  };
  // useEffect(() => {
  //   console.log('Form submitted', errors);
  // }, [errors]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 relative select-none p-3 rounded-md border border-input bg-background'
    >
      <PhoneInput
        setValue={setValue}
        clearErrors={clearErrors}
        name='phone' // Main phone field name
        label='Phone'
        error={errors.phone}
        placeholder='Enter phone number'
        disabled={isLoading}
      />
      <InputField
        register={register}
        clearErrors={clearErrors}
        name='password'
        label='Password'
        error={errors.password} // Error related to the password field
        placeholder='Enter password'
        disabled={isLoading}
      />
      <footer className='flex justify-end'>
        <Button
          type='submit'
          disabled={!phone || !password || isLoading}
          className='w-[100px] '
        >
          {isLoading ? <Spin size='small' /> : 'Login'}
        </Button>
      </footer>
    </form>
  );
}

export default LoginForm;
