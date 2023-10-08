import React from 'react'
import {ReactComponent as Spiner} from "assets/icons/spiner.svg";

const Loading = () => {
  return (
    <Spiner className='animate-spin'/>
  )
}

export default Loading