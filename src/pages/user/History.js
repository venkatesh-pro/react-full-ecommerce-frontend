import React, { useEffect, useState } from 'react'
import UserNav from '../../components/nav/UserNav'
import { useSelector } from 'react-redux'
import { getUserOrders } from '../../functions/user'
import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

const History = () => {
  const [orders, setOrders] = useState([])

  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    loadUserOrders()
  }, [])
  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      setOrders(res.data)
    })

  const showOrderTable = (order) => {
    return (
      <table className='table table-bordered'>
        <thead className='thead-light'>
          <tr>
            <th scope='col'>Title</th>
            <th scope='col'>Price</th>
            <th scope='col'>Brand</th>
            <th scope='col'>Color</th>
            <th scope='col'>Count</th>
            <th scope='col'>Shipping</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((p, i) => {
            return (
              <tr key={i}>
                <td>
                  <b>{p.product.title}</b>
                </td>
                <td>{p.product.price}</td>
                <td>{p.product.brand}</td>
                <td>{p.product.color}</td>
                <td>{p.count}</td>
                <td>
                  {p.product.shipping === 'Yes' ? (
                    <CheckCircleOutlined style={{ color: 'green' }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: 'red' }} />
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  const showDownloadLink = (order) => {
    return (
      <>
        <p>Download pdf</p>
      </>
    )
  }
  const showEachOrders = () => {
    return orders.map((order, i) => {
      return (
        <div key={i} className='m-5 p-3 card'>
          <ShowPaymentInfo order={order} />
          {showOrderTable(order)}
          <div className='row'>
            <div className='col'>{showDownloadLink(order)}</div>
          </div>
        </div>
      )
    })
  }
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 '>
          <UserNav />
        </div>
        <div className='col text-center'>
          <h4>
            {orders.length > 0 ? 'User purchase orders' : 'No purchase orders'}
          </h4>
          {showEachOrders()}
          {/* <pre>{JSON.stringify(orders, null, 4)}</pre> */}
        </div>
      </div>
    </div>
  )
}

export default History
