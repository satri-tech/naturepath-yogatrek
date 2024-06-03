import React from 'react'

const PageWrapper = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='container my-3  py-4 px-0.5 sm:px-1 md:px-4'>
      {children}
    </div>
  )
}

export default PageWrapper
