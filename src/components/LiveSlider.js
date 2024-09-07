import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import API_KEY from '../constant/youtube';
import Avatar from "react-avatar";


const LiveSlider = () => {
  const [videos, setVideos] = useState([]);
  const [ytIcon, setYtIcon] = useState("");

 

  // Fetch live news videos from YouTube API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
         `https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&maxResults=5&q=news&key=${API_KEY}`

        );
        setVideos(response.data.items);
        // console.log(videos)
      } catch (error) {
        console.error('Error fetching live videos:', error);
      }
    };

    fetchVideos();
  }, []);

   //Get YT Channel Logo
   const getYoutubeChannelName = async () =>{
    try {
        const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${videos.snippet.channelId}&key=${API_KEY}`)
        setYtIcon(res.data.items[0].snippet.thumbnails.high.url);
    } catch (error) {
        console.log(error);
    }
}
useEffect(()=>{
  getYoutubeChannelName();
},[])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="mb-10 py-2">
      <h1 className="font-bold text-xl mb-4 px-3">Live News</h1>
      <Slider {...settings}>
        {videos.map((video) => (
          <div key={video.id.videoId} className="px-2">
            <iframe
              className="w-full h-72 sm:h-80 lg:h-96 aspect-video items-center"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <div className="flex mt-2 m-1">
                <Avatar
                  src={ytIcon}
                  size={25}
                  round={true} 
                />
                <h1 className='text-lg font-bold text-gray-900 px-2' >{video.snippet.channelTitle}</h1>
                
                
              </div>
              <h1 className=" ml-2">
                {video.snippet.title}
                </h1>
           
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LiveSlider;
