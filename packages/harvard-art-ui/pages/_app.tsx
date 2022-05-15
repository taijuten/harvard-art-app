import { AppProps } from 'next/app'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css'

function AppWrapper({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Harvard-art-ui</title>
      </Head>
      <main className='app'>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default AppWrapper
