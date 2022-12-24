import { useSession, signOut } from 'next-auth/react';

const MiniProfile = () => {
  const { data: session } = useSession();

  return (
    <div className='flex items-center mt-14 ml-10 justify-between'>
      <img
        className='h-16 w-16 rounded-full border p-[2px]'
        src={session?.user?.image ?? undefined}
        alt='avatar'
      />
      <div className='flex-1 mx-4'>
        <h2 className='font-bold'>{session?.user?.username}</h2>
        <h3 className='font-light text-sm'>Welcome to Instagram</h3>
      </div>
      <button
        onClick={() => signOut()}
        className='text-blue-400 font-semibold text-sm'
      >
        Sign Out
      </button>
    </div>
  );
};

export default MiniProfile;
