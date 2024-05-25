import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'


const ServicesList =async()=>{

  try{

    const response = await fetch(`http://localhost:3000/api/services/getService`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await response.json();    
    console.log(data);
    return(
      <div>
        <pre>
          {JSON.stringify(data.data)}
        </pre>
      </div>
    )

  }catch(error){
    console.log(error)
    return(
      <div>
        <pre>
          something went wrong
        </pre>
      </div>)
  }



}







const ServicesPage = () => {
  return (
    <div>
      services
      <Link href={'/admin/services/create'}>
      
      <Button variant={"default"}>Create New Service</Button>
    
      </Link>
      <ServicesList/>

    </div>
  )
}

export default ServicesPage
