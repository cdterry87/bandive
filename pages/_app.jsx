import '@styles/globals.css'
import Head from 'next/head'

function Application({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Bandive</title>
        <meta
          property='og:title'
          content='Find recommendations based on your favorite artists with Bandive! By Chase Terry'
          key='title'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default Application
