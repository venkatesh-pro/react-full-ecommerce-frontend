import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategories } from '../../functions/category'
import { getSubs } from '../../functions/sub'

const SubList = () => {
  const [subs, setSubs] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getSubs().then((res) => {
      setSubs(res.data)
      setLoading(false)
    })
  }, [])

  const showSubs = () =>
    subs.map((s) => {
      return (
        <div className='col btn btn-outlined-primary text-secondary  btn-lg btn-block btn-raised m-3  bg-primary'>
          <Link to={`/sub/${s.slug}`}>{s.name}</Link>
        </div>
      )
    })

  return (
    <div className='container'>
      <div className='row'>
        {loading ? <h4 className='text-center'>Loading...</h4> : showSubs()}
      </div>
    </div>
  )
}

export default SubList
