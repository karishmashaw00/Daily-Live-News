import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineVideoCall } from "react-icons/md";
import Avatar from "react-avatar";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleSidebar,
  setCategory,
  setSearchSuggestion,
} from "../utils/appSlice";
import axios from "axios";
import { SEARCH_SUGGESTION_API } from "../constant/youtube";

const Navbar = () => {
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState(false);
  const dispatch = useDispatch();
  const { searchSuggestion } = useSelector((store) => store.app);

  const searchVideo = () => {
    dispatch(setCategory(input));
    setInput("");
  };

  const toggleHandler = () => {
    dispatch(toggleSidebar());
  };

  const showSuggestion = async () => {
    try {
      const res = await axios.get(SEARCH_SUGGESTION_API + input);
    //  console.log(res.data);
      dispatch(setSearchSuggestion(res?.data[1]));
      
    } catch (error) {
      console.log(error);
    }
  };

  const openSuggestion = () => {
    setSuggestion(true);
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      showSuggestion();
  }, 200)

  return () => {
      clearTimeout(timer);
  }
  }, [input]);

  return (
    <div className="flex fixed top-0 justify-center items-center w-[100%] z-10 bg-white">
      <div className="flex w-[96%] items-center  py-3 justify-between">
        <div className="flex items-center" >
          <GiHamburgerMenu
            onClick={toggleHandler}
            className="size-8 cursor-pointer" 
          />
          <img
            className="px-4  cursor-pointer"
            width={"115px"} 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/1280px-Logo_of_YouTube_%282015-2017%29.svg.png"
            alt="Yt-Logo" 
          />
          
        </div>
        <div className="flex w-[40%] items-center ">
          <div className="w-[100%] flex">
            <input
              value={input} onFocus={openSuggestion}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Search"
              className=" py-2 px-4 border border-gray-400 rounded-l-full w-full outline-none "
            />
            <button
              onClick={searchVideo}
              className=" py-2 px-4 border border-gray-400 rounded-r-full"
            >
              <CiSearch className="size-6" />
            </button>
          </div>

          {(suggestion && searchSuggestion.length !== 0) && 
            <div className="absolute top-3 z-50 w-[30%] py-5 bg-white shadow-lg mt-12 rounded-lg border border-gray-200">
              <ul>
                {searchSuggestion.map((text, idx) => {
                  return (
                    <div className="flex items-center px-4 hover:bg-gray-100">
                      <CiSearch size="24px"/>
                      <li className="px-2 py-1 cursor-pointer text-md font-medium">
                        {text}
                      </li>
                    </div>
                  );
                })}
              </ul>
            </div>
          }
        </div>

        <div className="flex items-center w-[13%] justify-between">
          <MdOutlineVideoCall className="size-10 cursor-pointer" />
          <IoIosNotificationsOutline className=" size-10 cursor-pointer" />
          <Avatar
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            size={35}
            round={true}
            className=" cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
