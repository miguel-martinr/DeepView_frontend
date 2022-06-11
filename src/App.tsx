import { Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/HomePage'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello world</h1>
        <Routes>
          <Route path='/home' element={<HomePage />} />
        </Routes>
      </header>
    </div>
  )
}

export default App
