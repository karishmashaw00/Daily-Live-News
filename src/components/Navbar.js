import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleSidebar,
  setCategory,
  setSearchSuggestion,
} from "../utils/appSlice";
import axios from "axios";
import { SEARCH_SUGGESTION_API } from "../constant/youtube";
import logo from "../assest/news logo.png";

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
    <div className="flex fixed top-0 justify-center items-center w-[100%] z-10 bg-gray-100">
      <div className="flex w-[96%] items-center  py-3 justify-between">
        <div className="flex items-center" >
        <img src={logo} alt="logo" className=" w-14 p-2" ></img>
        <a class="navbar-brand text-3xl font-bold" href="/">Daily News</a>
        </div>
        <div className="flex w-[40%] items-center ">
        {/* <a href="/live">Live</a> */}

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

        
      </div>
    </div>
  );
};

export default Navbar;
