import React from 'react'
import { CiHome } from "react-icons/ci";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { useSelector } from 'react-redux';
import { MdHistory } from "react-icons/md";
import { AiOutlineShopping } from "react-icons/ai";
import { IoMusicalNoteOutline } from "react-icons/io5";
import { MdMovieEdit } from "react-icons/md";
import { MdOutlineSportsEsports } from "react-icons/md";
import { LuNewspaper } from "react-icons/lu";
import { GoTrophy } from "react-icons/go";
import { MdOutlinePodcasts } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineOutlinedFlag } from "react-icons/md";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { RiFeedbackLine } from "react-icons/ri";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { BsFire } from "react-icons/bs";

const sidebarItem = [
  {
    icons: <CiHome size="26px" />,
    title: "Home",
  },
  {
    icons: <SiYoutubeshorts size="26px" />,
    title: "Shorts",
  },
  {
    icons: <MdOutlineSubscriptions size="26px" />,
    title: "Subscription",
  },
  {
    icons: <MdOutlineVideoLibrary size="26px" />,
    title: "You",
  },
  {
    icons: <MdHistory size="26px" />,
    title: "History",
  },
  {
    
    title: "",
  },
  {
    
    title: "Explore",
  },
  {
    icons: <BsFire size="26px" />,
    title: "Trending",
  },
  {
    icons: <AiOutlineShopping size="26px" />,
    title: "Shopping",
  },
  {
    icons: <IoMusicalNoteOutline size="26px" />,
    title: "Music",
  },
  {
    icons: <MdMovieEdit size="26px" />,
    title: "Movies",
  },
  {
    icons: <MdOutlineSubscriptions size="26px" />,
    title: "Live",
  },
  {
    icons: <LuNewspaper size="26px" />,
    title: "News",
  },
  {
    icons: <MdOutlineSportsEsports size="26px" />,
    title: "Gaming",
  },
  {
    icons: <GoTrophy size="26px" />,
    title: "Sports",
  },
  {
    icons: <MdOutlinePodcasts size="26px" />,
    title: "Podcasts",
  },
  {
    
    title: "",
  },
  {
    title: "More",
  },
  {
    icons: <IoSettingsOutline size="26px" />,
    title: "Setting",
  },
  {
    icons: <MdOutlineOutlinedFlag size="26px" />,
    title: "Report history",
  },
  {
    icons: <IoIosHelpCircleOutline size="26px" />,
    title: "Help",
  },
  {
    icons: <RiFeedbackLine size="26px" />,
    title: "Send feedback",
  },
  
]

const Sidebar = () => {
  const open = useSelector((store)=>store.app.open);

  return (
    <div className={` sticky left-0 ${open? "w-[20%]" : "w-[6%]"} w-[18%] h-screen top-12 overflow-y-scroll overflow-x-hidden bg-white sm:max-lg:w-[2%] max-sm:w-[2%]`}> 
      {
        sidebarItem.map((item, index) => {
          return (
            <div key={index} className='flex px-2 m-3 cursor-pointer '>
            {item.icons}
            <p className={`text-xl px-7  ${open ? "": 'hidden'}`}>{item.title}</p>
          </div>
          )
        })
      }
    </div>
  )
}

export default Sidebar;
