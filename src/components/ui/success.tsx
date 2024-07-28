import React, { ReactNode } from 'react'
import { Badge } from './badge'

export default function Success({children}:{children:ReactNode}) {
  return <Badge variant={'outline'} className=" bg-yoga-green/10 text-yoga-green">{children}</Badge>;
}
