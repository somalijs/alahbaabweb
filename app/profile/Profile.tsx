'use client';

import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import ScreenMotion from '../utils/ScreenMotion';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ProfileDetailsForm from '../forms/ProfileDetailsForm';
import ProfilePhone from '../forms/ProfilePhone';
import { useEffect, useState } from 'react';

function Profile() {
  const [edit, setEdit] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  useEffect(() => {
    if (editPhone) {
      setEdit(false);
    }
    if (edit) {
      setEditPhone(false);
    }
  }, [editPhone, edit]);
  return (
    <ScreenMotion>
      <div
        className='flex justify-center mt-[50px] 
       '
      >
        <Card className='w-full sm:max-w-[600px] mx-[10px] px-[3px] '>
          <CardHeader>
            <CardTitle>Profile View</CardTitle>
            <CardDescription className='shadow-bsh64b pb-2'>
              you can view and edit your profile here
            </CardDescription>
          </CardHeader>
          <ProfileDetailsForm edit={edit} setEdit={setEdit} />
          <ProfilePhone editPhone={editPhone} setEditPhone={setEditPhone} />
        </Card>
      </div>
    </ScreenMotion>
  );
}

export default Profile;
