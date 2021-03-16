import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Interface } from "readline";
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
  rooms:number;
}

export default function Search() {
  const {search,searchUpdate,properties,propertiesUpdate,propertiesBackup} = useContext(SearchContext)

  const [currentFilter, setCurrentFilter] = useState({
    city:"",
    neighborhood:"",
    minPrice:0,
    maxPrice:0,
    rooms:0
  })
  useEffect(() => {
    const newProperties:Property[] = []
    propertiesBackup.forEach(element => {
      let allMatches = 1
      if(currentFilter.city!=""){
        if(element.city != currentFilter.city){
          allMatches=0
        }
      }
      if(currentFilter.neighborhood!=""){
        if(element.neighborhood != currentFilter.neighborhood){
          allMatches=0
        }
      }
      if(currentFilter.rooms!=0){
        if(element.rooms != currentFilter.rooms){
          allMatches=0
        }
      }
      if(currentFilter.maxPrice!=0){
        if(currentFilter.maxPrice==-1){
          if(element.price < currentFilter.minPrice){
            allMatches=0
          }
        }else if(element.price > currentFilter.maxPrice || element.price < currentFilter.minPrice){
          allMatches=0
        }
        
      }
      //@ts-ignore
      if (allMatches==1) {
        newProperties.push(element)
      }
    });
    propertiesUpdate(newProperties)
  }, [currentFilter]);

  return (
    <div>
      <div className="flex flex-auto bg-red-200 font-qsand font-semibold flex-col p-4 gap-2 rounded-lg">
        <p className="text-black text-center text-xl mb-5 font-bold">Pesquise seu imóvel</p>
        <form className="flex flex-col h-full items-center justify-between gap-4">
          <div className="flex flex-col w-full">
            <Label color="red-700">Finalidade</Label>
            <Select>
              <option>Venda</option>
              <option>Aluguel</option>
            </Select>
          </div>
          <div className="flex flex-col w-full">
            <Label color="red-700">Tipo</Label>
            <Select>
              <option onClick={()=>searchUpdate("property")}>Todos</option>
              <option onClick={()=>searchUpdate("apartment")}>Apartamentos</option>
              <option onClick={()=>searchUpdate("house")}>Casa</option>
              <option onClick={()=>searchUpdate("ground")}>Terrenos</option>
            </Select>
          </div>
          <div className="flex flex-col w-full">
            <Label color="red-700">Cidade</Label>
            <Select>
            <option onClick={()=>setCurrentFilter({...currentFilter, city:""})}>Todos</option>
              <option onClick={()=>setCurrentFilter({...currentFilter, city:"Alegrete"})}>Alegrete</option>
              <option onClick={()=>setCurrentFilter({...currentFilter, city:"Uruguaiana"})}>Uruguaiana</option>
            </Select>
          </div>
          <div className="flex flex-col w-full">
            <Label color="red-700">Bairro</Label>
            <Select>
            <option onClick={()=>setCurrentFilter({...currentFilter, neighborhood:""})}>Todos</option>
              <option onClick={()=>setCurrentFilter({...currentFilter, neighborhood:"Ibirapuitã"})}>Ibirapuitã</option>
              <option onClick={()=>setCurrentFilter({...currentFilter, neighborhood:"Botafogo"})}>Botafogo</option>
              <option onClick={()=>setCurrentFilter({...currentFilter, neighborhood:"Cidade Alta"})}>Cidade Alta</option>

            </Select>
          </div>
          <div className="flex flex-col w-full">
            <Label color="red-700">Quartos</Label>
            <Select>
              <option onClick={()=>setCurrentFilter({...currentFilter, rooms:0})}>Todos</option>
              <option onClick={()=>setCurrentFilter({...currentFilter, rooms:1})}>1</option>
              <option onClick={()=>setCurrentFilter({...currentFilter, rooms:2})}>2</option>
              <option onClick={()=>setCurrentFilter({...currentFilter, rooms:3})}>3</option>
              <option onClick={()=>setCurrentFilter({...currentFilter, rooms:4})}>4</option>
            </Select>
          </div>
          <div className="flex flex-col w-full">
            <Label color="red-700">Valor</Label>
            <Select>
            <option onClick={()=>setCurrentFilter({...currentFilter, minPrice:0, maxPrice:0})}>Todos</option>
            <option onClick={()=>setCurrentFilter({...currentFilter, minPrice:0, maxPrice:50000})}>R$ 0 a R$ 50 mil</option>
              <option onClick={()=>setCurrentFilter({...currentFilter, minPrice:50001, maxPrice:150000})}>R$ 50 a R$ 150 mil</option>
              <option onClick={()=>setCurrentFilter({...currentFilter, minPrice:150001, maxPrice:300000})}>R$ 150 a R$ 300 mil</option>
              <option onClick={()=>setCurrentFilter({...currentFilter, minPrice:300001, maxPrice:600000})}>R$ 300 a R$ 600 mil</option>
              <option onClick={()=>setCurrentFilter({...currentFilter, minPrice:600001, maxPrice:-1})}>Acima de R$ 600 mil</option>
            </Select>
          </div>
        </form>
      </div>
    </div>
  );
}
