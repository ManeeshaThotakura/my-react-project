import  { useEffect, useState } from 'react';
import React from 'react'
import './PlayVideo.css'
import {API_KEY, value_converter} from '../../data'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import  share from '../../assets/share.png'
import save from '../../assets/save.png'
import moment from 'moment';
import { useParams} from 'react-router-dom'
import axios from 'axios';

const PlayVideo = () => {
    const {videoId} = useParams();

    const [apiData,setApiData]=useState(null);
    const [channelData,setChannelData]=useState(null);
    const [commentData,setCommentData]=useState([]);
    
    const fetchVideoData = async ()=>{
        //fetching videos data
        const videoDetails_url = `https:youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        await fetch(videoDetails_url).then(res=>res.json()).then(data=>setApiData(data.items[0]));
        
    }
    const fetchOtherData = async ()=>{
        //Fetching Channel Data
        if (!apiData) return; // Ensure apiData is available before fetching other data
        const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        const channelResponse = await fetch(channelData_url);
        const channelData = await channelResponse.json();
        setChannelData(channelData.items[0]);
        // Comment data
        const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
        const commentResponse = await fetch(comment_url);
        const commentData = await commentResponse.json();
        setCommentData(commentData.items);

    const setLike = async ({setLikeCount,isLiked,likeCount,setIsLiked,isDisliked,setIsDisliked}) => {
            if (!isLiked) {
                try {
                    const response = await axios.post(`https://youtube.googleapis.com/youtube/v3/videos/rate?key=${API_KEY}`);
                    setLikeCount(likeCount + 1);
                    setIsLiked(true);
                    if (isDisliked) {
                        setIsDisliked(false);
                    }
                } catch (error) {
                    console.error('Error liking the item:', error);
                }
            }
        };
        
    }
    useEffect(()=>{
        fetchVideoData();
 
    },[videoId])
    useEffect(()=>{
        if(apiData){
            fetchOtherData();
        }

    },[apiData]);
    
  return (
    <div className='play-video'>
       { /*<video src={video1} controls autoPlay muted></video>*/}
       <iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <h3>{apiData?apiData.snippet.title:"Title here"}</h3>
        <div className="play-video-info">
            <p>{apiData?value_converter(apiData.statistics.viewCount):"16k"} &bull;{ apiData?moment(apiData.snippet.publishedAt).fromNow():""}</p>
            <div>
            <span><img src={like} alt="" /> {apiData?value_converter(apiData.statistics.likeCount):155}</span>
                <span><img src={dislike} alt="" /></span>
                <span><img src={share} alt="" />share</span>
                <span><img src={save} alt="" />save</span>
            </div>
        </div>
        <hr />
        <div className="publisher">
            <img src={channelData?channelData.snippet.thumbnails.default.url:" "} alt="" />
            <div>
                <p>{apiData?apiData.snippet.channelTitle:" "}</p>
                <span>{channelData?value_converter(channelData.statistics.subscriberCount):"1M"}Subscribers</span>

            </div>
            <button>Subscribe</button>
        </div>
        
        <div className="vid-discription">
            <p>{apiData?apiData.snippet.description.slice(0,250):"Description Here"}</p>
            <hr/>
            <h4>{apiData?value_converter(apiData.statistics.commentCount):102}comments</h4>
            {commentData.map((item,index) => {

                return(
                    
                    <div key={index}className="comment">
                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl } alt="" />
                <div>
                            <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span> 1 day ago</span></h3>
                            <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                            <div className="comment-action">
                                <img src={like} alt="" />
                                
                                    <button onClick={setLike}>Like</button>
            
                                <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                <img src={dislike} alt="" />

                    </div>
                </div>
            </div>


                )
            })}
        </div>
       
       
    </div>
  )
}

export default PlayVideo
