import { useState } from 'react'
import AppRoute from './Routes/AppRoute'
import { BrowserRouter as Router } from 'react-router-dom'
import Sidebar from "./Components/Sidebar"
import Navbar from "./Components/Navbar"
import "./App.css"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentSong(null);
  }

  return (
    <>
    <Router>
      <Navbar onLogin={handleLogin} onLogout={handleLogout} isLoggedIn={isLoggedIn}/>
      <div className='main'>
        {/* <Sidebar /> */}
        <AppRoute isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setCurrentSong={setCurrentSong} currentSong={currentSong}/>
      </div>
    </Router>
    </>
  )
}

export default App
