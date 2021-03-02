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
import { PropertySample } from "../../components/PropertySample";
import { apiProperty } from "../../services/api";
import { useState } from "react";
import { useEffect } from "react";

library.add(faGreaterThan, faWindowMinimize, faPlus);

interface Property {
  name: string;
  place: string;
  value: string;
  description: string;
}

function Home() {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    apiProperty.get("properties", {}).then((response) => {
      setProperties(response.data);
    });
  }, []);

  return (
    <div className="App w-screen h-screen">
      <Navbar></Navbar>
      <Chat></Chat>
      <Search></Search>
      <div className="flex w-screen h-full items-center justify-start space-y-2 pt-5 font-qsand flex-col">
        {properties.map((property: Property) => (
          <PropertySample
            name={property.name}
            value={property.value}
            description={property.description}
            place={property.place}
            image="imovel.png"
          ></PropertySample>
        ))}
      </div>
    </div>
  );
}

export default Home;
