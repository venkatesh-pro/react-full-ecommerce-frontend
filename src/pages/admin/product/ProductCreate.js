import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { createProduct } from '../../../functions/product'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import { getCategories, getCategorySubs } from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'
const initialState = {
  title: 'Macbook Pro',
  description: 'This is the best Apple product',
  price: '45000',
  categories: [],
  category: '',
  subs: [],
  shipping: 'Yes',
  quantity: '50',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
  color: 'White',
  brand: 'Apple',
}

const ProductCreate = () => {
  const [values, setValues] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [subOptions, setSubOptions] = useState([])
  const [showSub, setShowSub] = useState(false)

  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = () =>
    getCategories().then((res) => {
      return setValues({ ...values, categories: res.data })
    })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    createProduct(values, user.token)
      .then((res) => {
        setLoading(false)
        window.alert(`${res.data.title} is created`)
        console.log(res.data)
        window.location.reload()
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
        toast.error(err.response.data.err)
      })
  }
  const handleChange = (e) => {
    console.log(e)
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  //   why we didnt use handleChange , because when we after select the category only we need to fetch the sub , so creating a function is easy
  const handleCategoryChange = (e) => {
    setValues({ ...values, subs: [], category: e.target.value })
    console.log(e.target.value)
    getCategorySubs(e.target.value)
      .then((res) => {
        console.log(res.data)
        setSubOptions(res.data)
      })
      .catch((err) => {
        toast.error(err.message)
        console.log(err)
      })
    setShowSub(true)
  }
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 '>
          <AdminNav />
        </div>
        <div className='col'>
          {loading ? (
            <LoadingOutlined className='text-danger h1' />
          ) : (
            <h4>Product create</h4>
          )}
          <div className='p-3'>
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
            setValues={setValues}
          />
          <pre>{JSON.stringify(values, null, 4)}</pre>
        </div>
      </div>
    </div>
  )
}

export default ProductCreate
