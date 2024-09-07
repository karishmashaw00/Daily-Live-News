import React from 'react'
//import Feed from './Feed'
import { Outlet } from 'react-router-dom'


const Body = () => {
  return (
    <div className="flex mt-20">
          <Outlet/>
        </div>
  )
}

export default Body
