import React, { useEffect, useState } from 'react'
import AdminProductCard from '../../components/cards/AdminProductCard'
import AdminNav from '../../components/nav/AdminNav'
import Orders from '../../components/order/orders'
import { getProductsByCount } from '../../functions/product'
import { useSelector } from 'react-redux'
import { changeStatus, getOrders } from '../../functions/admin'
import { toast } from 'react-toastify'

const AdminDashboard = () => {
  const [orders, setOrders] = useState([])

  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = () => {
    getOrders(user.token).then((res) => {
      setOrders(res.data)
    })
  }

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success('Status updated')
      loadOrders()
    })
  }
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 '>
          <AdminNav />
        </div>

        <div className='col-md-10'>
          <h4>Admin Dashboard</h4>
          <Orders orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
