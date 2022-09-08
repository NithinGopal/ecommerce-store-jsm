import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'              //? gets the images from sanity db
import { motion } from 'framer-motion'
import { moveFromLeft, moveFromRight, btnVariants } from '../lib/framerVariants'

const FooterBanner = ({ 
  footerBanner: { 
    discount, largeText1, largeText2, saleTime, 
    smallText, midText, product, buttonText, image, desc
} }) => {
  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <motion.div variants={moveFromLeft} initial='hidden' animate='visible' className='left'>
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </motion.div>
        <motion.div variants={moveFromLeft} initial='hidden' animate='visible' className='right'>
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type='button'>{buttonText}</button>
          </Link>
        </motion.div>

        <motion.img 
          variants={moveFromRight} whileHover='hover' 
          src={urlFor(image)} alt={product} 
          className='footer-banner-image' 
        />
      </div>
    </div>
  )
}

export default FooterBanner