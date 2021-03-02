import React, { useEffect, useState } from "react";
import Chat from "../../components/Chat";
import Navbar from "../../components/Navbar";
import Search from "../../components/Search";
import { PropertySample } from "../../components/PropertySample";
import { apiProperty } from "../../services/api";
import { useParams } from "react-router-dom";
import imovel from "../../assets/imovel.png";

interface Property {
  id: string;
  name: string;
  place: string;
  value: string;
  description: string;
  rooms: String;
}

interface RouteParams {
  id: string;
}

function Property() {
  const [property, setProperty] = useState<Property>();
  let params = useParams<RouteParams>();

  useEffect(() => {
    apiProperty.get("properties/".concat(params.id), {}).then((response) => {
      setProperty(response.data);
    });
  }, [params.id]);
  return (
    <div className="App w-screen h-screen">
      <Navbar></Navbar>
      <Chat></Chat>
      <Search></Search>
      <div className="flex w-screen h-full items-center justify-start pt-5 font-qsand flex-col space-y-2">
        <div className="flex w-8/12 h-16 shadow-xl border-gray-200 border-2 rounded-xl">
          <p className="ml-5 mt-3 text-xl">{property?.name}</p>
        </div>
        <div className="flex w-8/12 h-1/2 shadow-xl border-gray-200 border-2 rounded-xl">
          <img src={imovel} className="w-full h-full"></img>
        </div>
        <div className="flex w-8/12 h-1/2 shadow-xl border-gray-200 border-2 rounded-xl flex-col">
          <div className="flex flex-col">
            <p className="ml-3 mt-3 text-2xl">Descrição do Imóvel</p>
            <hr className="border-2 border-gray-600 mx-3" />
            <p className="ml-5 mt-3 text-xl">{property?.description}</p>
          </div>
          <div className="flex flex-col mt-3">
            <p className="ml-3 mt-3 text-2xl">Preço do Imóvel</p>
            <hr className="border-2 border-gray-600 mx-3" />
            <p className="ml-5 mt-3 text-xl">{property?.value}</p>
          </div>
          <div className="flex flex-col mt-3">
            <p className="ml-3 mt-3 text-2xl">Localização</p>
            <hr className="border-2 border-gray-600 mx-3" />
            <p className="ml-5 mt-3 text-xl">{property?.place}</p>
          </div>
          <div className="flex flex-col mt-3">
            <p className="ml-3 mt-3 text-2xl">Número de quartos</p>
            <hr className="border-2 border-gray-600 mx-3" />
            <p className="ml-5 mt-3 text-xl">{property?.rooms}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Property;
