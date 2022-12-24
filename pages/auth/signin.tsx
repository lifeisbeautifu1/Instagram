import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';

import { Header } from '../../components';

const SignIn = ({ providers }: any) => {
  return (
    <>
      <Header />
      <div className='flex flex-col items-center justify-center min-h-screen py-2 px-14 text-center -mt-40'>
        <div className='relative flex w-80 h-32'>
          <Image
            src={'https://links.papareact.com/ocw'}
            alt='logo'
            layout='fill'
            objectFit='contain'
          />
        </div>
        <p className='font-xs italic'>
          This is not a real app, it's build for educational purposes only!
        </p>
        <div className='mt-8'>
          {Object.values(providers).map((provider: any) => (
            <div key={provider.name}>
              <button
                className='py-2 px-3 rounded-lg bg-blue-500 text-white'
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl: '/',
                  })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

export default SignIn;
