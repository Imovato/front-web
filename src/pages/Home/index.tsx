import React, { useEffect, useState } from "react";
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

library.add(faGreaterThan, faWindowMinimize, faPlus);

interface Property {
  id: string;
  dtype: string;
  adress: string;
  area_property: number;
  city: string;
  cod_address: string;
  description: string;
  neighborhood: string;
  number: number;
  price: number;
  state: string;
  block: string;
}

function Home() {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    apiProperty.get("/all", {}).then((response) => {
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
            id={property.id}
            name={property.city}
            adress={property.adress}
            description={property.description}
            value={property.price}
            image="imovel.png"
          ></PropertySample>
        ))}
      </div>
    </div>
  );
}

export default Home;
