import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../../functions/category'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'

const CategoryCreate = () => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  // step1
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = () =>
    getCategories().then((res) => {
      return setCategories(res.data)
    })

  const { user } = useSelector((state) => ({ ...state }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false)
        setName('')
        loadCategories()
        toast.success(`"${res.data.name}" is created`)
      })
      .catch((error) => {
        setLoading(false)

        if (error.response.status == 400) {
          toast.error(error.response.data)
        } else {
          console.log(error)
          toast.error(error.message)
        }
      })
  }
  const handleRemove = (slug) => {
    if (window.confirm('Delete ? ')) {
      setLoading(true)
      removeCategory(slug, user.token)
        .then(() => {
          setLoading(false)
          loadCategories()
          toast.success('deleted')
        })
        .catch((err) => {
          setLoading(false)
          if ((err.response.state = 400)) {
            toast.error(err.response.data)
          } else {
            console.log(err)
            toast.error(err.message)
          }
        })
    }
  }

  // step 3
  const searched = (keyword) => {
    console.log('keyword', keyword)
    return (c) => {
      return c.name.includes(keyword)
    }
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 '>
          <AdminNav />
        </div>
        <div className='col'>
          {loading ? <h4> Loading...</h4> : <h4> Create Category</h4>}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          {/* step 2 */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          {/* just for filter reference */}
          {/* {[].filter((i) => i == 'v')} */}
          {categories.filter(searched(keyword)).map((c) => {
            return (
              <div className='alert alert-secondary' key={c._id}>
                {c.name}
                <span className='btn btn-sm float-right'>
                  <DeleteOutlined
                    onClick={() => handleRemove(c.slug)}
                    className='text-danger'
                  />
                </span>
                <Link to={`/admin/category/${c.slug}`}>
                  <span className='btn btn-sm float-right'>
                    <EditOutlined className='text-warning' />
                  </span>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CategoryCreate
