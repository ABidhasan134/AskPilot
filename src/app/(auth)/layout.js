import React from 'react'
import { Toaster } from 'sonner'

const Authlayout = ({children}) => {
  return (
    <div className='auth-layout'>
      <Toaster position="top-right" richColors></Toaster>
      {children}
    </div>
  )
}

export default Authlayout
