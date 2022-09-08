import Link from 'next/link'                        //? to navigate across routes/pages 
import React from 'react'
import { urlFor } from '../lib/client'              //? to fetch images from sanity DB
import { motion } from 'framer-motion'
import { moveFromLeft, moveFromRight, btnVariants } from '../lib/framerVariants'

const HeroBanner = ({ heroBanner}) => {
  return (
    <div  className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <motion.img 
          variants={moveFromRight} initial='hidden' animate='visible' whileHover='hover'
          src={urlFor(heroBanner.image)} alt="headphones" 
          className='hero-banner-image' 
        />

        <motion.div variants={moveFromLeft} initial='hidden' animate='visible'>
          <Link href={`/product/${heroBanner.product}`}>
            <motion.button variants={btnVariants} whileHover='hover' whileTap='click' type='button'>{heroBanner.buttonText}</motion.button>
          </Link>
          <div className='desc'>
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HeroBanner