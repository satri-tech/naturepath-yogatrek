import React from 'react'

const PageWrapper = ({children, className}:{children:React.ReactNode, className?: string}) => {
  return (
    <div className={`container px-8 md:px-10 ${className}`}>
      {children}
    </div>
  );
}

export default PageWrapper
