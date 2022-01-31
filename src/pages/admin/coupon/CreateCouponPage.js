import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from '../../../functions/coupon'
import 'react-datepicker/dist/react-datepicker.css'
import AdminNav from '../../../components/nav/AdminNav'
import { DeleteOutlined } from '@ant-design/icons'

const CreateCouponPage = () => {
  const [name, setName] = useState('')
  const [expiry, setExpiry] = useState(new Date())
  const [discount, setDiscount] = useState('')
  const [loading, setLoading] = useState('')
  const [coupons, setCoupons] = useState([])

  const { user } = useSelector((state) => ({ ...state }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false)
        setName('')
        setDiscount('')
        setExpiry('')
        toast.success(`${res.data.name} is created`)
        loadAllCoupons()
      })
      .catch((err) => {
        console.log('create coupon error')
      })
  }

  useEffect(() => {
    setLoading(true)
    loadAllCoupons()
  }, [])
  const loadAllCoupons = () =>
    getCoupons().then((res) => {
      setLoading(false)
      setCoupons(res.data)
    })
 
    const handleRemove = (couponId) => {
    if (window.confirm('Delte?')) {
      setLoading(true)
      removeCoupon(couponId, user.token)
        .then((res) => {
          setLoading(false)
          loadAllCoupons()
          toast.error(`Coupon${res.data.name} deleted`)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          {loading ? <h4 className='text-danger'>Loading</h4> : <h4>Coupon</h4>}

          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='' className='text-muted'>
                Name
              </label>
              <input
                type='text'
                className='form-control'
                autoFocus
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='' className='text-muted'>
                Discount %
              </label>
              <input
                type='text'
                className='form-control'
                autoFocus
                required
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='' className='text-muted'>
                Expiry
              </label>
              <DatePicker
                className='form-control'
                selected={expiry}
                required
                onChange={(date) => setExpiry(date)}
              />
            </div>
            <button className='btn btn-primary'>Save</button>
          </form>
          <br />
          <h4>{coupons.length} Coupons</h4>

          <table className='table table-bordered'>
            <thead className='thead-light'>
              <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Expiry</th>
                <th scope='col'>Discount</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => {
                return (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>
                      {new Date(c.expiry).toLocaleDateString()}
                      <br />({new Date(c.expiry).toLocaleTimeString()})
                    </td>
                    <td>{c.discount}</td>
                    <td>
                      <DeleteOutlined
                        className='text-danger'
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleRemove(c._id)}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CreateCouponPage
