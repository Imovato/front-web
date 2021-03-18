import React, { useContext, useEffect, useState } from "react";
import Chat from "../../components/Chat";
import Navbar from "../../components/Navbar";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGreaterThan,
  faWindowMinimize,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Search from "../../components/Search";
import { PropertySample } from "../../components/PropertySample";
import { apiProperty } from "../../services/api";
import { SearchContext } from "../../contexts/Search";

library.add(faGreaterThan, faWindowMinimize, faPlus, faTimes);

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
  rooms: number;
}

function Home() {
  const {search, properties, propertiesUpdate, propertiesSetBackup} = useContext(SearchContext)


  useEffect(() => {
    apiProperty.get(`/${search}/all`, {}).then((response) => {
      propertiesUpdate(response.data);
      propertiesSetBackup(response.data);
    });
  }, [search]);

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
            <div className={`flex font-qsand flex-col gap-6 justify-${properties[0] ? 'start' : 'center'}`}>
              {properties[0] ? properties.map((property: Property) => (
                <PropertySample
                  key={property.id}
                  id={property.id}
                  name={property.name}
                  adress={property.adress}
                  description={property.description}
                  value={property.price}
                  image="imovel.png"
                ></PropertySample>
              )) : (
                <div className="max-w-3xl bg-red-400 p-5 rounded-lg shadow-md">
                  <p className="text-lg font-medium text-white">
                    Ops! Não encontramos nenhum imóvel com esses filtros.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
