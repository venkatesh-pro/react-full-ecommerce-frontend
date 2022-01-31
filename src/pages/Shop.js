import React, { useEffect, useState } from 'react'
import ProductCard from '../components/cards/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getCategories } from '../functions/category'
import { getSubs } from '../functions/sub'
import { fetchProductsByFilter, getProductsByCount } from '../functions/product'
import { Menu, Slider, Checkbox, Radio } from 'antd'
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from '@ant-design/icons'
import Star from '../components/forms/Star'
const { SubMenu } = Menu

const Shop = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState([0, 0])
  const [ok, setOk] = useState(false)
  const [categories, setCategories] = useState([])
  const [categoryIds, setCategoryIds] = useState([])
  const [star, setStar] = useState('')
  const [subs, setSubs] = useState([])
  const [sub, setSub] = useState('')
  const [brands, setBrands] = useState([
    'Apple',
    'Samsung',
    'Microsoft',
    'Lenovo',
    'ASUS',
  ])
  const [brand, setBrand] = useState('')
  const [colors, setColors] = useState([
    'Black',
    'Brown',
    'Silver',
    'White',
    'Blue',
  ])
  const [color, setColor] = useState('')
  const [shipping, setShipping] = useState('')

  const { search } = useSelector((state) => ({ ...state }))
  const { text } = search

  const dispatch = useDispatch()

  useEffect(() => {
    loadAllProducts()
    getCategories().then((res) => setCategories(res.data))
    getSubs().then((res) => setSubs(res.data))
  }, [])

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data)
    })
  }

  //   1. load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data)
      setLoading(false)
    })
  }

  //   2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text })
      if (!text) {
        loadAllProducts()
      }
    }, 300)
    return () => clearTimeout(delayed)
  }, [text])

  // 3. Load products based on price range
  useEffect(() => {
    console.log('OK to request')
    fetchProducts({ price })
  }, [ok])

  const handleSlider = (value) => {
    dispatch({ type: 'SEARCH_QUERY', payload: { text: '' } })
    setCategoryIds([])
    setStar('')
    setBrand('')
    setSub('')
    setColor('')
    setShipping('')

    setPrice(value)
    setTimeout(() => {
      setOk(!ok)
    }, 300)
  }

  // 4. Load products based on category
  // show categories in a list of checkbox

  const showCategories = () =>
    categories.map((c) => {
      return (
        <div key={c._id}>
          <Checkbox
            className='pb=2 pl-4 pr-4'
            value={c._id}
            name='category'
            onChange={handleCheck}
            checked={categoryIds.includes(c._id)}
          >
            {c.name}
          </Checkbox>
          <br />
        </div>
      )
    })

  // handle check for categories
  const handleCheck = (e) => {
    // reseting the previous value
    dispatch({ type: 'SEARCH_QUERY', payload: { text: '' } })
    setPrice([0, 0])
    setStar('')
    setSub('')
    setBrand('')
    setColor('')
    setShipping('')

    let inTheState = [...categoryIds]
    let justChecked = e.target.value
    let foundInTheState = inTheState.indexOf(e.target.value)

    if (foundInTheState === -1) {
      inTheState.push(justChecked)
    } else {
      inTheState.splice(foundInTheState, 1)
    }
    setCategoryIds(inTheState)

    fetchProducts({ category: inTheState })
    if (inTheState.length === 0) {
      loadAllProducts()
    }
  }
  // 5 .show product by ratings
  const handleStarClick = (num) => {
    dispatch({ type: 'SEARCH_QUERY', payload: { text: '' } })
    setPrice([0, 0])
    setCategoryIds([])
    setBrand('')
    setColor('')
    setShipping('')

    setStar(num)
    fetchProducts({ stars: num })
  }
  const showStars = () => {
    return (
      <div className='pr-4 pl-4 pb-2'>
        <Star starClick={handleStarClick} numberOfStars={5} />
        <Star starClick={handleStarClick} numberOfStars={4} />
        <Star starClick={handleStarClick} numberOfStars={3} />
        <Star starClick={handleStarClick} numberOfStars={2} />
        <Star starClick={handleStarClick} numberOfStars={1} />
      </div>
    )
  }
  // 6. show products by sub category
  const handleSub = (sub) => {
    setSub(sub)
    dispatch({ type: 'SEARCH_QUERY', payload: { text: '' } })
    setPrice([0, 0])
    setCategoryIds([])
    setStar('')
    setBrand('')
    setColor('')
    setShipping('')
    fetchProducts({ sub })
  }
  const showSubs = () =>
    subs.map((s) => {
      return (
        <div
          key={s._id}
          className='p-1 m-1 badge badge-secondary'
          style={{ cursor: 'pointer' }}
          onClick={() => handleSub(s)}
        >
          {s.name}
        </div>
      )
    })
  // 7. show products based on brands names
  const handleBrand = (e) => {
    setSub('')
    dispatch({ type: 'SEARCH_QUERY', payload: { text: '' } })
    setPrice([0, 0])
    setCategoryIds([])
    setStar('')
    setColor('')
    setShipping('')
    setBrand(e.target.value)
    fetchProducts({ brand: e.target.value })
  }

  const showBrands = () => {
    return brands.map((b) => {
      return (
        <Radio
          value={b}
          name={b}
          checked={b === brand}
          onChange={handleBrand}
          className='pb-1 pl-4 pr-4'
        >
          {b}
        </Radio>
      )
    })
  }
  const handleColor = (e) => {
    setColor(e.target.value)
    setSub('')
    dispatch({ type: 'SEARCH_QUERY', payload: { text: '' } })
    setPrice([0, 0])
    setCategoryIds([])
    setStar('')
    setBrand('')
    setShipping('')
    fetchProducts({ color: e.target.value })
  }
  const showColors = () => {
    return colors.map((c) => {
      return (
        <Radio
          value={c}
          name={c}
          checked={c === color}
          onChange={handleColor}
          className='pb-1 pl-4 pr-4'
        >
          {c}
        </Radio>
      )
    })
  }

  const handleShippingChange = (e) => {
    setColor('')
    setSub('')
    dispatch({ type: 'SEARCH_QUERY', payload: { text: '' } })
    setPrice([0, 0])
    setCategoryIds([])
    setStar('')
    setBrand('')
    setShipping(e.target.value)
    fetchProducts({ shipping: e.target.value })
  }
  const showShipping = () => {
    return (
      <>
        <Checkbox
          className='pb=2 pl-4 pr-4'
          value={'Yes'}
          onChange={handleShippingChange}
          checked={shipping === 'Yes'}
        >
          Yes
        </Checkbox>
        <Checkbox
          className='pb=2 pl-4 pr-4'
          value={'No'}
          onChange={handleShippingChange}
          checked={shipping === 'No'}
        >
          No
        </Checkbox>
      </>
    )
  }
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          <h4>Search/Filter</h4>
          <hr />
          <Menu mode='inline' defaultOpenKeys={['1', '2', '3', '4', '5', '6']}>
            {/* Price */}
            <SubMenu
              title={
                <span className='h6'>
                  <DollarOutlined />
                  Price
                </span>
              }
              key='1'
            >
              <div>
                <Slider
                  className='ml-4 mr-4'
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max='46999'
                />
              </div>
            </SubMenu>

            {/* Category */}
            <SubMenu
              title={
                <span className='h6'>
                  <DownSquareOutlined />
                  Categories
                </span>
              }
              key='2'
            >
              {showCategories()}
            </SubMenu>

            {/* Stars */}
            <SubMenu
              title={
                <span className='h6'>
                  <StarOutlined />
                  Rating
                </span>
              }
              key='3'
            >
              {showStars()}
            </SubMenu>

            {/* Subs */}
            <SubMenu
              title={
                <span className='h6'>
                  <DownSquareOutlined />
                  Sub Categories
                </span>
              }
              key='4'
            >
              {showSubs()}
            </SubMenu>

            {/* Brands */}
            <SubMenu
              title={
                <span className='h6'>
                  <DownSquareOutlined />
                  Brands
                </span>
              }
              key='5'
            >
              {showBrands()}
            </SubMenu>

            {/* Colors */}
            <SubMenu
              title={
                <span className='h6'>
                  <DownSquareOutlined />
                  Colors
                </span>
              }
              key='6'
            >
              {showColors()}
            </SubMenu>

            {/* Shipping */}
            <SubMenu
              title={
                <span className='h6'>
                  <DownSquareOutlined />
                  Shipping
                </span>
              }
              key='7'
            >
              {showShipping()}
            </SubMenu>
          </Menu>
        </div>

        <div className='col-md-9'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Products</h4>
          )}

          {products.length < 1 && <p>No products found</p>}
          <div className='row pb-5'>
            {products.map((p) => {
              return (
                <div key={p._id} className='col-md-4 mt-3'>
                  <ProductCard product={p} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
