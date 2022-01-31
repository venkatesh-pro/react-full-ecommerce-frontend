import axios from 'axios'

export const userCart = async (cart, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )
}

export const getUserCart = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken: authtoken,
    },
  })
}

export const emptyUserCart = async (authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/user/cart`,
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )
}

export const saveUserAddress = async (authtoken, address) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )
}

export const applyCoupon = async (authtoken, coupon) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )
}

export const getUserOrders = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: {
      authtoken: authtoken,
    },
  })
}

// wishlist

export const getWishlist = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
    headers: {
      authtoken: authtoken,
    },
  })
}

export const removeWishlist = async (productId, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )
}

export const addToWishlist = async (productId, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )
}

// this route in stripe.js ,don't search in user.js
export const createCashOrderForUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/cash-order`,
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )
}
