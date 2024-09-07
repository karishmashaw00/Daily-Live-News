import React from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'
import LiveSlider from './LiveSlider'

const Feed = () => {
  return (
    <div className='mx-5 w-full '>
      <LiveSlider/>
      <ButtonList/>
      <VideoContainer/>
    </div>
  )
}

export default Feed
