import React from 'react'
import StarRatings from 'react-star-ratings'

export const showAverage = (p) => {
  if (p && p.ratings) {
    const ratingsArray = p && p.ratings
    let total = []
    let length = ratingsArray.length
    // console.log('ratingsArray', ratingsArray)
    ratingsArray.map((r) => total.push(r.star))

    // console.log('total', total)

    let totalReduced = total.reduce((p, n) => p + n, 0)
    // console.log('totalReduced', totalReduced)

    let highest = length * 5
    // console.log('highest', highest)

    let result = [totalReduced * 5] / highest
    // console.log('result', result)

    return (
      <div className='text-center pt-1 pb-3'>
        <span>
          <StarRatings
            starDimension='20px'
            starSpacing='2px'
            starRatedColor='red'
            rating={result}
            editing={false}
          />
          ({p.ratings.length})
        </span>
      </div>
    )
  }
}
