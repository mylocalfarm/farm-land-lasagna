import React from 'react'
import Navigation from './Navigation'

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  )
}

export default Layout