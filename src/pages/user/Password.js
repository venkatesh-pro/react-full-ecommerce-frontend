import React, { useState } from 'react'
import UserNav from '../../components/nav/UserNav'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'

const Password = () => {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false)
        toast.success('successfully updated password')
        setPassword('')
      })
      .catch((error) => {
        setLoading(false)

        toast.error(error.message)
        console.log(error)
      })
  }

  const passwordUpdateForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            className='form-control '
            placeholder='Enter new password'
            style={{ width: '50%' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            disabled={password.length < 6 || loading}
            className='btn btn-primary'
          >
            Submit
          </button>
        </div>
      </form>
    )
  }
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 '>
          <UserNav />
        </div>
        <div className='col'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Password Update</h4>
          )}
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  )
}

export default Password
