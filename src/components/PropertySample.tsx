import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiProperty } from "../services/api";
interface SampleProps {
  id: string;
  name: string;
  adress: string;
  value: number;
  description: string;
  image: string;
  action?: string;
}

export function PropertySample({
  id,
  name,
  adress,
  value,
  description,
  image,
  action
}: SampleProps) {
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {

    apiProperty
      .get("property/find/".concat(id), {})
      .then((response) => {
        let tmpImages: any[] = []
        for (let index = 1; index <= response.data.imageQuantity; index++) {
          tmpImages.push(`http://localhost:8081/crudService/images/property/${id}/${index}.jpg`)
        }
        setImages(tmpImages)
      });

  }, []);

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
          src={images[0]}
          alt={name}
        />
      </div>
      <div className="flex w-96 flex-col justify-between">
        <div className="flex w-full">
          <div className="flex flex-col justify-around gap-5 w-9/12">
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
          {action && (
            <div className={`grid place-items-center w-3/12 bg-${action == "Comprado" ? "red" : "yellow"}-200 h-1/3 rounded-xl`}>
              <p>{action}</p>
            </div>
          )}

        </div>
        <div className="valor flex justify-between w-full gap-x-">
          <p className="font-bold dark:text-green-600 text-green-800">R$ {value}</p>
          <button className="flex w-10 h-8 p-2  shadow-xl border-red-300
            bg-red-300 border-2 rounded-xl items-center
            hover:border-red-400 dark:bg-red-400 dark:border-red-400
            dark:hover:border-red-700 gap-2 text-white mt-auto"
          >
            <FontAwesomeIcon icon="search" className="text-lg" />
          </button>
        </div>

      </div>

    </Link>
    // </div>
  );
}
