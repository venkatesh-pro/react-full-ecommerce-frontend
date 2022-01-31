import React from 'react'
import { Drawer, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import defaultImage from '../../images/default.jfif'

const SideDrawer = () => {
  const dispatch = useDispatch()
  const { drawer, cart } = useSelector((state) => ({ ...state }))

  const imageStyle = {
    width: '100%',
    height: '50px',
    objectFit: 'cover',
  }

  return (
    <Drawer
      className='text-center'
      placement='right'
      title={`Cart / ${cart.length} Products`}
      visible={drawer}
      onClose={() => {
        dispatch({
          type: 'SET_VISIBLE',
          payload: false,
        })
      }}
    >
      {cart.map((p) => {
        return (
          <div className='row' key={p._id}>
            <div className='col'>
              {p.images[0] ? (
                <>
                  <img src={p.images[0].url} alt='sd' style={imageStyle} />
                  <p className='text-center bg-secondary text-light'>
                    {p.title}
                  </p>
                </>
              ) : (
                <>
                  <img src={defaultImage} alt='' style={imageStyle} />
                  <p className='text-center bg-secondary text-light'>
                    {p.title}
                  </p>
                </>
              )}
            </div>
          </div>
        )
      })}
      <Link to='/cart'>
        <button
          onClick={() => dispatch({ type: 'SET_VISIBLE', payload: false })}
          className='btn text-center btn-primary btn-raised btn-block'
        >
          Go To Cart
        </button>
      </Link>
    </Drawer>
  )
}

export default SideDrawer
