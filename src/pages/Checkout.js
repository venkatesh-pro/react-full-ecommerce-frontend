import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  applyCoupon,
  emptyUserCart,
  getUserCart,
  saveUserAddress,
} from '../functions/user'
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // ES6

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [address, setAddress] = useState('')
  const [addressSaved, setAddressSaved] = useState(false)
  const [coupon, setCoupon] = useState('')
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
  const [discountError, setDiscountError] = useState('')

  const { user } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()

  useEffect(() => {
    getUserCart(user && user.token).then((res) => {
      setProducts(res.data.products)
      setTotal(res.data.cartTotal)
    })
  }, [user])

  const emptyCart = () => {
    // remove from localstorage
    console.log('gifdfd')
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart')
    }
    // remove from redux
    dispatch({ type: 'ADD_TO_CART', payload: [] })
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([])
      setTotal(0)
      setTotalAfterDiscount(0)
      setCoupon('')
      toast.success('cart is empty, Continue shopping')
    })
  }

  const saveAddressToDb = (e) => {
    saveUserAddress(user.token, address).then((res) => {
      setAddressSaved(res.data.ok)
    })
  }

  const showAddress = () => {
    return (
      <>
        <ReactQuill theme='snow' value={address} onChange={setAddress} />
        <button className='btn btn-primary mt-2' onClick={saveAddressToDb}>
          Save
        </button>
      </>
    )
  }
  const showProductSummary = () => {
    return products.map((p, i) => {
      return (
        <div key={i}>
          <p>
            {p.product.title} ({p.color}) x {p.count} ={' '}
            {p.product.price * p.count}
          </p>
        </div>
      )
    })
  }

  const applyDiscountCoupon = () => {
    console.log('banckf', coupon)
    applyCoupon(user.token, coupon).then((res) => {
      console.log('RES on coupon applied', res.data)
      if (res.data.success) {
        setTotalAfterDiscount(res.data.success)
        // push the totalAfterDiscount to redux
        dispatch({
          type: 'COUPON_APPLIED',
          payload: true,
        })
        toast.success('Applied')
      }
      if (res.data.err) {
        dispatch({
          type: 'COUPON_APPLIED',
          payload: false,
        })
        setDiscountError(res.data.err)
      }
    })
  }

  const showApplyCoupon = () => {
    return (
      <>
        <input
          type='text'
          value={coupon}
          onChange={(e) => {
            setCoupon(e.target.value)
            setDiscountError('')
          }}
          className='form-control'
        />
        <button className='btn btn-primary mt-2' onClick={applyDiscountCoupon}>
          Apply
        </button>
      </>
    )
  }
  return (
    <div className='row'>
      <div className='col-md-6'>
        <h4>Delivery Address</h4>
        <br />
        <br />
        {showAddress()}
        <hr />
        <h4>Got coupon?</h4>
        <br />
        <br />
        {showApplyCoupon()}
        {discountError && <p className='bg-danger p-3'>{discountError}</p>}
      </div>
      <div className='col-md-6'>
        <h4>Order Summary</h4>
        <hr />
        <p>Products :{products.length}</p>
        <hr />
        {showProductSummary()}
        <br />

        <hr />
        <p>Cart Total :${total} </p>
        {totalAfterDiscount > 0 && (
          <p className='bg-success p-3'>$ {totalAfterDiscount} </p>
        )}
        <div className='row'>
          <div className='col-md-6'>
            <button
              className='btn btn-primary'
              disabled={!addressSaved || !products.length}
              onClick={() => history.push('/payment')}
            >
              Place Order
            </button>
          </div>
          <div className='col-md-6'>
            <button
              disabled={!products.length}
              className='btn btn-primary'
              onClick={emptyCart}
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
