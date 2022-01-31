import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { auth } from '../../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState('venkvenkatesh27@gmail.com')
  const [loading, setLoading] = useState(false)

  const { user } = useSelector((state) => ({ ...state }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    }
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail('')
        setLoading(false)
        toast.success('Check your email for password reset')
      })
      .catch((error) => {
        setLoading(false)
        toast.error(error.message)
        console.log(error)
      })
  }
  useEffect(() => {
    if (user && user.token) {
      history.push('/')
    }
  }, [user])
  return (
    <>
      <div className='container p-5'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            {loading ? <h4>Loading...</h4> : <h4>Forgor Password</h4>}

            <form onSubmit={handleSubmit}>
              <input
                type='email'
                className='form-control'
                placeholder='Enter your email'
                value={email}
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type='submit'
                className='btn btn-primary mt-2'
                style={{ width: '100%' }}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default ForgotPassword
