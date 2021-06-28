import { useEffect, useState } from "react";
import Chat from "../../components/Chat";
import Navbar from "../../components/Navbar";
import { PropertySample } from "../../components/PropertySample";
import { apiAcquisition, apiProperty } from "../../services/api";

interface Acquisition {
  id: number;
  price: string;
  user: {
    id: number;
    name: string;
  }
  property: {
    id: number;
    amount: number;
    price: number;
  };
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

  let count = 0;
  useEffect(() => {
    apiProperty.get('/property/all', {}).then((response) => {
      setProperties(response.data)
    })
    apiAcquisition.get(`/user/find/${localStorage.getItem('userId')}`, {}).then((response) => {
      setAcquisitions(response.data)
    });
  }, []);
  return (
    <>
      <Chat></Chat>
      <div className="pb-10 max-w-7xl m-auto h-screen">
        <div className="flex flex-col gap-12 items-center">
          <Navbar></Navbar>
          <section className="flex max-h-192 gap-16
            overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-thin
            scrollbar-thumb-red-400 scrollbar-track-red-200 mix-w-6xl w-full content-start justify-center"
          >
            <div className="flex font-qsand flex-col gap-6 justify-start h-full">

              {properties.map((property: Property) => {
                if (acquisitions.find(x => x.property.id === Number(property.id))) {
                  count = count + 1;
                  return <PropertySample
                    key={property.id}
                    id={property.id}
                    name={property.name}
                    adress={property.adress}
                    description={property.description}
                    value={property.price}
                    image="imovel.png"
                    action="Comprado"
                  ></PropertySample>
                }
              })}
              {count == 0 && (
                <div className="bg-red-200 dark:bg-red-400 p-5 rounded-lg shadow-md mx-32">
                  <p className="text-lg font-medium dark:text-white">
                    Ops! Você não possui nenhum imóvel.
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

export default UserProperty;
