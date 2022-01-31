import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SingleProduct from '../components/cards/SingleProduct'
import { getProduct, getRelated, productStar } from '../functions/product'
import ProductCard from '../components/cards/ProductCard'
import '../index.css'

const Product = ({ match }) => {
  const [product, setProduct] = useState({})
  const [related, setRelated] = useState([])
  const [star, setStar] = useState(0)

  const { slug } = match.params

  const { user } = useSelector((state) => ({ ...state }))
  useEffect(() => {
    loadSingleProduct()
  }, [slug])
  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data)
      getRelated(res.data._id).then((res) => setRelated(res.data))
    })
  }
  useEffect(() => {
    if (product.ratings && user) {
      const existingRatingObject = product.ratings.find((el) => {
        return el.postedBy.toString() === user._id.toString()
      })
      existingRatingObject && setStar(existingRatingObject.star)
    }
  }, [user, product])
  const onStarClick = (newRating, name) => {
    console.table(newRating, name)
    setStar(newRating)
    productStar(name, newRating, user.token)
      .then((res) => {
        console.log(res.data)
        loadSingleProduct()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className='container-fluid'>
      <div className='row pt-4'>
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
          setStar={setStar}
        />
      </div>
      <div className='row '>
        <div className='col text-center pt-5 pb-5 h4'>
          <hr />
          Related Products
          <hr />
        </div>
      </div>
      <div className='row pb-5'>
        {related.length ? (
          related.map((r) => {
            return (
              <div key={r._id} className='col'>
                <ProductCard product={r} />
              </div>
            )
          })
        ) : (
          <div className='text-center col'>No Product Found</div>
        )}
      </div>
    </div>
  )
}

export default Product
