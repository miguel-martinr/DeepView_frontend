import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { MainContainer } from './pages/MainContainer'
import { VideoPage } from './pages/VideoPage'
import { VideosPage } from './pages/VideosPage'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MainContainer />}>
          <Route path='/videos' element={<VideosPage />} />
          <Route path='/video/:name' element={<VideoPage />} />
          <Route path='/*' element={<HomePage />} />
          <Route path='/' element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
