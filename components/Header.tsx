import Image from 'next/image';
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  PaperAirplaneIcon,
  HeartIcon,
  MenuIcon,
} from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRecoilState } from 'recoil';

import { modalState } from '../atoms/modalAtom';

const Header = () => {
  const { data: session } = useSession();

  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);

  const router = useRouter();
  return (
    <header className='shadow-sm border-b bg-white sticky top-0 z-50'>
      <div className='flex items-center justify-between max-w-6xl mx-5 lg:mx-auto'>
        <div
          className='relative hidden lg:flex h-10 w-24 cursor-pointer'
          onClick={() => router.push('/')}
        >
          <Image
            src={'https://links.papareact.com/ocw'}
            alt='logo'
            layout='fill'
            objectFit='contain'
          />
        </div>
        <div
          onClick={() => router.push('/')}
          className='relative flex items-center lg:hidden w-10 h-10 cursor-pointer'
        >
          <Image
            src={'https://links.papareact.com/jjm'}
            alt='logo'
            layout='fill'
          />
        </div>
        <div className='max-w-xs'>
          <div className='mt-1 relative p-3 rounded-md'>
            <div className='absolute inset-y-0 flex items-center pointer-events-none pl-3'>
              <SearchIcon className='h-5 w-5 text-gray-500' />
            </div>
            <input
              type='text'
              placeholder='Search'
              className='bg-gray-50 block w-full pl-10
            sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black'
            />
          </div>
        </div>
        <nav className='flex items-center justify-end space-x-4'>
          <HomeIcon onClick={() => router.push('/')} className='navBtn' />
          <MenuIcon className='h-6 md:hidden cursor-pointer' />
          {session ? (
            <>
              <div className='relative navBtn'>
                <PaperAirplaneIcon className='navBtn rotate-45' />
                <div className='absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white'>
                  3
                </div>
              </div>
              <PlusCircleIcon
                onClick={() => setIsModalOpen(true)}
                className='navBtn'
              />
              <UserGroupIcon className='navBtn' />
              <HeartIcon className='navBtn' />
              <img
                onClick={() => signOut()}
                src={session?.user?.image ?? undefined}
                alt='avatar'
                className='h-10 rounded-full cursor-pointer'
              />
            </>
          ) : (
            <button onClick={() => signIn()}>Sign In</button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
