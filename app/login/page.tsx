import LoginForm from '../forms/LoginForm';

function page() {
  return (
    <main className='px-[10px]'>
      <div className='mx-auto max-w-[600px] p-[10px] mt-[50px] shadow-bsh33 rounded-lg'>
        <LoginForm />
      </div>
    </main>
  );
}

export default page;
