import React from 'react'
import ServicesCard from '../Card/ServicesCard'
import Headings from '../ui/Headings'
import Image from 'next/image'

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


{/* <div className="flex flex-row space-y-4 p-4">
  {["Yoga sessions","Meditation program","Trek & Tours","Accomodations","Yoga sessions","Meditation program","Trek & Tours","Accomodations"].map((item ,index) => (
    <div key={index} className="relative w-60 h-[20rem] hover:w-96 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out transform ">
      <Image
        src={`https://picsum.photos/200/300?random=${index}`}
        alt={item}
        className="object-cover w-full h-full"
        width={250}
        height={300}
        quality={100}
      />
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-black bg-opacity-50 backdrop-blur text-white p-4 rounded-b-lg opacity-0 transition duration-300 ease-in-out transform hover:opacity-100">
        <h1 className="text-2xl font-semibold">{item}</h1>
      </div>
    </div>
  ))}
</div> */}
    
    </div>
  )
}

export default Services
