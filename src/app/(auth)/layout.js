import React from 'react'
import { Toaster } from 'sonner'
import { monaSans } from '../(root)/layout'

const Authlayout = ({children}) => {
  return (
    <html lang="en" className="dark">
      <body
        className={`${monaSans} antialiased pattern root-layout`}
        cz-shortcut-listen="true"
      >
    <div className='auth-layout'>
      <Toaster position="top-right" richColors></Toaster>
      {children}
    </div>
    </body>
    </html>
  )
}

export default Authlayout
