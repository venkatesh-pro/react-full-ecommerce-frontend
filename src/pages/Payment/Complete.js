import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkPaymentComplete } from '../../functions/stripe'
import { emptyUserCart } from '../../functions/user'

const Complete = ({ history }) => {
  const [ok, setOk] = useState(false)
  const [loading, setLoading] = useState(false)

  const { user, coupon } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()
  useEffect(() => {
    setLoading(true)
    checkPaymentComplete(
      user.token,
      history.location.search.split('=')[1].split('&')[0]
    ).then((res) => {
      console.log(res.data)
      setLoading(false)

      setOk(res.data.ok)

      if (res.data.ok) {
        // empty the cart from localstorage
        if (typeof window !== 'undefined') localStorage.removeItem('cart')
        dispatch({
          type: 'ADD_TO_CART',
          payload: [],
        })
        dispatch({
          type: 'COUPON_APPLIED',
          payload: false,
        })
        // remove saved cart from database
        emptyUserCart(user.token)
        window.alert('Payment Success')
        history.push('/user/history')
      }
    })
  }, [history])
  return (
    <div>
      {loading ? (
        <h4>Loading</h4>
      ) : (
        <div>{ok ? <p>Payment Successfull</p> : <p>Payment Fail</p>}</div>
      )}
    </div>
  )
}

export default Complete
