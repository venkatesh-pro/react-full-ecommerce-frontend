import React, { useEffect, useState } from 'react'
import { Badge, Menu } from 'antd'
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import SubMenu from 'antd/lib/menu/SubMenu'
import { Link } from 'react-router-dom'
import firebase from 'firebase/compat/app'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Search from '../forms/Search'

const Header = () => {
  const dispatch = useDispatch()
  const { user, cart } = useSelector((state) => ({ ...state }))

  // console.log('state => ', user)
  const history = useHistory()
  const [current, setCurrent] = useState('home')

  useEffect(() => {
    // console.log(current)
  }, [current])

  const handleClick = (e) => {
    setCurrent(e.key)
  }

  const logout = () => {
    firebase.auth().signOut()
    dispatch({
      type: 'LOGOUT',
      payload: null,
    })
    history.push('/login')
  }
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
      <Menu.Item key='home' icon={<MailOutlined />}>
        <Link to={'/'}>Home</Link>
      </Menu.Item>
      <Menu.Item key='shop' icon={<ShopOutlined />}>
        <Link to={'/shop'}>Shop</Link>
      </Menu.Item>
      <Menu.Item key='cart' icon={<ShoppingCartOutlined />}>
        <Link to={'/cart'}>
          {/* offset is positioning the batch */}
          <Badge count={cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      </Menu.Item>
      {user && (
        <>
          <SubMenu
            key='SubMenu'
            icon={<SettingOutlined />}
            title={user.name || (user.email && user.email.split('@')[0])}
          >
            <Menu.Item key='setting:1'>
              <Link
                to={
                  user.role && user.role == 'admin'
                    ? '/admin/dashboard'
                    : '/user/history'
                }
              >
                Dashboard
              </Link>
            </Menu.Item>
            <Menu.Item key='setting:2'>df</Menu.Item>
            <Menu.Item key='logout' onClick={logout}>
              Logout
            </Menu.Item>
          </SubMenu>
        </>
      )}
      {!user && (
        <>
          <Menu.Item key='register' className='float-right'>
            <Link to={'/register'}>Register</Link>
          </Menu.Item>
          <Menu.Item key='login' className='float-right'>
            <Link to={'/login'}>Login</Link>
          </Menu.Item>
        </>
      )}
      <span className='float-right p-1'>
        <Search />
      </span>
    </Menu>
  )
}

export default Header
