import { useSession } from 'next-auth/react';

import { Stories, Posts, Suggestions, MiniProfile } from '../components';

const Feed = () => {
  const { data: session } = useSession();
  return (
    <main
      className={`grid grid-cols-1 md:grid-cols-2 md:max-width-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ${
        !session && '!grid-cols-1 !max-w-3xl'
      }`}
    >
      <section className='col-span-2'>
        <Stories />
        <Posts />
      </section>
      {session && (
        <aside className='hidden xl:inline-grid md:col-span-1'>
          <div className='fixed top-20'>
            <MiniProfile />
            <Suggestions />
          </div>
        </aside>
      )}
    </main>
  );
};

export default Feed;
