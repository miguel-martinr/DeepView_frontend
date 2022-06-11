import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { MainContainer } from './pages/MainContainer'
import { VideosPage } from './pages/VideosPage'

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<MainContainer />}>
            <Route path='/videos' element={<VideosPage />} />
            <Route path='/*' element={<HomePage />} />
            <Route path='/' element={<HomePage />} />
          </Route>
        </Routes>
    </div>
  )
}

export default App
