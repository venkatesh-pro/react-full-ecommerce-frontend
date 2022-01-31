import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { updateCategory, getCategory } from '../../../functions/category'
import { useSelector } from 'react-redux'
import CategoryForm from '../../../components/forms/CategoryForm'

const CategoryUpdate = ({ history, match }) => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    loadCategory()
  }, [])
  const loadCategory = () => {
    getCategory(match.params.slug).then((c) => {
      console.log('fuck', c.data)
      setName(c.data.category.name)
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    updateCategory(match.params.slug, { name }, user.token)
      .then(() => {
        setLoading(false)
        toast.success('Updated')
        history.push('/admin/category')
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 '>
          <AdminNav />
        </div>
        <div className='col'>
          {loading ? <h4> Loading...</h4> : <h4> Update Category</h4>}
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

export default CategoryUpdate
