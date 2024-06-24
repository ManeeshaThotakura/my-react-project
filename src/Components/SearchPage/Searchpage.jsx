import React, { useState,useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import { Link } from 'react-router-dom'
import Feed from '../Feed/Feed';


const Search = ({videos}) => {
    
    return(
        
        <div>

          {videos.map((video) => (
            <Link to={`/video/${video.snippet.categoryid}/${video.id.videoId}`} >
            <div key={video.id.videoId}>
              <h2>{video.snippet.title}</h2>
              <p>{video.snippet.description}</p>
              <img
                src={video.snippet.thumbnails.default.url}
                alt={video.snippet.title}
              />
              
            </div>
            </Link>
          ))}
        </div>
        
    )
}
export default Search;