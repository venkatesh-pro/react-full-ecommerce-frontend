import React from 'react'
import { Select } from 'antd'

const { Option } = Select

const ProductUpdateForm = ({
  handleChange,
  handleSubmit,
  values,
  handleCategoryChange,
  subOptions,
  showSub,
  setValues,
  categories,
  arrayOfSubs,
  setArrayOfSubs,
  selectedCategory,
}) => {
  const {
    title,
    description,
    price,
    category,
    subs,
    shipping,
    quantity,
    images,
    color,
    brand,
    colors,
    brands,
  } = values
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            className='form-control'
            name='title'
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            className='form-control'
            name='description'
            value={description}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='price'>Price</label>
          <input
            type='number'
            className='form-control'
            name='price'
            value={price}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='shipping'>Shipping</label>
          <select
            name='shipping'
            value={shipping === 'Yes' ? 'Yes' : 'No'}
            className='form-control'
            onChange={handleChange}
          >
            <option value='No'>No</option>
            <option value='Yes'>Yes</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='quantity'>Quantity</label>
          <input
            type='number'
            className='form-control'
            name='quantity'
            value={quantity}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='color'>Color</label>
          <select
            name='color'
            className='form-control'
            value={color}
            onChange={handleChange}
          >
            {colors.map((c) => (
              <option value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='brand'>Brand</label>
          <select
            name='brand'
            className='form-control'
            value={color}
            onChange={handleChange}
          >
            {brands.map((b) => (
              <option value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='category'>Category</label>
          <select
            name='category'
            id=''
            className='form-control'
            onChange={handleCategoryChange}
            value={selectedCategory ? selectedCategory : category._id}
          >
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
        <div className='form-group'>
          <label>Sub Category</label>
          {JSON.stringify(arrayOfSubs)}
          <Select
            mode='multiple'
            style={{ width: '100%' }}
            placeholder='Please Select'
            value={arrayOfSubs}
            onChange={(value) => setArrayOfSubs(value)}
          >
            {subOptions.length > 0 &&
              subOptions.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default ProductUpdateForm
