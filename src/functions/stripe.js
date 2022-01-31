import axios from 'axios'

export const createPaymentIntent = async (authtoken, coupon) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    { couponApplied: coupon },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )
}
export const checkPaymentComplete = async (authtoken, orderId) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/check-payment-complete`,
    { orderId },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )
}
