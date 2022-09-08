import React from 'react';
import { StateContext } from '../context/StateContext';
import { Layout } from '../components';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        {/* //# toast notifications */}
        <Toaster />

        {/* //# everything between navbar and footer  */}
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp
