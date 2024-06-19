import Bookingform from '@/components/forms/Client/Bookingform'
import { Package } from '@prisma/client';
import React from 'react'

const BookingComponent = async() => {
  let packageList;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/package/getPackage`,
      { next: { tags: [`PackageCollection`], revalidate: 600 } }
    );
    const data = await response.json();
    packageList= data.data;

  }catch(error){
    console.log(error);
    packageList=[]
    
  }finally{
    
    return (
      <div className='bg-blue-700 p-2 w-full'>
        <Bookingform packages={packageList as Package[]}/>
      </div>
    )
  }

}

export default BookingComponent
