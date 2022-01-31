import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { getCategories } from '../../../functions/category'
import { getSub, updateSub } from '../../../functions/sub'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'

const SubCreate = ({ history, match }) => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [parent, setParent] = useState('')

  useEffect(() => {
    loadCategories()
    loadSub()
  }, [])

  const loadCategories = () =>
    getCategories().then((res) => {
      return setCategories(res.data)
    })
  const loadSub = () =>
    getSub(match.params.slug).then((res) => {
      setName(res.data.sub.name)
      setParent(res.data.sub.parent)
    })
  const { user } = useSelector((state) => ({ ...state }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    updateSub(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        setLoading(false)
        setName('')
        toast.success(`"${res.data.name}" is updated`)
        history.push('/admin/sub')
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

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 '>
          <AdminNav />
        </div>
        <div className='col'>
          {loading ? <h4> Loading...</h4> : <h4> Update Sub Category</h4>}
          <div className='form-group'>
            <label htmlFor='category'>Parent Category</label>
            <select
              name='category'
              id=''
              className='form-control'
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <>
                    <option
                      value={c._id}
                      key={c._id}
                      selected={c._id === parent}
                    >
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
        </div>
      </div>
    </div>
  )
}

export default SubCreate
