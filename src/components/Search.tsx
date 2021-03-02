import React from "react";
import { Link } from "react-router-dom";
import { Interface } from "readline";
import Select from "./Select";

export default function Search() {
  return (
    <div className="flex w-screen h-24 bg-red-200 font-qsand text-white font-semibold flex-col">
      <div className="flex h-1/3 w-full items-center justify-center">
        <p className="mt-3 text-black">Pesquise seu imóvel</p>
      </div>
      <form className="flex h-full w-full items-center justify-center space-x-2">
        <Select divClass="w-1/12">
          <option>Finalidade</option>
          <option>Venda</option>
          <option>Aluguel</option>
        </Select>

        <Select divClass="w-1/6">
          <option>Tipo</option>
          <option>Apartamentos</option>
          <option>Casa</option>
          <option>Terrenos</option>
        </Select>

        <Select divClass="w-1/6">
          <option>Cidade</option>
          <option>Alegrete</option>
          <option>Uruguaiana</option>
        </Select>

        <Select divClass="w-1/6">
          <option>Bairro</option>
          <option>Ibirapuitã</option>
          <option>Centro</option>
          <option>Bela Vista</option>
          <option>Cidade Nova</option>
        </Select>

        <Select divClass="w-1/12">
          <option>Quartos</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </Select>

        <Select divClass="w-1/12">
          <option>Valor</option>
          <option>R$ 0 a R$ 50 mil</option>
          <option>R$ 50 a R$ 150 mil</option>
          <option>R$ 150 a R$ 300 mil</option>
          <option>R$ 300 a R$ 600 mil</option>
          <option>Acima de R$ 600 mil</option>
        </Select>
      </form>
    </div>
  );
}
