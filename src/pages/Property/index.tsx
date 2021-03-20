import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import Chat from "../../components/Chat";
import { Label } from "../../components/Label";
import Navbar from "../../components/Navbar";
import { apiProperty } from "../../services/api";

import ContactUsSvg from '../../assets/phone-call.svg'
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

interface RouteParams {
  id: string;
}

interface CustomerData {
  name: string;
  email: string;
  phone: string;
}

function Property() {
  const [property, setProperty] = useState<Property>();
  let params = useParams<RouteParams>();

  useEffect(() => {
    apiProperty
      .get("apartment/find/".concat(params.id), {})
      .then((response) => {
        setProperty(response.data);
      });
  }, [params.id]);

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
  } as CustomerData);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await apiProperty.post("/property/contact", data);
    } catch (error) {
      alert("Algo deu errado, tente novamente.");
    }
  }

  async function handleBuy(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await apiProperty.post("/property/buy/".concat(params.id));
    } catch (error) {
      alert("Algo deu errado, tente novamente.");
    }
  }

  async function handleHire(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await apiProperty.post("/property/hire/".concat(params.id));
    } catch (error) {
      alert("Algo deu errado, tente novamente.");
    }
  }
  return (
    <>
      <Chat></Chat>
      <div className="pb-10 max-w-7xl m-auto h-screen">
        <div className="flex flex-col gap-12 items-center">
          <Navbar></Navbar>
          <section
            className="flex flex-col items-center max-h-192 gap-6 max-w-6xl
            overflow-y-auto scrollbar-thumb-rounded-full scrollbar-thin
            scrollbar-thumb-red-400 scrollbar-track-transparent"
          >
            <div className="flex items-center justify-around font-qsand">
              <img
                className="rounded-lg max-w-max shadow-lg"
                src={process.env.PUBLIC_URL + "/imovel.png"}
              />
              <div className="flex flex-col w-1/2">
                <div className="flex flex-col justify-between gap-4 p-4
                   bg-white dark:bg-gray-800 dark:text-white rounded-t-xl shadow-lg"
                >
                  <p className="text-xl font-medium">{property?.name}</p>
                  <div className="flex flex-col justify-between gap-10">
                    <p className="text-lg">{property?.description}</p>
                    <p className="text-xl text-green-800 dark:text-green-400">R$ {property?.price}</p>
                  </div>
                </div>
                <div className="flex justify-between bg-opacity-0">
                  <Button
                    color="green-500"
                    onClick={() => handleBuy}
                    roundedProp="bl-lg"
                    className="text-xl w-full h-12 justify-center"
                  >
                    Comprar
                  </Button>
                  <Button
                    color="yellow-500"
                    onClick={() => handleHire}
                    roundedProp="br-lg"
                    className="text-xl w-full h-12 justify-center"
                  >
                    Alugar
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex max-w-5xl w-full justify-around shadow-md
              rounded-xl bg-white dark:text-white dark:bg-gray-800 p-4 gap-16"
            >
              <div>
                <p className="text-xl">Localização</p>
                <p className="text-lg font-light">{property?.adress}</p>
              </div>
              <div>
                <p className="text-xl">Bairro</p>
                <p className="text-lg font-light">{property?.neighborhood}</p>
              </div>
              <div>
                <p className="text-xl">Número</p>
                <p className="text-lg font-light">{property?.number}</p>
              </div>
              <div>
                <p className="text-xl">Bloco</p>
                <p className="text-lg font-light">{property?.block}</p>
              </div>
              <div>
                <p className="text-xl">Quartos</p>
                <p className="text-lg font-light">{property?.rooms}</p>
              </div>
            </div>
            <div className="flex max-w-3xl w-full shadow-md rounded-xl
              justify-around items-center gap-12 bg-white dark:bg-gray-800
              p-5 mb-8 dark:text-white"
            >
              <div>
                <p className="text-xl text-center mb-5">Entre em contato</p>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3"
                >
                  <fieldset className="flex gap-3 justify-end items-center">
                    <Label font="light dark:text-white" for="customerName">Nome</Label>
                    <input
                      value={data.name}
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                      className="focus:ring focus:ring-red-200 h-10 px-3 rounded-lg
                      bg-gray-200 dark:bg-gray-600"
                      name="customerName"
                      type="text"
                    />
                  </fieldset>
                  <fieldset className="flex gap-3 justify-end items-center">
                    <Label font="light dark:text-white" for="customerEmail">Endereço de Email</Label>
                    <input
                      value={data.email}
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      className="focus:ring focus:ring-red-200 h-10 px-3
                      dark:bg-gray-600 rounded-lg bg-gray-200"
                      name="customerEmail"
                      type="email"
                    />
                  </fieldset>
                  <fieldset className="flex gap-3 justify-end items-center">
                    <Label font="light dark:text-white" for="customerPhone">Telefone</Label>
                    <input
                      value={data.phone}
                      onChange={(e) =>
                        setData({ ...data, phone: e.target.value })
                      }
                      className="focus:ring focus:ring-red-200 h-10 px-3
                      dark:bg-gray-600 rounded-lg bg-gray-200"
                      name="customerPhone"
                      type="text"
                    />
                  </fieldset>
                  <div className="flex w-full justify-end">
                    <Button color="pink-600" type="submit">
                      Enviar
                    </Button>
                  </div>
                </form>
              </div>
              <div className="flex flex-1 p-8">
                <img src={ContactUsSvg} alt="Entre em contato"/>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Property;
