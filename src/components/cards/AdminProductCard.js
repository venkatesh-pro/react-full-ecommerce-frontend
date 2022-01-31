import React from 'react'
import { Card } from 'antd'
import defaultImage from '../../images/default.jfif'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { removeProduct } from '../../functions/product'
import { Link } from 'react-router-dom'
const { Meta } = Card

const AdminProductCard = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product
  console.log()
  return (
    <Card
      style={{ width: '250px', objectFit: 'cover' }}
      className='p-1'
      cover={
        <img
          src={
            images && images.length ? images[0] && images[0].url : defaultImage
          }
        ></img>
      }
      actions={[
        <Link to={`/admin/products/${slug}`}>
          <EditOutlined className='text-warning' />
        </Link>,
        <DeleteOutlined
          className='text-danger'
          onClick={() => handleRemove(slug)}
        />,
      ]}
    >
      <Meta
        title={product.title}
        description={`${description && description.substring(0, 30)}...`}
      ></Meta>
    </Card>
  )
}

export default AdminProductCard
