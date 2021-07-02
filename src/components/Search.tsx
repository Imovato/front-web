import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../contexts/Search";
import { Label } from "./Label";
import Select from "./Select";

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

export default function Search() {
  const { search, searchUpdate, propertiesUpdate, propertiesBackup } = useContext(SearchContext)

  const [currentFilter, setCurrentFilter] = useState({
    city: "",
    neighborhood: "",
    price: "0:0",
    rooms: 0
  })

  function applyFilter(): Property[] {
    return propertiesBackup.filter(element => {
      return (
        (currentFilter.city ? element.city.includes(currentFilter.city) : true) &&
        (currentFilter.neighborhood ? element.neighborhood.includes(currentFilter.neighborhood) : true) &&
        (currentFilter.rooms ? element.rooms === currentFilter.rooms : true) &&
        (currentFilter.price !== '0:0' ? checkPrice(currentFilter.price, element.price) : true)
      )
    })
  }

  function checkPrice(range: string, actual: Number) {
    const [min, max] = range.split(':').map(e => Number(e))
    if (max === -1)
      return (actual > min)
    return (actual > min && actual < max)
  }

  useEffect(() => {
    propertiesUpdate(applyFilter())
  }, [currentFilter]);

  return (
    <div>
      <div className="flex flex-auto bg-red-200 dark:bg-gray-800 font-qsand font-semibold flex-col p-4 gap-2 rounded-lg">
        <p className="text-black dark:text-white text-center text-xl mb-5 font-bold">Pesquise seu imóvel</p>
        <form className="flex flex-col h-full items-center justify-between gap-4">
          <div className="flex flex-col w-full">
            <Label color="red-700 dark:text-gray-400">Finalidade</Label>
            <Select>
              <option>Venda</option>
              <option>Aluguel</option>
            </Select>
          </div>
          <div className="flex flex-col w-full">
            <Label color="red-700 dark:text-gray-400">Tipo</Label>
            <Select value={search} onChange={(e) => searchUpdate(e.target.value)}>
              <option value="property">Todos</option>
              <option value="apartment">Apartamentos</option>
              <option value="house">Casa</option>
              <option value="ground">Terrenos</option>
            </Select>
          </div>
          <div className="flex flex-col w-full">
            <Label color="red-700 dark:text-gray-400">Cidade</Label>
            <Select
              value={currentFilter.city}
              onChange={(e) => setCurrentFilter({ ...currentFilter, city: e.target.value })}
            >
              <option value="">Todos</option>
              <option value="Alegrete">Alegrete</option>
              <option value="Uruguaiana">Uruguaiana</option>
            </Select>
          </div>
          <div className="flex flex-col w-full">
            <Label color="red-700 dark:text-gray-400">Bairro</Label>
            <Select
              value={currentFilter.neighborhood}
              onChange={(e) => setCurrentFilter({ ...currentFilter, neighborhood: e.target.value })}
            >
              <option value="">Todos</option>
              <option value="Ibirapuitã">Ibirapuitã</option>
              <option value="Botafogo">Botafogo</option>
              <option value="Cidade Alta">Cidade Alta</option>
            </Select>
          </div>
          <div className="flex flex-col w-full">
            <Label color="red-700 dark:text-gray-400">Quartos</Label>
            <Select
              value={currentFilter.rooms}
              onChange={(e) => setCurrentFilter({ ...currentFilter, rooms: Number(e.target.value) })}
            >
              <option value="0">Todos</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </Select>
          </div>
          <div className="flex flex-col w-full">
            <Label color="red-700 dark:text-gray-400">Valor</Label>
            <Select
              value={currentFilter.price}
              onChange={(e) => setCurrentFilter({
                ...currentFilter,
                price: e.target.value,
              })}
            >
              <option value="0:0">Todos</option>
              <option value="0:50000">R$ 0 a R$ 50 mil</option>
              <option value="50001:150000">R$ 50 mil a R$ 150 mil</option>
              <option value="150001:300000">R$ 150 mil a R$ 300 mil</option>
              <option value="300001:600000">R$ 300 mil a R$ 600 mil</option>
              <option value="600001:-1">Acima de R$ 600 mil</option>
            </Select>
          </div>
        </form>
      </div>
    </div>
  );
}
