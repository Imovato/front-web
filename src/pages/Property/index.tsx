import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import Chat from "../../components/Chat";
import { Label } from "../../components/Label";
import Navbar from "../../components/Navbar";
import Search from "../../components/Search";
import { apiProperty } from "../../services/api";

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
    <div className="App w-full h-full pb-10">
      <Navbar></Navbar>
      <Chat></Chat>
      <Search></Search>
      <div className="flex w-full h-full items-center justify-start pt-5 font-qsand flex-col space-y-2 ">
        <div className="flex w-8/12 h-16 shadow-md border-gray-200 border-2 rounded-xl">
          <p className="ml-5 mt-3 text-xl">{property?.name}</p>
        </div>
        <div className="flex w-8/12 h-1/2 shadow-md border-gray-200 border-2 rounded-xl justify-center p-2">
          <img src={process.env.PUBLIC_URL + "/imovel.png"} height="5xl"></img>
        </div>

        <div className="flex w-8/12 h-20 shadow-md border-gray-200 border-2 rounded-xl justify-center p-2 space-x-5">
          <button
            className="flex w-1/3 h-full bg-green-500 rounded-xl justify-center items-center text-lg text-white"
            type="button"
            onClick={() => handleBuy}
          >
            COMPRAR
          </button>
          <button
            className="flex w-1/3 h-full bg-yellow-500 rounded-xl justify-center items-center text-lg text-white"
            type="button"
            onClick={() => handleHire}
          >
            ALUGAR
          </button>
        </div>
        <div className="flex w-8/12 shadow-md border-gray-200 border-2 rounded-xl flex-col">
          <div className="flex flex-col">
            <p className="ml-3 mt-3 text-2xl">Descrição do Imóvel</p>
            <hr className="border-2 border-gray-600 mx-3" />
            <p className="ml-5 mt-3 text-xl">{property?.description}</p>
          </div>
          <div className="flex flex-col mt-3">
            <p className="ml-3 mt-3 text-2xl">Preço do Imóvel</p>
            <hr className="border-2 border-gray-600 mx-3" />
            <p className="ml-5 mt-3 text-xl">R$ {property?.price}</p>
          </div>
          <div className="flex flex-col mt-3">
            <p className="ml-3 mt-3 text-2xl">Localização</p>
            <hr className="border-2 border-gray-600 mx-3" />
            <p className="ml-5 mt-3 text-xl">{property?.adress}</p>
          </div>
          <div className="flex flex-col mt-3">
            <p className="ml-3 mt-3 text-2xl">Bairro</p>
            <hr className="border-2 border-gray-600 mx-3" />
            <p className="ml-5 mt-3 text-xl">{property?.neighborhood}</p>
          </div>
          <div className="flex flex-col mt-3">
            <p className="ml-3 mt-3 text-2xl">Número</p>
            <hr className="border-2 border-gray-600 mx-3" />
            <p className="ml-5 mt-3 text-xl">{property?.number}</p>
          </div>
          <div className="flex flex-col mt-3">
            <p className="ml-3 mt-3 text-2xl">Bloco</p>
            <hr className="border-2 border-gray-600 mx-3" />
            <p className="ml-5 mt-3 text-xl">{property?.block}</p>
          </div>
          <div className="flex flex-col mt-3">
            <p className="ml-3 mt-3 text-2xl">Número de quartos</p>
            <hr className="border-2 border-gray-600 mx-3" />
            <p className="ml-5 mt-3 text-xl">{property?.rooms}</p>
          </div>
        </div>
        <div className="flex w-8/12 shadow-xl border-gray-200 border-2 rounded-xl flex-col">
          <div className="flex w-full justify-center items-center space-y-2 flex-col pb-5">
            <p className="ml-5 mt-3 text-xl">Entre em contato</p>
            <form
              onSubmit={handleSubmit}
              className="flex w-8/12 flex-col space-y-4"
            >
              <fieldset>
                <Label for="customerName">Nome</Label>
                <input
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="focus:ring focus:ring-blue-200 w-full h-10 px-3 rounded-lg bg-gray-100"
                  color="blue"
                  name="customerName"
                  type="text"
                />
              </fieldset>
              <fieldset>
                <Label for="customerEmail">Endereço de Email</Label>
                <input
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="focus:ring focus:ring-blue-200 w-full h-10 px-3 rounded-lg bg-gray-100"
                  color="blue"
                  name="customerEmail"
                  type="email"
                />
              </fieldset>
              <fieldset>
                <Label for="customerPhone">Telefone</Label>
                <input
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  className="focus:ring focus:ring-blue-200 w-full h-10 px-3 rounded-lg bg-gray-100"
                  color="blue"
                  name="customerPhone"
                  type="text"
                />
              </fieldset>
              <div className="flex w-full justify-center items-center">
                <Button color="green" type="submit">
                  Enviar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Property;
