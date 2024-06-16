
import PackageCard from '@/components/Card/PackageCard'
import PopularPackage from '@/components/Package/PopularPackage'
import PackageFilterForm from '@/components/forms/Client/PackageFilterForm'
import Topbanner from '@/layouts/Topbanner'
import React from 'react'

const PackagePage = () => {
  return (
    <div>
      <Topbanner title='Explore Suitable Package'/>
      <div className="conatiner max-w-[1600px]  my-10 mx-4 lg:mx-auto lg:px-4 gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <div className='sm:col-span-2 lg:col-span-3'>
        <PackageFilterForm/>
      </div>
        {[0, 1, 2, 3,4,5,6,7,8,9,10].map((items) => (
          <PackageCard key={items} />
        ))}
      </div>
    </div>
  )
}

export default PackagePage
