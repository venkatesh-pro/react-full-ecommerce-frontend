import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import { useSelector } from 'react-redux'
import { StarOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import { useHistory, useParams } from 'react-router-dom'

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }))
  const [modelVisible, setModelVisible] = useState(false)

  const history = useHistory()
  const { slug } = useParams()

  const handleModel = () => {
    if (user && user.token) {
      setModelVisible(true)
    } else {
      setModelVisible(false)
      history.push({
        pathname: '/login',
        state: { from: `/product/${slug}` },
      })
    }
  }
  return (
    <>
      <div onClick={handleModel}>
        <StarOutlined className='text-danger' /> <br />
        {user ? 'Leave rating' : 'Login to Leave Rating'}
      </div>
      <Modal
        title='Leave your Rating'
        centered
        visible={modelVisible}
        onOk={() => {
          setModelVisible(false)
          toast.success('Thanks for your review')
        }}
        onCancel={() => setModelVisible(false)}
      >
        {children}
      </Modal>
    </>
  )
}
export default RatingModal
