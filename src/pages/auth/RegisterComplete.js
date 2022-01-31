import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { createOrUpdateUser } from '../../functions/auth'

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const { user } = useSelector((state) => ({ ...state }))

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Email and password is required')
      return
    }
    if (password <= 6) {
      toast.error('Password must be atleast 6 char long')
      return
    }
    try {
      const result = await auth.signInWithEmailLink(email, window.location.href)
      console.log('result =>', result)

      if (result.user.emailVerified) {
        //   remove the user from the localstorage
        window.localStorage.removeItem('emailForRegistration')
        // get user id token
        let user = auth.currentUser
        console.log('currentUser =>', user)

        await user.updatePassword(password)
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
          })
          .catch((error) => {
            console.log(error)
            toast.error(error.message)
          })
        history.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'))
  }, [])

  useEffect(() => {
    if (user && user.token) {
      history.push('/')
    }
  }, [user])
  const completeRegisterForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        className='form-control'
        placeholder='Enter your email'
        value={email}
        disabled
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        className='form-control mt-2'
        placeholder='Enter your password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />
      <button type='submit' className='btn btn-primary mt-2'>
        Complete Registration
      </button>
    </form>
  )
  return (
    <>
      <div className='container p-5'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <h4>Register Complete</h4>
            {completeRegisterForm()}
          </div>
        </div>
      </div>
    </>
  )
}
export default RegisterComplete
