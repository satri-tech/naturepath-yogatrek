
import Bookingform from '@/components/forms/Client/Bookingform'
import Topbanner from '@/layouts/Topbanner'
import React from 'react'

const BookingPage = () => {
  return (
    <div>
      <Topbanner title='Get your Booking instantly'/>
      <div className='bg-blue-700 max-w-lg mx-auto p-4  mb-10' >
      <Bookingform/>
      </div>
    </div>
  )
}

export default BookingPage
