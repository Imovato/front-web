import React from 'react';
import Chat from '../../components/Chat';
import Navbar from '../../components/Navbar'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faGreaterThan, faWindowMinimize} from '@fortawesome/free-solid-svg-icons'

library.add(faGreaterThan, faWindowMinimize);

function Home() {
  return (
    <div className="App w-screen h-screen">
      <Navbar></Navbar>
      <Chat></Chat>
    </div>
  );
}

export default Home;
