import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { Card, Tooltip } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { showAverage } from '../../functions/rating'
import defaultImage from '../../images/default.jfif'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
const { Meta } = Card

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState('Click to add')

  const { images, description, slug, price } = product

  const dispatch = useDispatch()

  const handleAddToCart = () => {
    let cart = []

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      // push new product to cart
      cart.push({ ...product, count: 1 })
      // remove duplicates so we use lodash package
      let unique = _.uniqWith(cart, _.isEqual)

      localStorage.setItem('cart', JSON.stringify(unique))
      dispatch({
        type: 'ADD_TO_CART',
        payload: unique,
      })
      // side drawer
      dispatch({
        type: 'SET_VISIBLE',
        payload: true,
      })
      // show tooltip
      setTooltip('Added')
    }
  }
  return (
    <>
      {product && product.ratings && product.ratings.length > 0
        ? showAverage(product)
        : 'No rating yet'}
      <Card
        style={{ width: '250px', objectFit: 'cover' }}
        className='p-1'
        cover={
          <img
            src={
              images && images.length
                ? images[0] && images[0].url
                : defaultImage
            }
          ></img>
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className='text-warning' />
            <br />
            View Product
          </Link>,
          <>
            <Tooltip title={tooltip}>
              <button
                className='btn btn-outlined'
                onClick={handleAddToCart}
                disabled={product.quantity < 1}
              >
                <ShoppingCartOutlined className='text-warning' /> <br />
                {product.quantity < 1 ? 'Out of stock' : 'Add to Cart'}
              </button>
            </Tooltip>
          </>,
        ]}
      >
        <Meta
          title={`${product.title} - $${price}`}
          description={`${description && description.substring(0, 30)}...`}
        ></Meta>
      </Card>
    </>
  )
}

export default ProductCard
