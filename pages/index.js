//# This is the homepage

import React from 'react'
import { client } from '../lib/client'                      //? connect sanity to the site 
import { Product, Footer, Cart, HeroBanner, Layout, Navbar, FooterBanner } from '../components'

const Home = (props) => {

  //# destructure props from getServerSideProps below
  const { productData, bannerData } = props;

  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      {/* {console.log('bannerData', bannerData)} */}

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>

        <div className='products-container'>
          {
            productData.map((product) => <Product key={product._id} product={product} />)
          }
        </div>        
      </div>

      {/* //# Footer banner is the element above the footer component  */}
      <FooterBanner footerBanner={bannerData.length && bannerData[0]} />
    </>
  )
}

export default Home

//# to fetch and render the page on request to the sanity db

export const getServerSideProps = async () => {
  //# to query data with name: product in the schema
  const productQuery = '*[_type == "product"]';          //! dont forget double quotes ("")
  //# to fetch the product data from above query
  const productData = await client.fetch(productQuery);

  //# to query data with name: banner in the schema
  const bannerQuery = '*[_type == "banner"]';
  //# to fetch the banner data from above query
  const bannerData = await client.fetch(bannerQuery);

  //$ mandatory to return above fetched data via props object
  return {
    props: { productData, bannerData },
  }
}