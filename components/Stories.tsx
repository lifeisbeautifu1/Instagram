import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { useSession } from 'next-auth/react';

import { Story } from './index';

interface Story {
  id: string;
  img: string;
  username: string;
}

const Stories = () => {
  const [stories, setStories] = useState<Story[]>([]);

  const { data: session } = useSession();

  useEffect(() => {
    setStories(
      [...Array(20)].map(() => ({
        id: faker.datatype.uuid(),
        img: faker.image.avatar(),
        username: faker.internet.userName(),
      }))
    );
  }, []);

  return (
    <div className='flex space-x-2 p-6 bg-white mt-8 border border-gray-200 rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black'>
      {session && (
        <Story img={session.user?.image!} username={session.user?.username} />
      )}
      {stories.map((story) => (
        <Story key={story?.id} img={story?.img} username={story?.username} />
      ))}
    </div>
  );
};

export default Stories;
