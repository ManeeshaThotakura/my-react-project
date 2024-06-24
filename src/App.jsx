import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import  { useState } from 'react';
import {Route,Routes} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'
import videos from './Components/Navbar/Navbar.jsx'
import Search from './Components/SearchPage/Searchpage';



const App = () => {
  
  const [sidebar,setSidebar,]= useState(true);
  const [videos, setVideos] = useState([]); // Define videos state here


  return (
    <div>
      
      <Navbar setSidebar={setSidebar} setVideos={setVideos} />
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar}/>} />
        <Route path='/video/:categoryId/:videoId' element={<Video/>}/>
        <Route path='/search' element={<Search videos={videos} />} />
        </Routes>
    </div>
  )
}

export default App