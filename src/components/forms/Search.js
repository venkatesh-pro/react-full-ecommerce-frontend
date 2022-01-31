import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
const Search = () => {
  const dispatch = useDispatch()

  const { search } = useSelector((state) => ({ ...state }))
  const { text } = search
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()

    history.push(`/shop/?${text}`)
  }

  const handleChange = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: e.target.value },
    })
  }
  return (
    <form className='form-inline my-2 my-lg-0' onSubmit={handleSubmit}>
      <input
        type='search'
        value={text}
        className='form-control mr-sm-2'
        placeholder='Search'
        onChange={handleChange}
      />
      <SearchOutlined onClick={handleSubmit} style={{ cursor: 'pointer' }} />
    </form>
  )
}

export default Search
