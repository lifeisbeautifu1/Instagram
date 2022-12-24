import type { NextPage } from 'next';

import { Header, Feed, Modal } from '../components';

const Home: NextPage = () => {
  return (
    <div className='bg-gray-50 h-screen overflow-y-scroll'>
      <Header />
      <Feed />
      <Modal />
    </div>
  );
};

export default Home;
