type ScreenCardProps = {
  children: React.ReactNode; // Correct typing for React children
};

function ScreenCard({ children }: ScreenCardProps) {
  return (
    <main className='relative w-full'>
      <div className='mx-auto max-w-[1400px]  relative'>{children}</div>
    </main>
  );
}

export default ScreenCard;
