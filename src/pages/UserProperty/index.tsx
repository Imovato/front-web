import React, { useContext, useEffect, useState } from "react";
import Chat from "../../components/Chat";
import Navbar from "../../components/Navbar";
import { PropertySample } from "../../components/PropertySample";
import { SearchContext } from "../../contexts/Search";
import { apiMock, apiProperty} from "../../services/api";

interface Acquisition{
    id: number;
    price: string;
    user_id:number;
    property_id:number;
}

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

function UserProperty() {
  const [acquisitions, setAcquisitions] = useState<Acquisition[]>([])
  const [properties, setProperties] = useState<Property[]>([])

  
  useEffect(() => {
    
    // ${localStorage.getItem("userId")}
    apiMock.get(`/acquisition?user_id=3`, {}).then((response) => {
        setAcquisitions(response.data)
    });
    
    acquisitions.forEach(element => {
        apiProperty.get(`/apartment/find/${element.property_id}`, {}).then((response) => {
            setProperties(properties => [...properties, response.data])
        })
    })
  }, [properties]);
  return (
    <>
      <Chat></Chat>
      <div className="pb-10 max-w-7xl m-auto h-screen">
        <div className="flex flex-col gap-12 items-center">
          <Navbar></Navbar>
          <section className="flex max-h-192 gap-16
            overflow-y-auto scrollbar-thumb-rounded-full scrollbar-thin
            scrollbar-thumb-red-400 scrollbar-track-red-200 max-w-5xl"
          >
              <div className="flex font-qsand flex-col gap-6 justify-center">
                {properties.map((property: Property) => (
                    <PropertySample
                    key={property.id}
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

export default UserProperty;
