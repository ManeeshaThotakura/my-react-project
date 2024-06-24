import React from 'react'
import './Navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import profile_icon from '../../assets/user_profile.jpg'
import { Link  } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import  { useState, useEffect } from 'react';
import {API_KEY} from '../../data'
import axios from 'axios';


const Navbar = ({ setSidebar,setVideos  }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&key=${API_KEY}`
      );
      setVideos(response.data.items);
    } catch (error) {
      console.error('Error fetching data from YouTube API:', error);
    }
  };

  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img
          className="menu_icon"
          onClick={() => setSidebar(prev => !prev)}
          src={menu_icon}
          alt="Menu Icon"
        />
        <Link to="/">
          <img className="logo" src={logo} alt="Logo" />
        </Link>
      </div>

      <div>
      <div className="nav-middle flex-div">
      <div className="search-box flex-div">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter search keyword"
        />
        <Link to ={`/search`}>
        <button onClick={handleSearch}>Search</button>
        </Link>
        
      </div>
      </div>
   </div>

      <div>
        <img src={upload_icon} alt="Upload Icon" />
        <img src={more_icon} alt="More Icon" />
        <img src={notification_icon} alt="Notification Icon" />
        <img src={profile_icon} className="user-icon" alt="Profile Icon" />
      </div>
    </nav>
  );
};
export default Navbar;
