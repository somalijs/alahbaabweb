import Auth from '@/lib/auth/Auth';
import LoginForm from '../forms/LoginForm';

function page() {
  return (
    <main className='px-[10px]'>
      <div className='mx-auto max-w-[500px] p-[10px] mt-[50px] shadow-bsh33 rounded-lg space-y-4 bg-gray-50'>
        <h1 className='text-center text-2xl font-bold text-mainColor uppercase'>
          Al Ahbaab user Login
        </h1>
        <LoginForm />
        <p className='text-center  text-sm text-mainColor select-none'>
          Powered by Bintzone
        </p>
      </div>
    </main>
  );
}

export default page;
