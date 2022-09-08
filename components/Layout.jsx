//# This is the body of every page

import React from 'react'
import Head from 'next/head'                    //? NextJs version of <head> element
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className='layout'>
      <Head>
        <title>Wave Gear</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className='main-container'>
        {children}
      </main>
      <footer>
          <Footer />
      </footer>
    </div>
  )
}

export default Layout