import React, { useState } from 'react'
import ModalImage from 'react-modal-image'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import defaultImage from '../../images/default.jfif'

const ProductCartInCheckout = ({ product }) => {
  const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue']
  const dispatch = useDispatch()

  const handleColorChange = (e) => {
    let cart = []

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      cart.map((p, i) => {
        if (p._id === product._id) {
          console.log(i)
          cart[i].color = e.target.value
        }
      })

      localStorage.setItem('cart', JSON.stringify(cart))
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      })
    }
  }

  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value

    if (count > product.quantity) {
      // count = product.quantity
      toast.error(`Max available quantity: ${product.quantity}`)
      return
    }
    let cart = []

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      cart.map((p, i) => {
        if (p._id === product._id) {
          console.log(i)
          cart[i].count = count
        }
      })

      localStorage.setItem('cart', JSON.stringify(cart))
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      })
    }
  }

  const handleRemove = () => {
    let cart = []

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      cart.map((p, i) => {
        if (p._id === product._id) {
          cart.splice(i, 1)
        }
      })

      localStorage.setItem('cart', JSON.stringify(cart))
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      })
    }
  }
  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: '100px', height: 'auto' }}>
            {product.images.length ? (
              <ModalImage
                small={product.images[0].url}
                large={product.images[0].url}
              />
            ) : (
              <ModalImage small={defaultImage} large={defaultImage} />
            )}
          </div>
        </td>
        <td>{product.title}</td>
        <td>{product.price}</td>
        <td>{product.brand}</td>
        <td>
          {console.log(product.color)}
          <select
            name='color'
            className='form-control'
            onChange={handleColorChange}
          >
            {product.color ? (
              <option value={product.color}>{product.color}</option>
            ) : (
              <option>Select</option>
            )}
            {colors
              .filter((c) => c !== product.color)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td className='text-center'>
          <input
            type='number'
            name=''
            id=''
            className='form-control'
            value={product.count}
            onChange={handleQuantityChange}
          />
        </td>
        <td>
          {product.shipping === 'Yes' ? (
            <>
              <CheckCircleOutlined className='text-success' />
              Yes
            </>
          ) : (
            <>
              <CloseCircleOutlined className='text-danger' />
              No
            </>
          )}
        </td>
        <td>
          <CloseOutlined onClick={handleRemove} />
        </td>
      </tr>
    </tbody>
  )
}

export default ProductCartInCheckout
