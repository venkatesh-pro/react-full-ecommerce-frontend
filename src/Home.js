import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Jumbotron from './components/cards/Jumbotron'
import CategoryList from './components/category/CategoryList'
import BestSellers from './components/Home/BestSellers'
import NewArrivals from './components/Home/NewArrivals'
import SubList from './components/sub/SubList'

const Home = () => {
  return (
    <>
      <div className='jumbotron h1 font-weight-bold text-center text-danger'>
        <Jumbotron text={['Latest Products', 'New Arrivals', 'Best Sellers']} />
      </div>
      <h4 className='text-center p-3 mt-5 mb-5 display-3 jumbotron'>
        New Arrivals
      </h4>
      <NewArrivals />
      <h4 className='text-center p-3 mt-5 mb-5 display-3 jumbotron'>
        Best Sellers
      </h4>
      <BestSellers />
      <h4 className='text-center p-3 mt-5 mb-5 display-3 jumbotron'>
        Categories
      </h4>
      <CategoryList />
      <h4 className='text-center p-3 mt-5 mb-5 display-3 jumbotron'>
        Sub Categories
      </h4>
      <SubList />
      <br />
      <br />
    </>
  )
}

export default Home
