import { DeleteOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import UserNav from '../../components/nav/UserNav'
import { getWishlist, removeWishlist } from '../../functions/user'

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([])
  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    loadWishlist()
  }, [])
  const loadWishlist = () => {
    getWishlist(user.token).then((res) => {
      setWishlist(res.data.wishlist)
    })
  }

  const handleRemove = (productId) => {
    return removeWishlist(productId, user.token).then((res) => {
      toast.success('deleted')
      loadWishlist()
    })
  }
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 '>
          <UserNav />
        </div>
        <div className='col'>
          <h2>wishlist page</h2>
          {wishlist.map((p) => {
            return (
              <div key={p._id} className='alert alert-secondary'>
                <Link to={`/product/${p.slug}`}>{p.title}</Link>
                <span
                  className='btn btn-sm float-right'
                  onClick={() => handleRemove(p._id)}
                >
                  <DeleteOutlined className='text-danger' />
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Wishlist
