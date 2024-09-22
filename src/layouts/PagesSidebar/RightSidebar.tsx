import React from 'react'
import BookingComponent from './BookingComponent'

const RightSidebar = () => {
  return (
    <div className='w-full'>
      <h3 className='font-semibold text-lg mb-3 dark:text-text-dark'>Get your booking!</h3>
      <BookingComponent/>
    </div>
  )
}

export default RightSidebar
