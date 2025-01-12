'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';

import { Form } from '@/components/ui/form';

import { profileDetailsValidation } from '@/lib/validations/auth';
import { useAuth, useSetAuth } from '@/context/Bint';
import SelectField from '@/components/shared/SelectField';
import SearchableSelect from '@/components/shared/SearchableSelect';
import InputField from '@/components/shared/Inputs';
import { countriesOptions } from '@/lib/shorts';
import { toast } from '@/hooks/use-toast';
import useFetchHook from '@/hooks/useFetchHook';

type profileDetailsState = {
  _id: string;
  names: string;
  phoneNumber: string;
  name: string;
  surname: string;
  country: string;
  gender: string;
};

function ProfileDetailsForm({
  edit,
  setEdit,
}: {
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const auth = useAuth();

  const { name, surname, country, gender, _id }: profileDetailsState =
    auth?.data;
  const setAuth = useSetAuth();
  const { Post, isLoading } = useFetchHook();
  const form = useForm<z.infer<typeof profileDetailsValidation>>({
    resolver: zodResolver(profileDetailsValidation),
    defaultValues: {
      name: name,
      surname: surname,
      gender: gender, // Default value for gender
      country: country,
    },
  });

  const { errors } = form.formState;
  const { setError, clearErrors, setValue } = form;

  async function onSubmit(data: z.infer<typeof profileDetailsValidation>) {
    // Check if the form values are different from the initial ones
    const isUnchanged =
      data.name === name &&
      data.surname === surname &&
      data.gender === gender &&
      data.country === country;

    if (isUnchanged) {
      toast({
        variant: 'destructive',
        title: 'No changes detected',
        description: 'No changes were made to the profile details.',
        duration: 3000,
      });
      return;
    }
    try {
      const res = await Post({
        url: `/users/updateMyProfile/${_id}`,
        body: {
          name: data.name,
          surname: data.surname,
          gender: data.gender,
          nationality: data.country,
        },
        method: 'PUT',
        v: 2,
      });

      if (!res.ok) {
        toast({
          variant: 'destructive',
          description: res?.message || 'Something went wrong',
          duration: 3000,
        });
        return;
      }
      toast({
        description: 'Profile details updated successfully',
        duration: 3000,
      });
      setAuth({
        ...auth,
        data: {
          ...auth?.data,
          name: data.name,
          surname: data.surname,
          gender: data.gender,
          country: data.country,
        },
      });
      setEdit(false);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        description: error?.message || 'Something went wrong',
        duration: 3000,
      });
    }
  }

  // Clear the root error once any field changes

  return (
    <div className='relative'>
      {!edit ? (
        <button
          type='button'
          onClick={() => setEdit(true)}
          className='absolute right-[20px] -top-[15px]  cursor-pointer bg-orange-500 text-white hover:bg-orange-300 border-input border px-3 py-1 rounded-lg '
        >
          Edit
        </button>
      ) : (
        <button
          type='button'
          onClick={() => setEdit(false)}
          className='absolute right-[100px] -top-[35px] cursor-pointer bg-red-500 text-white hover:bg-red-300 border-input border px-3 py-1 rounded-lg '
        >
          cancel
        </button>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='px-[20px] space-y-4 pb-[20px]'
        >
          {edit && (
            <button
              type='submit'
              className='absolute right-[20px] -top-[35px]  cursor-pointer bg-sky-600 text-white hover:bg-sky-300 border-input border px-3 py-1 rounded-lg '
            >
              update
            </button>
          )}

          <section className='grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-5'>
            <InputField
              control={form.control}
              name='name'
              label='name'
              placeholder='Enter your name'
              disabled={!edit || isLoading}
            />
            <InputField
              control={form.control}
              name='surname'
              label='Surname'
              placeholder='Enter your surname'
              disabled={!edit || isLoading}
            />
          </section>
          <section className='grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-5'>
            <SelectField
              control={form.control}
              name='gender'
              label='Select Gender'
              placeholder='Choose your gender'
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ]}
              disabled={!edit || isLoading}
            />
            <SearchableSelect
              control={form.control}
              name='country'
              label='Select country'
              placeholder='Choose your country'
              options={countriesOptions}
              disabled={!edit || isLoading}
            />
          </section>
          <p className='text-red-500'>{errors.root?.message}</p>
        </form>
      </Form>
    </div>
  );
}

const genders = ['Male', 'Female', 'Other'];

export default ProfileDetailsForm;
