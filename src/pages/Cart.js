import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProductCartInCheckout from '../components/cards/ProductCartInCheckout'
import { userCart } from '../functions/user'

const Cart = ({ history }) => {
  const { cart, user } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  }
  const saveOrderToDb = () => {
    console.log(cart)
    userCart(cart, user.token)
      .then((res) => {
        console.log('cart post res', res)
        if (res.data.ok) {
          return history.push('/checkout')
        }
      })
      .catch((err) => {
        console.log('Cart error', err)
      })
  }

  const showCartItems = () => {
    return (
      <table className='table table-bordered'>
        <thead className='thead-light'>
          <tr>
            <th className='col'>Image</th>
            <th className='col'>Title</th>
            <th className='col'>Price</th>
            <th className='col'>Brand</th>
            <th className='col'>Color</th>
            <th className='col'>Count</th>
            <th className='col'>Shipping</th>
            <th className='col'>Remove</th>
          </tr>
        </thead>
        {console.log('FJDFJJDF', cart)}
        {cart.map((p) => {
          return <ProductCartInCheckout key={p._id} product={p} />
        })}
      </table>
    )
  }
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-8'>
          <h4>Cart / {cart.length} Products</h4>

          {!cart.length ? (
            <p>
              No products in cart. <Link to='/shop'>Continue Shopping</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className='col-md-4'>
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => {
            return (
              <div key={i}>
                <p>
                  {c.title} x {c.count} = ${c.price * c.count}
                </p>
              </div>
            )
          })}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {user ? (
            <button
              className='btn btn-sm btn-primary mt-2'
              onClick={saveOrderToDb}
              disabled={!cart.length}
            >
              Proceed To Checkout
            </button>
          ) : (
            <button className='btn btn-sm btn-primary mt-2'>
              <Link
                to={{
                  pathname: '/login',
                  state: { from: '/cart' },
                }}
              >
                Login To Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
