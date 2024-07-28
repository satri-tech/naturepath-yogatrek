import React from 'react'

const PageWrapper = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='container p-4 md:p-5 bg-primary/10'>
      {children}
    </div>
  )
}

export default PageWrapper
