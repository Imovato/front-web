import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Label } from "../../components/Label";
import Navbar from "../../components/Navbar";
import { apiAcquisition, apiContact, apiProperty, apiRent } from "../../services/api";
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import ContactUsSvg from '../../assets/phone-call.svg'
import { PropertyData } from "../../components/PropertyData";
import { toast, ToastContainer } from "react-toastify";

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
  amount: number;
  price: number;
  state: string;
  block: string;
  rooms: number;
  imageQuantity: number;
}

interface RouteParams {
  id: string;
}

interface CustomerData {
  message: string;
  name: string;
  email: string;
  phone: string;
}

function TelaComprarPropriedade() {
  const [property, setProperty] = useState<Property>();
  const [acquisition, setAcquisition] = useState(true);
  const [stateImages, setStateImages] = useState<string[]>([])
  const [carousel, setCarousel] = useState(0)
  const [imagesPan, setImagesPan] = useState([''])
  const [imagePan, setImagePan] = useState(0)
  const msgTimeout = 2500

  let params = useParams<RouteParams>();

  const history = useHistory()
  useEffect(() => {

    apiProperty
      .get("property/find/".concat(params.id), {})
      .then((response) => {
        let images: any[] = []
        setProperty(response.data);
        for (let index = 1; index <= response.data.imageQuantity; index++) {
          images.push(`http://localhost:8081/crudService/images/property/${params.id}/virtual/${index}.jpg`)
        }
        setImagesPan(images)
      });
    apiProperty
      .get("property/find/".concat(params.id), {})
      .then((response) => {
        let images: any[] = []
        setProperty(response.data);
        for (let index = 1; index <= response.data.imageQuantity; index++) {
          images.push(`http://localhost:8081/crudService/images/property/${params.id}/${index}.jpg`)
        }
        setStateImages(images)
      });
    apiAcquisition.get(`/property/find/${params.id}`, {}).then((response) => {
      if (response.data != "") {
        setAcquisition(true);
      }
    });
    setData({
      ...data, message: `Olá, tenho interesse neste imóvel: ${property?.name},
        ${property?.adress}. Gostaria de marcar uma visita presencial, aguardo contato.`
    })
  }, [params.id]);

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
  } as CustomerData);

  function handleBuy() {
    try {
      apiAcquisition.post("/save", {
        data: new Date(),
        value: property?.price,
        amount: property?.amount,
        idProperty: property?.id,
        idUser: localStorage.getItem('userId')
      });
      toast('Imóvel comprado com sucesso.', { autoClose: msgTimeout, type: 'success' })
      setTimeout(() => {
        history.push('/property/user')
      }, msgTimeout)
    } catch (error) {
      toast('Algo deu errado, tente novamente.', { autoClose: msgTimeout, type: 'error' })
    }
  }
  const carouselOnChange = (value: any) => {
    setCarousel(value);
  }

  return (
    <>
      <div className="pb-10 max-w-7xl m-auto h-screen">
        <div className="flex flex-col gap-12 items-center">
          <Navbar></Navbar>

          <section
            className="flex flex-col items-center max-h-192 gap-6 w-full
            max-w-6xl overflow-y-auto scrollbar-thumb-rounded-full scrollbar-thin
            scrollbar-thumb-red-400 scrollbar-track-transparent"

          >
            <ToastContainer />
            <div className="flex items-center justify-around font-qsand w-full gap-6">
              {/*DIV IMAGEM */}
            <div className="flex shadow-md rounded-xl
              justify-around items-center gap-12 bg-white dark:bg-gray-800
              p-5 mb-8 dark:text-white"
            >
              <img
                src={process.env.PUBLIC_URL + "/houseteste.jpg"}
                className="w-95 h-95"
              />
              </div>
              <div className="flex flex-col max-w-sm w-full">
                <div className="flex flex-col justify-between gap-4 p-4
                   bg-white dark:bg-gray-800 dark:text-white rounded-t-xl shadow-lg"
                >
                  <p className="text-xl font-medium">{property?.name}</p>
                  <div className="flex flex-col justify-between gap-10 max-w-sm">
                    <p className="text-lg ">{property?.description}</p>
                    <p className="text-xl text-green-800 dark:text-green-400">R$ {property?.price}</p>
                  </div>
                </div>
                {acquisition ? (
                  <div className="flex justify-between bg-opacity-0">
                      <button
                        onClick={handleBuy}
                        className="rounded-bl-lg text-white bg-green-400 text-xl
                        w-full h-12 justify-center hover:bg-opacity-70 transition
                        duration-150 ease-in-out dark:text-black"
                      >
                        Finalizar Compra
                      </button>
                  </div>
                ) : (
                  <div className="grid place-items-center bg-red-400 h-12 text-lg text-white">
                    <p>Já comprado</p>
                  </div>
                )}
              </div>
            </div>

            {/*DIV INFORMAÇÕES DA CASA/COMPRA*/}
            <div className="flex max-w-5xl w-full justify-around shadow-md
              rounded-xl bg-white dark:text-white dark:bg-gray-800 p-4 gap-16"
            >
              <PropertyData name="Localização" value={property?.adress} />
              <PropertyData name="Bairro" value={property?.neighborhood} />
              <PropertyData name="Número" value={property?.number ? property?.number : "N/A"} />
              <PropertyData name="Bloco" value={property?.block ? property?.block : "N/A"} />
              <PropertyData name="Quartos" value={property?.rooms ? property?.rooms : "N/A"} />
            </div>

          </section>
        </div>
      </div>
    </>
  );
}

export default TelaComprarPropriedade;