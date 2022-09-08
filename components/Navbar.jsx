import React from 'react'
import Link from 'next/link'
import { Cart } from './';
import { useStateContext } from '../context/StateContext';
import { AiOutlineShopping } from 'react-icons/ai'
import { BsSoundwave } from 'react-icons/bs'
import { motion } from 'framer-motion'
import { navVariants } from '../lib/framerVariants';
import { logoVariants } from '../lib/framerVariants';

// const navVariants ={
//   hidden: {
//       y: '-100vw',
//       opacity: 0,
//   },
//   visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//           duration: 5,
//       }
//   },
// }

const Navbar = () => {
  // @ destructure states from state context
  const { showCart, setShowCart, totalQuantities } = useStateContext()

  return (
    <motion.div 
      className='navbar-container' 
      variants={navVariants} 
      initial='hidden' 
      animate='visible'
    >
      <p className='logo'>
        <motion.i variants={logoVariants} whileHover='hover' ><BsSoundwave size={32} /></motion.i>
        <Link href='/'>Wave Gear</Link>
      </p>

      <button type='button' className='cart-icon' onClick={() => setShowCart(!showCart)}>
        <motion.i variants={navVariants} whileHover='hover'><AiOutlineShopping /></motion.i>
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      {/* //@ open cart when showCart state is true */}
      {showCart && <Cart />}
    </motion.div>
  )
}

export default Navbar