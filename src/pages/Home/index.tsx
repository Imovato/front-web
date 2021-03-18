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
  name: string;
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
    apiProperty.get("/property/all", {}).then((response) => {
      setProperties(response.data);
    });
  }, []);

  return (
    <>
      <Chat></Chat>
      <div className="pb-10 max-w-7xl m-auto h-screen">
        <div className="flex flex-col gap-12 items-center">
          <Navbar></Navbar>
          <section className="flex max-h-192 gap-16
            overflow-y-auto scrollbar-thumb-rounded-full scrollbar-thin
            scrollbar-thumb-red-400 scrollbar-track-red-200"
          >
            <div className="sticky top-0">
              <Search></Search>
            </div>
            <div className="flex font-qsand flex-col gap-6">
              {properties.map((property: Property) => (
                <PropertySample
                  id={property.id}
                  name={property.name}
                  adress={property.adress}
                  description={property.description}
                  value={property.price}
                  image="imovel.png"
                ></PropertySample>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
