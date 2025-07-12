import Header from '@/components/Header'
import React from 'react'
import ActiveUsers from './ActiveUsers'
// import UserCount from './UserCount'

export default function AdminPanel() {
  return (
    <div>
      <div className='Header'>
        <Header/>
        
        
        <ActiveUsers/>
      </div>


    </div>
  )
}
