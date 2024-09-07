import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API_KEY from "../constant/youtube";
import axios from "axios";
import Avatar from "react-avatar";
// import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
// import { PiShareFatLight } from "react-icons/pi";
// import { GoDownload } from "react-icons/go";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { LuSendHorizonal } from "react-icons/lu";
// import LiveChat from "./LiveChat";
import { useDispatch } from "react-redux";
import { setMessage } from "../utils/chatSlice";

const Watch = () => {
  const [input, setInput] = useState("");
  const [singleVideo, setSingleVideo] = useState(null);
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const dispatch = useDispatch();
  const [ytIcon, setYtIcon] = useState("");

  const getSingleVideo = async () => {
    try {
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
      );
      setSingleVideo(res?.data?.items[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = () => {
    dispatch(setMessage({ name: "User", message: input }));
    setInput("");
  };

  useEffect(() => {
    getSingleVideo();
  }, []);

  const getYoutubeChannelName = async () =>{
    try {
        const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${singleVideo.snippet.channelId}&key=${API_KEY}`)
        setYtIcon(res.data.items[0].snippet.thumbnails.high.url);
    } catch (error) {
        console.log(error);
    }
}
useEffect(()=>{
  getYoutubeChannelName();
},[])

  return (
    <div className=" flex ml-3 w-[100%] mt-2 sm:">
      <div className=" w-[70%] ">
        <div className="max-sm: m-3" > 
          <iframe
            className=" w-full aspect-video items-center ml-3 "

            
            src={`https://www.youtube.com/embed/${videoId}?&autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <h1 className="font-bold mt-2 text-lg">
            {singleVideo?.snippet?.title}
          </h1>
          <div className="flex items-center justify-between max-md:block">
            <div className="flex items-center justify-between w-[35%]">
              <div className="flex mt-2 m-1">
                <Avatar
                  src={ytIcon}
                  size={40}
                  round={true} 
                />
                <h1 className="font-bold ml-2">
                  {singleVideo?.snippet?.channelTitle}
                </h1>
              </div>
            </div>
            
          </div>
        </div>

        {/* <div className="w-[100%] border border-gray-300 ml-8 rounded-lg h-fit p-4 mt-4 ">
          <div className="flex justify-between items-center">
            <h1>Top Chat</h1>
            <BsThreeDotsVertical />
          </div>
          <div className="overflow-y-auto h-[28rem] flex flex-col-reverse">
            <LiveChat />
          </div>

          <div className="flex items-center justify-between border-t p-2">
            <div className="flex items-center w-[90%]">
              <div>
                <Avatar
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  size={30}
                  round={true}
                />
              </div>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border-b border-gray-300 outline-none ml-2 w-full"
                type="text"
                placeholder="Send message..."
              />
              <div className="bg-gray-200 cursor-pointer p-2 rounded-full">
                <LuSendHorizonal onClick={sendMessage} />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Watch;
