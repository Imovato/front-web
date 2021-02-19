import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Chat() {

  return (
    <div className="flex w-80 h-80 absolute bottom-0 right-5 mb-1 border-2 font-qsand rounded-lg flex-col">
      <div className="flex flex-none h-1/6 items-center border-b-2 pl-2">
        <div className="flex-auto">
          <p>Chat</p>
        </div>
        <div className="flex flex-none w-1/6 items-center justify-center h-full">
          <button className="h-full w-full focus:outline-none hover:bg-gray-100" type="button">
            <FontAwesomeIcon icon="window-minimize"/>
          </button>
        </div>
        
      </div>
      <div className="flex-auto border-b-2">

      </div>
      <div className="flex-none h-1/6">
        <form className="flex w-full h-full">
          <div className="flex-auto border-1">
            <input id="chatInput" className="w-full h-full pl-2 focus:outline-none" placeholder="Digite aqui..." ></input>
          </div>
          
          <div className="flex flex-none w-1/6 items-center justify-center border-l-2">
            <button className="h-full w-full focus:outline-none hover:bg-gray-100" type="submit" >
              <FontAwesomeIcon icon="greater-than" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
  
}
