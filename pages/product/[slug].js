//# dynamic product page

import React, { useState } from 'react'
import {urlFor, client } from '../../lib/client'                                            //? Sanity CMS
import { useStateContext } from '../../context/StateContext'                                //? State/context
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { Product } from '../../components'

const ProductDetails = (props) => {
    
    //@ destructure data from props provided by getStaticProps
    const { productData, productsData } = props

    //@ destructure current product data 
    const { image, name, details, price } = productData;

    const [index, setIndex] = useState(0);

    //@ destructure functions from stateContext
    const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext()

    //@ for Buy Now button 
    const handleBuyNow = () => {
        onAdd(productData, qty);

        setShowCart(true)
    }

  return (
    <div>
        {/* //# Current product details section */}
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img 
                        src={urlFor(image && image[index])} 
                        className='product-detail-image'
                    />
                </div>
                <div className='small-images-container'>
                    {image?.map((item, i) => (
                        <img 
                            key={i} 
                            src={urlFor(item)} 
                            className={i === index ? 'small-image selected-image' : 'small-image'} 
                            onMouseEnter={() => setIndex(i)}
                        />
                    ))}
                </div>
            </div>

            <div className='product-detail-desc'>
                <h1>{name}</h1>
                <div className='reviews'>
                    <div>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiOutlineStar />
                    </div>
                    <p>
                        (20)
                    </p>               
                </div>
                <h4>Details: </h4>
                <p>{details}</p>
                <p className='price'>${price}</p>
                <div className='quantity'>
                    <h3>Quantity: </h3>
                    <p className='quantity-desc'>
                        <span className='minus' onClick={decQty}><AiOutlineMinus /></span>
                        <span className='num'>{qty}</span>
                        <span className='plus' onClick={incQty}><AiOutlinePlus /></span>
                    </p>
                </div>
                <div className='buttons'>
                    <button type='button' className='add-to-cart' onClick={() => onAdd(productData, qty)}>Add to Cart</button>
                    <button type='button' className='buy-now' onClick={handleBuyNow}>Buy Now</button>
                </div>
            </div>
        </div>

        {/* //# Related products section  */}
        <div className='maylike-products-wrapper'>
            <h2>You may also like</h2>
            <div className='marquee'>
                <div className='maylike-products-container track'>
                    {productsData.map((item) => (
                        <Product key={item.id} product={item} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails


//# define list of paths nextjs has to generate
export const getStaticPaths = async () => {

    //@ to get the list of product names from sanity cms based on current product page name
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }
    `;
    
    //@ collect product names in an array 
    const products = await client.fetch(query);

    //@ generate paths for each product name
    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }))

    //@ return generated paths
    return {
        paths,
        fallback: 'blocking',
    }
}

//# fetch data to pre-render or render the page at built time 

export const getStaticProps = async ({ params: { slug }}) => {                             //? params gets product name from current page url 

    //@ query for current product data
    const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;          //! dont forget double quotes ("")
    
    //@ query for all products data for related products section
    const productsQuery = '*[_type == "product"]'

    //@ fetch respective data from above queries
    const productData = await client.fetch(productQuery);
    const productsData = await client.fetch(productsQuery);

    // console.log('product data', productData)
  
    //! must return above fetched data via props
    return {
      props: { productData, productsData },
    }
}

