import React, { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import Chat from "../../components/Chat";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import Navbar from "../../components/Navbar";
import Select from "../../components/Select";
import { apiProperty } from "../../services/api";

interface Property {
  dtype: string
  area: number
  name: string
  adress: string
  codAddress: string
  city: string
  description: string
  neighborhood: string
  number: number
  price: number
  state: string
  block?: string
  rooms?: number
}

export function NewProperty() {

  const [data, setData] = useState({
    area: 0,
    name: "",
    neighborhood: "",
    adress: "",
    codAddress: "000000000",
    city: "",
    description: "",
    state: "",
    price: 0,
    number: 0,
    block: "",
    rooms: 0,
    dtype: ""
  } as Property);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // trimming data specific for each type
    if (data.dtype === 'house') {
      const { block, ...houseData } = data
      setData(houseData)
    } else if (data.dtype === 'ground') {
      const { block, rooms, ...groundData } = data
      setData(groundData)
    }

    try {
      await apiProperty.post(`/property/${data.dtype}`, data);
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
            <div className="flex max-w-3xl shadow-md rounded-xl
              justify-around items-center gap-12 bg-white dark:bg-gray-800
              p-5 mb-8 dark:text-white"
            >
              <div className="flex flex-col">
                <p className="text-xl text-center mb-5">Novo imóvel</p>
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-6 items-start gap-3 px-5"
                >
                  {/* Row 1 */}
                  <div className="grid col-span-2">
                    <Label font="light" for="dtype">Tipo</Label>
                    <Select id="dtype" className="mt-1 bg-gray-200" value={data.dtype} onChange={(e) => setData({ ...data, dtype: e.target.value })}>
                      <option value=""></option>
                      <option value="apartment">Apartamento</option>
                      <option value="house">Casa</option>
                      <option value="ground">Terreno</option>
                    </Select>
                  </div>
                  <div className="grid col-span-4">
                    <Label font="light" for="name">Nome</Label>
                    <Input
                      value={data.name}
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                      id="name"
                      type="text"
                    />
                  </div>
                  {/* Row 2 */}
                  <div className="grid col-span-1">
                    <Label font="light" for="area">Área (m²)</Label>
                    <Input
                      value={data.area}
                      onChange={(e) =>
                        setData({ ...data, area: Number(e.target.value) })
                      }
                      id="area"
                      type="number"
                    />
                  </div>
                  {data.dtype !== 'ground' && <div className="grid col-span-1">
                    <Label font="light" for="rooms">Quartos</Label>
                    <Input
                      value={data.rooms}
                      onChange={(e) =>
                        setData({ ...data, rooms: Number(e.target.value) })
                      }
                      id="rooms"
                      type="number"
                    />
                  </div>}
                  <div className={`grid col-span-${data.dtype === 'ground' ? '5' : '4'}`}>
                    <Label font="light" for="address">Endereço</Label>
                    <Input
                      value={data.adress}
                      onChange={(e) =>
                        setData({ ...data, adress: e.target.value })
                      }
                      id="address"
                      type="text"
                    />
                  </div>
                  {/* Row 3 */}
                  <div className="grid col-span-1">
                    <Label font="light" for="number">Número</Label>
                    <Input
                      value={data.number}
                      onChange={(e) =>
                        setData({ ...data, number: Number(e.target.value) })
                      }
                      id="number"
                      type="number"
                    />
                  </div>
                  <div className="grid col-span-2">
                    <Label font="light" for="neighborhood">Bairro</Label>
                    <Input
                      value={data.neighborhood}
                      onChange={(e) =>
                        setData({ ...data, neighborhood: e.target.value })
                      }
                      id="neighborhood"
                      type="text"
                    />
                  </div>
                  <div className="grid col-span-2">
                    <Label font="light" for="city">Cidade</Label>
                    <Input
                      value={data.city}
                      onChange={(e) =>
                        setData({ ...data, city: e.target.value })
                      }
                      id="city"
                      type="text"
                    />
                  </div>
                  <div className="grid col-span-1">
                    <Label font="light" for="state">Estado</Label>
                    <Input
                      value={data.state}
                      onChange={(e) =>
                        setData({ ...data, state: e.target.value })
                      }
                      id="state"
                      type="text"
                    />
                  </div>
                  {/* Row 4 */}
                  {data.dtype === 'apartment' && <div className="grid col-span-1">
                    <Label font="light" for="block">Bloco</Label>
                    <Input
                      value={data.block}
                      onChange={(e) =>
                        setData({ ...data, block: e.target.value })
                      }
                      id="block"
                      type="text"
                    />
                  </div>}
                  <div className="grid col-span-1">
                    <Label font="light" for="price">Preço</Label>
                    <Input
                      value={data.price}
                      onChange={(e) =>
                        setData({ ...data, price: Number(e.target.value) })
                      }
                      id="price"
                      type="number"
                    />
                  </div>
                  <div className={`grid col-span-${data.dtype === 'apartment' ? '4' : '5'}`}>
                    <Label font="light" for="description">Descrição</Label>
                    <Input
                      value={data.description}
                      onChange={(e) =>
                        setData({ ...data, description: e.target.value })
                      }
                      id="description"
                      type="text"
                    />
                  </div>
                  {/* Row 5 */}
                  <div className="grid col-span-1">
                    <Button type="submit">
                      Enviar
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
