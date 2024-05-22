import React from 'react'
import ServicesCard from '../Card/ServicesCard'
import Headings from '../ui/Headings'

const Services = () => {
  return (
    <div className='mt-20'>
    <Headings>Our Services</Headings>
    <div className='grid grid-cols-2 md:grid-cols-4 my-10'>
        {["Yoga sessions","Meditation program","Trek & Tours","Accomodations"].map((item ,index)=>(
            <ServicesCard key={item} name={item} id={index}/>
        ))
        }
      
    </div>
    
    </div>
  )
}

export default Services
