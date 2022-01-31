import React from 'react'

const CategoryForm = ({ handleSubmit, name, setName }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor=''>Name</label>
        <input
          type='text'
          className='form-control'
          placeholder='Enter the category name'
          value={name}
          autoFocus
          required
          onChange={(e) => setName(e.target.value)}
        />
        <button className='btn btn-primary'> Save</button>
      </div>
    </form>
  )
}

export default CategoryForm
