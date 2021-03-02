import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import imovel from "../assets/imovel.png";
interface SampleProps {
  id: string;
  name: string;
  place: string;
  value: string;
  description: string;
  image: string;
}

export function PropertySample({
  id,
  name,
  place,
  value,
  description,
  image,
}: SampleProps) {
  return (
    // <div className="flex w-8/12 h-48 shadow-xl border-gray-200 border-2 rounded-xl">
    <Link
      to={"/property/".concat(id)}
      className="flex w-8/12 h-48 shadow-xl border-gray-200 border-2 rounded-xl"
    >
      <div className="flex w-1/3">
        <img src={imovel} className="w-full h-full"></img>
      </div>
      <div className="flex w-2/3 flex-col justify-between ml-2 py-3">
        <div className="text-lg">
          <p>{name}</p>
        </div>
        <div className="lugar">
          <p>{place}</p>
        </div>
        <div className="valor">
          <p>{value}</p>
        </div>
        <div className="descricao">
          <p>{description}</p>
        </div>
      </div>
    </Link>
    // </div>
  );
}
