import Head from 'next/head';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Instagram</title>
        <link rel='shortcut icon' href='/favicon.png' type='image/x-icon' />
      </Head>
      {children}
    </>
  );
};

export default Layout;
