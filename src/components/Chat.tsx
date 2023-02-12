import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Chat() {
  function minimize() {
    document.getElementById('min')!.style.display = 'none';
    document.getElementById('max')!.style.display = 'block';
    var chatBox = document.getElementById("chatBox");
    chatBox!.style.margin = '0 0 -270px 0';
    chatBox!.style.transitionDuration = '1.3s';
    chatBox!.style.transitionProperty = 'margin'
  }

  function maximize() {
    document.getElementById('min')!.style.display = 'block';
    document.getElementById('max')!.style.display = 'none';
    const chatBox = document.getElementById('chatBox');
    chatBox!.style.margin = '0 0 0 0';
    chatBox!.style.transitionDuration = '1.3s';
    chatBox!.style.transitionProperty = 'margin'
  }

  return (
    <div
      id="chatBox"
      className="flex w-80 h-80 fixed bottom-0 right-5 mb-1
      bg-red-200 font-qsand rounded-lg flex-col overflow-hidden dark:bg-gray-800"
    >
      <div className="flex flex-none h-1/6 items-center border-b-2 border-red-400 dark:border-white pl-2">
        <div className="flex-auto font-semibold text-lg dark:text-white">
          <p>Chat</p>
        </div>
        <div className="flex dark:text-white flex-none w-1/6 items-center justify-center h-full p-2">
          <button
            id="min"
            className="h-full w-full focus:outline-none hover:bg-red-400 rounded-lg"
            type="button"
            onClick={minimize}
          >
            <FontAwesomeIcon icon="window-minimize" />
            <FontAwesomeIcon icon="times" className="hidden" />
          </button>

          <button
            id="max"
            className="hidden h-full w-full focus:outline-none dark:hover:bg-red-400
            hover:bg-red-400 rounded-lg"
            type="button"
            onClick={maximize}
          >
            <FontAwesomeIcon icon="plus" />
          </button>
        </div>
      </div>
      <div className="flex-auto"></div>
      <div className="flex-none dark:text-white h-1/6 p-2">
        <form className="flex w-full h-full gap-2">
          <div className="flex-auto">
            <input
              id="chatInput"
              className="w-full h-full pl-2 focus:outline-none rounded-lg dark:bg-gray-700 dark:placeholder-white"
              placeholder="Digite aqui..."
            ></input>
          </div>

          <div className="flex flex-none w-1/6 items-center justify-center">
            <button
              className="h-full w-full focus:outline-none
              hover:bg-red-400 rounded-lg"
              type="submit"
            >
              <FontAwesomeIcon icon="greater-than" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
