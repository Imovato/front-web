import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
interface SampleProps {
  id: string;
  name: string;
  adress: string;
  value: number;
  description: string;
  image: string;
}

export function PropertySample({
  id,
  name,
  adress,
  value,
  description,
  image,
}: SampleProps) {
  return (
    // <div className="flex w-8/12 h-48 shadow-xl border-gray-200 border-2 rounded-xl">
    <Link
      to={"/property/".concat(id)}
      className="flex max-w-3xl shadow-md rounded-md bg-white dark:bg-gray-800
      border-white border-2 hover:border-red-300 p-2 dark:text-white
      dark:border-gray-800 dark:hover:border-red-400 justify-start gap-4 mr-8"
    >
      <div className="flex items-center rounded-sm">
        <img
          className="w-36 rounded-md"
          src={process.env.PUBLIC_URL + "/imovel.png"}
          alt={name}
        />
      </div>
      <div className="flex w-96 flex-col justify-between">
        <div className="flex flex-col justify-around gap-5">
          <div className="text-2xl">
            <p>{name}</p>
          </div>
          <div className="lugar">
            <p>{adress}</p>
          </div>
          <div className="descricao">
            <p>{description}</p>
          </div>
        </div>
        <div className="valor">
          <p className="font-bold dark:text-green-600 text-green-800">R$ {value}</p>
        </div>
      </div>
      <button className="flex h-8 p-2 flex-1 shadow-xl border-red-300
        bg-red-300 border-2 rounded-xl items-center
        hover:border-red-400 dark:bg-red-400 dark:border-red-400
        dark:hover:border-red-700 gap-2 text-white mt-auto"
      >
        <FontAwesomeIcon icon="search" className="text-lg" />
      </button>
    </Link>
    // </div>
  );
}
