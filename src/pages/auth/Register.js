import React, { useState, useEffect } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

const Register = ({ history }) => {
  const [email, setEmail] = useState('')

  const { user } = useSelector((state) => ({ ...state }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    }
    try {
      await auth.sendSignInLinkToEmail(email, config)

      // save user email in localstorage
      window.localStorage.setItem('emailForRegistration', email)

      toast.success(`Email is send to ${email}`)
      // clear state
      setEmail('')
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        className='form-control'
        placeholder='Enter your email'
        value={email}
        autoFocus
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type='submit' className='btn btn-primary mt-2'>
        Register
      </button>
    </form>
  )

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
            <h4>Register</h4>
            {registerForm()}
          </div>
        </div>
      </div>
    </>
  )
}
export default Register
