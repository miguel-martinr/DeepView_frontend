import React from 'react'
import { Outlet } from 'react-router-dom'

import '../App.css'

export const MainContainer = () => {


  return (
    <div>
      <header className="App-header">
        <h1>DeepView</h1>
      </header>
      <div className="container fluid mt-2">
        <Outlet />
      </div>
    </div>
  )
}
