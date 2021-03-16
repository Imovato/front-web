import React from "react";
import { Link } from "react-router-dom";
import { Interface } from "readline";
import { Label } from "./Label";
import Select from "./Select";

export default function Search() {
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
              <option>Apartamentos</option>
              <option>Casa</option>
              <option>Terrenos</option>
            </Select>
          </div>
          <div className="flex flex-col w-full">
            <Label color="red-700">Cidade</Label>
            <Select>
              <option>Alegrete</option>
              <option>Uruguaiana</option>
            </Select>
          </div>
          <div className="flex flex-col w-full">
            <Label color="red-700">Bairro</Label>
            <Select>
              <option>Ibirapuitã</option>
              <option>Centro</option>
              <option>Bela Vista</option>
              <option>Cidade Nova</option>
            </Select>
          </div>
          <div className="flex flex-col w-full">
            <Label color="red-700">Quartos</Label>
            <Select>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </Select>
          </div>
          <div className="flex flex-col w-full">
            <Label color="red-700">Valor</Label>
            <Select>
              <option>R$ 0 a R$ 50 mil</option>
              <option>R$ 50 a R$ 150 mil</option>
              <option>R$ 150 a R$ 300 mil</option>
              <option>R$ 300 a R$ 600 mil</option>
              <option>Acima de R$ 600 mil</option>
            </Select>
          </div>
        </form>
      </div>
    </div>
  );
}
