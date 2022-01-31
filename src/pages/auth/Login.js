import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { auth, googleAuthProvider } from '../../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { createOrUpdateUser } from '../../functions/auth'

const Login = ({ history }) => {
  const [email, setEmail] = useState('venkvenkatesh27@gmail.com')
  const [password, setPassword] = useState('123456')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const roleBasedRedirect = (res, historyState) => {
    // check if intended
    let intended = historyState

    console.log('intended', intended)
    if (intended) {
      history.push(intended.from)
    } else {
      if (res.data.role == 'admin') {
        history.push('/admin/dashboard')
      } else {
        history.push('/user/history')
      }
    }
  }
  const { user } = useSelector((state) => ({ ...state }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const result = await auth.signInWithEmailAndPassword(email, password)

      const { user } = result
      const idTokenResult = await user.getIdTokenResult()
      const historyState = history.location.state

      // backend
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          console.log('Data', res.data)
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              name: res.data.name,
              email: res.data.email,
              role: res.data.role,
              _id: res.data._id,
              token: idTokenResult.token,
            },
          })
          roleBasedRedirect(res, historyState)
        })
        .catch((error) => {
          console.log(error)
          toast.error(error.message)
        })
      // history.push('/')
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error(error.message)
    }
  }

  const googleLogin = async () => {
    const historyState = history.location.state
    await auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        console.log(result)
        const { user } = result
        const idTokenResult = await user.getIdTokenResult()

        // backend
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            console.log('Data', res.data)
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                _id: res.data._id,
                token: idTokenResult.token,
              },
            })
            roleBasedRedirect(res, historyState)
          })
          .catch((error) => {
            console.log(error)
          })
        history.push('/')
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.message)
      })
  }
  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        className='form-control'
        placeholder='Enter your email'
        value={email}
        autoFocus
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        className='form-control mt-2'
        placeholder='Enter your password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type='submit'
        className='btn btn-primary mt-2'
        disabled={!email || password.length < 6}
        style={{ width: '100%' }}
      >
        Login
      </button>
    </form>
  )

  useEffect(() => {
    let intended = history.location.state
    if (intended) {
      return
    } else {
      if (user && user.token) {
        history.push('/')
      }
    }
  }, [user, history])

  return (
    <>
      <div className='container p-5'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            {loading ? <h4>Loading...</h4> : <h4>Login</h4>}
            {loginForm()}
            <button
              onClick={googleLogin}
              className='btn btn-danger mt-2'
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <GoogleOutlined />
              Google
            </button>
            <Link to='/forgot/password'>Forgot Password</Link>
          </div>
        </div>
      </div>
    </>
  )
}
export default Login
