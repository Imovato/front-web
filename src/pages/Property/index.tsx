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
    <>
      <Chat></Chat>
      <div className="pb-10 max-w-6xl m-auto h-screen">
        <div className="flex flex-col gap-12 items-center">
          <Navbar></Navbar>
          <section
            className="flex max-h-176 gap-16
            overflow-y-auto scrollbar-thumb-rounded-full scrollbar-thin
            scrollbar-thumb-red-400 scrollbar-track-red-200"
          >
            <div className="flex w-full h-full items-center justify-start pt-5 font-qsand flex-col space-y-2 mr-8">
              <div className="flex w-full shadow-md border-gray-200 border-2 rounded-xl bg-white">
                <div className="flex w-1/2 justify-center p-2 bg-white">
                  <img
                    src={process.env.PUBLIC_URL + "/imovel.png"}
                    height="5xl"
                  ></img>
                </div>
                <div className="flex flex-col w-1/2 h-full justify-between gap-8 ">
                  <p className="ml-5 mt-3 text-xl">{property?.name}</p>
                  <div className="flex flex-col justify-between gap-10">
                    <p className="ml-5 mt-3 text-lg">{property?.description}</p>
                    <p className="ml-5 mt-3 text-xl text-green-800">R$ {property?.price}</p>
                  </div>
                  <div className="flex w-full justify-between bg-white">
                    <Button color="green-500" onClick={() => handleBuy} roundedProp="none" additionalClasses="text-xl w-1/2 h-12 justify-center">
                      Comprar
                    </Button>
                    <Button color="yellow-500" onClick={() => handleHire} roundedProp="none" additionalClasses="text-xl w-1/2 h-12 justify-center">
                      Alugar
                    </Button>
                  </div>
                </div>
      
              </div>
              <div className="flex w-full shadow-md border-gray-200 border-2 rounded-xl flex-col bg-white">
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
              <div className="flex w-full shadow-xl border-gray-200 border-2 rounded-xl flex-col bg-white">
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
                        onChange={(e) =>
                          setData({ ...data, name: e.target.value })
                        }
                        className="focus:ring focus:ring-blue-200 w-full h-10 px-3 rounded-lg bg-gray-200"
                        color="blue"
                        name="customerName"
                        type="text"
                      />
                    </fieldset>
                    <fieldset>
                      <Label for="customerEmail">Endereço de Email</Label>
                      <input
                        value={data.email}
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                        className="focus:ring focus:ring-blue-200 w-full h-10 px-3 rounded-lg bg-gray-200"
                        color="blue"
                        name="customerEmail"
                        type="email"
                      />
                    </fieldset>
                    <fieldset>
                      <Label for="customerPhone">Telefone</Label>
                      <input
                        value={data.phone}
                        onChange={(e) =>
                          setData({ ...data, phone: e.target.value })
                        }
                        className="focus:ring focus:ring-blue-200 w-full h-10 px-3 rounded-lg bg-gray-200"
                        color="blue"
                        name="customerPhone"
                        type="text"
                      />
                    </fieldset>
                    <div className="flex w-full justify-center items-center">
                      <Button color="green-500" type="submit">
                        Enviar
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Property;
