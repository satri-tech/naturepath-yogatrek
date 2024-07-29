import React from 'react'

const PageWrapper = ({children, className}:{children:React.ReactNode, className?: string}) => {
  return (
    <div className={`container p-4 md:p-5 ${className}`}>
      {children}
    </div>
  )
}

export default PageWrapper
