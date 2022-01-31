import React, { useState } from 'react'
import { Card, Tabs, Tooltip } from 'antd'
import {
  HeartOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import defaultImage from '../../images/default.jfif'
import ProductListItems from './ProductListItems'
import StarRating from 'react-star-ratings'
import RatingModal from '../Modal/RatingModal'
import { showAverage } from '../../functions/rating'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { addToWishlist } from '../../functions/user'
import { toast } from 'react-toastify'
const { TabPane } = Tabs

const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description, _id } = product
  const [tooltip, setTooltip] = useState('Click to add')

  const dispatch = useDispatch()
  const history = useHistory()

  const { user } = useSelector((state) => ({ ...state }))

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

  const handleAddToWishlist = (e) => {
    e.preventDefault()

    addToWishlist(product._id, user.token).then((res) => {
      toast.success('Added to wishlist')
      history.push('/user/wishlist')
    })
  }

  return (
    <>
      <div className='col-md-7'>
        {console.log(images)}
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((i) => <img src={i.url} key={i.public_id} alt='' />)}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                src={defaultImage}
                alt='default image'
                className='col-md-5'
              />
            }
          ></Card>
        )}
        <Tabs type='card'>
          <TabPane tab='Description' key='1'>
            {description && description}
          </TabPane>
          <TabPane tab='More' key='2'>
            Call us on xxxx xxx xxx to learn about this product
          </TabPane>
        </Tabs>
      </div>
      <div className='col-md-5'>
        <h1 className='bg-info p-3'>{title}</h1>
        {product && product.ratings && product.ratings.length > 0
          ? showAverage(product)
          : 'No rating yet'}
        <Card
          actions={[
            <>
              <Tooltip title={tooltip}>
                <a onClick={handleAddToCart}>
                  <ShoppingCartOutlined className='text-warning' /> <br /> Add
                  to Cart
                </a>
              </Tooltip>
            </>,
            <>
              {user ? (
                <a onClick={handleAddToWishlist}>
                  <HeartOutlined className='text-info' /> <br />
                  Add to Whislist
                </a>
              ) : (
                <>
                  <Link to='/login'>
                    <LoginOutlined />
                    <br />
                    Login to add item in wishlist
                  </Link>
                </>
              )}
            </>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor='red'
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  )
}

export default SingleProduct
