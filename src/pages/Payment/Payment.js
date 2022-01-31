import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { createPaymentIntent } from '../../functions/stripe'
const Payment = ({ history }) => {
  const { user, coupon } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    createPaymentIntent(user.token, coupon).then((res) => {
      console.log('daaa', res.data)
      window.location.assign(res.data)
    })
  }, [])

  return (
    <div className='container p-5 text-center'>
      <h4>complete your purchase</h4>
      <div className='col-md-8 offset-md-2'></div>
    </div>
  )
}

export default Payment
