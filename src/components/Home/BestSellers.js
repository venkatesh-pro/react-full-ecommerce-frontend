import { Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getProducts, getProductsCount } from '../../functions/product'
import Jumbotron from '../cards/Jumbotron'
import LoadingCard from '../cards/LoadingCard'
import ProductCard from '../cards/ProductCard'

const BestSellers = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [productsCount, setProductsCount] = useState(0)

  useEffect(() => {
    loadAllProducts()
  }, [page])

  useEffect(() => {
    getProductsCount().then((res) => {
      setProductsCount(res.data)
    })
  }, [])

  const loadAllProducts = () => {
    setLoading(true)
    // sort, order=> accending or desc, limit
    getProducts('sold', '-1', page)
      .then((res) => {
        setLoading(false)
        setProducts(res.data)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }

  return (
    <>
      <div className='container'>
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className='row'>
            {products.map((product) => {
              return (
                <div className='col-md-4' key={product._id}>
                  <ProductCard product={product} />
                </div>
              )
            })}
          </div>
        )}
      </div>
      <div className='row'>
        <nav className='col-md-4 offset-md-4 text-center'>
          <Pagination
            current={page}
            total={(productsCount / 2) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  )
}

export default BestSellers
