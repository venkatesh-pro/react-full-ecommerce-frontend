import React from 'react'

const ShowPaymentInfo = ({ order, showStatus = true }) => {
  return (
    <div>
      <p>
        <span>Order Id :{order.paymentIntent.order_id}</span>
        <br />
        <span>
          Amount :{' '}
          {order.paymentIntent.order_amount.toLocaleString('inr', {
            style: 'currency',
            currency: 'inr',
          })}
        </span>{' '}
        <br />
        <span>
          Payment : {order.paymentIntent.order_status.toUpperCase()}
        </span>{' '}
        <br />
        <span>
          Ordered On :{' '}
          {new Date(order.paymentIntent.created_at).toLocaleString()}
        </span>{' '}
        <br />
        {showStatus && (
          <span className='badge bg-primary text-white'>
            Status : {order.orderStatus}
          </span>
        )}
      </p>
    </div>
  )
}

export default ShowPaymentInfo
