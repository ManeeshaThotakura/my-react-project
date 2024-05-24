import React from 'react'
import Navbar from './Components/Navbar/Navbar'

const App = () => {
  const [sidebar,setSidebar]= useState(true);
  return (
    <div>
      <Navbar setSidebar={setSidebar}/>
      <Routes>
        <Router path='/' element={<Home sidebar={sidebar}/>} />
        <Route path='/video/:categoryId/:videoId' element={<Video/>}/>
      </Routes>
    </div>
  )
}

export default App
