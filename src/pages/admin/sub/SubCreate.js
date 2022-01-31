import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { getCategories } from '../../../functions/category'
import { createSub, removeSub, getSubs } from '../../../functions/sub'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'

const SubCreate = () => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [subs, setSubs] = useState([])
  // step1
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    loadCategories()
    loadSubs()
  }, [])

  const loadCategories = () =>
    getCategories().then((res) => {
      return setCategories(res.data)
    })
  const loadSubs = () =>
    getSubs().then((res) => {
      return setSubs(res.data)
    })
  const { user } = useSelector((state) => ({ ...state }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false)
        loadSubs()
        setName('')

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
      removeSub(slug, user.token)
        .then(() => {
          setLoading(false)
          loadSubs()
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
          {loading ? <h4> Loading...</h4> : <h4> Create Sub Category</h4>}
          <div className='form-group'>
            <label htmlFor='category'>Parent Category</label>
            <select
              name='category'
              id=''
              className='form-control'
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <>
                    <option value={c._id} key={c._id}>
                      {c.name}
                    </option>
                  </>
                ))}
            </select>
          </div>
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          {/* step 2 */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {subs.filter(searched(keyword)).map((s) => {
            return (
              <div className='alert alert-secondary' key={s._id}>
                {s.name}
                <span className='btn btn-sm float-right'>
                  <DeleteOutlined
                    onClick={() => handleRemove(s.slug)}
                    className='text-danger'
                  />
                </span>
                <Link to={`/admin/sub/${s.slug}`}>
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

export default SubCreate
