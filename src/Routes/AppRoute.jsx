import React from 'react'
// import '../App.css'
// import './AppRoute.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Home from '../Pages/Home';
// import Library from "../Pages/Library"
// import Trending from "../Pages/Trending"
// import Player from "../Components/Player"
// import Login from "../Pages/Login"

// export default function AppRoute() {
//   return (
//     <Router>
//         <div className='mainContainer'>
//             <Sidebar />
//             <Routes>
//                 <Route path='/' element= {<Home />} />
//                 <Route path='/login' element= {<Login />} />
//                 <Route path='/library' element= {<Library />} />
//                 <Route path='/trending' element= {<Trending />} />
//                 <Route path='/player' element= {<Player />} />
//             </Routes>
//         </div>
//     </Router>
//   )
// }
import './AppRoute.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../Pages/Home';
import Library from "../Pages/Library"
import Trending from "../Pages/Trending"
import Player from "../Components/Player"
import Login from "../Pages/Login"

export default function AppRoute({ isLoggedIn, setIsLoggedIn, setCurrentSong, currentSong }) {
  return (
    <div className='mainContainer'>
      <Routes>
              <Route path="/" element={<Home isLoggedIn={isLoggedIn} setCurrentSong={setCurrentSong} />} />
              <Route path="/trending" element={isLoggedIn ? <Trending /> : <Navigate to="/login" />} />
              <Route path="/library" element={isLoggedIn ? <Library /> : <Navigate to="/login" />} />
              <Route path="/player" element={isLoggedIn && currentSong ? <Player song={currentSong} /> : <Navigate to="/" />} />
              <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
      </Routes>
    </div>
        
   
  )
}
