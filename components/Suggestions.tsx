import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { profile } from 'console';

interface Suggestion {
  id: string;
  img: string;
  username: string;
  company: string;
}

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    setSuggestions(
      [...Array(5)].map(() => ({
        id: faker.datatype.uuid(),
        img: faker.image.avatar(),
        username: faker.internet.userName(),
        company: faker.company.name(),
      }))
    );
  }, []);

  return (
    <div className='mt-4 ml-10'>
      <div className='flex justify-between text-sm mb-5'>
        <h3 className='text-sm font-light'>Suggestions for you</h3>
        <button className='text-gray-600 font-medium'>See All</button>
      </div>
      {suggestions.map((suggestion) => (
        <div
          key={suggestion.id}
          className='flex items-center justify-between mt-3'
        >
          <img
            className='w-10 h-10 rounded-full border p-[2px]'
            src={suggestion.img}
            alt={suggestion.username}
          />
          <div className='flex-1 ml-4'>
            <h2 className='font-semibold text-sm'>{suggestion.username}</h2>
            <h3 className='text-xs text-gray-400'>
              Works at {suggestion.company}
            </h3>
          </div>
          <button className='text-blue-400 text-xs font-bold'>Follow</button>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
