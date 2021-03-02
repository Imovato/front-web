import React from "react";
import Chat from "../../components/Chat";
import Navbar from "../../components/Navbar";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGreaterThan,
  faWindowMinimize,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Search from "../../components/Search";

library.add(faGreaterThan, faWindowMinimize, faPlus);

function Home() {
  return (
    <div className="App w-screen h-screen">
      <Navbar></Navbar>
      <Chat></Chat>
      <Search></Search>
    </div>
  );
}

export default Home;
