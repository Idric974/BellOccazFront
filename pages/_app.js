import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Société Bell Occaz</title>
        <meta name="description" content="Cotation de véhicule" />
        <link rel="icon" href="/bellOccaz.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
