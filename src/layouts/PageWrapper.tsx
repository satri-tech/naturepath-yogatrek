import React from 'react'

const PageWrapper = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='container my-3  py-4'>
      {children}
    </div>
  )
}

export default PageWrapper
