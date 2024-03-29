import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link} from "react-router-dom";
import { Button } from "../../components/Button";
import { Label } from "../../components/Label";
import Navbar from "../../components/Navbar";
import { apiAcquisition, apiContact, apiProperty, apiRent } from "../../services/api";
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import ContactUsSvg from '../../assets/phone-call.svg'
import { PropertyData } from "../../components/PropertyData";
import { toast, ToastContainer } from "react-toastify";
import { PropertySample } from "../../components/PropertySample";

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

function Property() {
  const [property, setProperty] = useState<Property>();
  const [acquisition, setAcquisition] = useState(true);
  const [stateImages, setStateImages] = useState<string[]>([])
  const [carousel, setCarousel] = useState(0)
  const [imagesPan, setImagesPan] = useState([''])
  const [imagePan, setImagePan] = useState(0)
  const msgTimeout = 2500
  const msgTimeOut2 = 1000000

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

  function changePan() {
    if (imagePan == imagesPan.length - 1) {
      setImagePan(0)
    } else {
      setImagePan(imagePan + 1)
    }
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await apiContact.post("/contact", data);
      toast('Mensagem enviada, entraremos em contato em breve.', { autoClose: msgTimeout, type: 'success' })
    } catch (error) {
      toast('Algo deu errado, tente novamente.', { autoClose: msgTimeout, type: 'error' })
    }
  }

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

  function handleHire() {
    
    try {
      apiRent.post("/save", {
        value: property?.price,
        amount: property?.amount,
        idProperty: property?.id,
        idUser: localStorage.getItem('userId')
      });
      toast('Imóvel alugado com sucesso.', { autoClose: msgTimeOut2, type: 'success' })
      setTimeout(() => {
        history.push('/property/user')
      }, msgTimeOut2)
    } catch (error) {
      toast('Algo deu errado, tente novamente.', { autoClose: msgTimeOut2, type: 'error' })
    }
  }

  const carouselOnChange = (value: any) => {
    setCarousel(value);
  }

  return (
    <>
      <div className="pb-10 max-w-7xl m-auto">
        <div className="flex flex-col gap-12 items-center">
          <Navbar></Navbar>

          <section
            className="flex flex-col items-center max-h-192 gap-6 w-full
            max-w-6xl overflow-y-auto scrollbar-thumb-rounded-full scrollbar-thin
            scrollbar-thumb-red-400 scrollbar-track-transparent"

          >
            <ToastContainer />
            <div className="flex items-center justify-around font-qsand w-full">
              <div className="flex flex-col justify-center items-center">
                <Carousel className="max-w-lg max-h-96" value={carousel} onChange={carouselOnChange} plugins={['arrows']}>
                  {stateImages.map((link) => (
                    <img className="overflow-y-scroll" id={link.substring(50)}
                      src={link} />
                  ))}
                </Carousel>
                <Dots
                  className="w-48"
                  value={carousel}
                  onChange={carouselOnChange}
                  thumbnails={stateImages.map((link) => (
                    <img id={link.substring(50).concat('thumb')}
                      src={link} />
                  ))}
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
                  <div className="flex justify-between bg-opacity-0 ">
                      <button
                        //onClick={handleBuy}
                        className="rounded-bl-lg text-white bg-green-400 text-xl
                        w-full h-12 justify-center hover:bg-opacity-70 transition
                        duration-150 ease-in-out dark:text-black"
                      >
                        <Link to={`/acquisition/save/${property?.id}`} >
                        Comprar
                        </Link>
                      </button>
                    <button
                      onClick={handleHire}
                      className="rounded-br-lg text-white bg-yellow-400 text-xl
                      w-full h-12 justify-center hover:bg-opacity-70 transition
                      duration-150 ease-in-out dark:text-black"
                    >
                      Alugar
                    </button>
                  </div>
                ) : (
                  <div className="grid place-items-center bg-red-400 h-12 text-lg text-white">
                    <p>Já comprado</p>
                  </div>
                )}
                <a href="#visitaVirtual" className="grid place-items-center bg-blue-400 h-12 text-lg text-white">
                  <button
                    onClick={function (e) {
                      changePan(); //can pass arguments this.btnTapped(foo, bar);
                    }}>
                    <p>Visita Virtual</p>
                  </button>
                </a>
              </div>
            </div>



            <div className="flex max-w-5xl w-full justify-around shadow-md
              rounded-xl bg-white dark:text-white dark:bg-gray-800 p-4 gap-16"
            >
              <PropertyData name="Localização" value={property?.adress} />
              <PropertyData name="Bairro" value={property?.neighborhood} />
              <PropertyData name="Número" value={property?.number ? property?.number : "N/A"} />
              <PropertyData name="Bloco" value={property?.block ? property?.block : "N/A"} />
              <PropertyData name="Quartos" value={property?.rooms ? property?.rooms : "N/A"} />
            </div>
            <div className="flex max-w-3xl w-full shadow-md rounded-xl
              justify-around items-center gap-12 bg-white dark:bg-gray-800
              p-5 mb-8 dark:text-white"
            >

              <div>
                <ToastContainer />
                <p className="text-xl text-right mb-5"><span className="text-red-400 font-bold">FALE AGORA</span><br /> COM UM CORRETOR</p>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3"
                >
                  <fieldset className="flex gap-3 justify-end items-center">
                    <Label font="light" for="customerName">Mensagem</Label>
                    <textarea
                      placeholder={`Olá, tenho interesse neste imóvel: ${property?.name}, ${property?.adress}. Gostaria de marcar uma visita presencial, aguardo contato.`}
                      onChange={(e) =>
                        setData({ ...data, message: e.target.value != '' ? e.target.value : `Olá, tenho interesse neste imóvel: ${property?.name}, ${property?.adress}. Gostaria de marcar uma visita presencial, aguardo contato.` })
                      }
                      className="focus:ring focus:ring-red-200 px-3 rounded-lg
                      bg-gray-200 dark:bg-gray-600 resize-y max-h-44 h-36"
                      name="customerName"
                    />
                  </fieldset>
                  <fieldset className="flex gap-3 justify-end items-center">
                    <Label font="light" for="customerName">Nome *</Label>
                    <input
                      value={data.name}
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                      className="focus:ring focus:ring-red-200 h-10 px-3 rounded-lg
                      bg-gray-200 dark:bg-gray-600"
                      name="customerName"
                      required
                      type="text"
                    />
                  </fieldset>
                  <fieldset className="flex gap-3 justify-end items-center">
                    <Label font="light" for="customerEmail">Endereço de Email *</Label>
                    <input
                      value={data.email}
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      className="focus:ring focus:ring-red-200 h-10 px-3
                      dark:bg-gray-600 rounded-lg bg-gray-200"
                      name="customerEmail"
                      required
                      type="email"
                    />
                  </fieldset>
                  <fieldset className="flex gap-3 justify-end items-center">
                    <Label font="light" for="customerPhone">Telefone</Label>
                    <input
                      value={data.phone}
                      onChange={(e) =>
                        setData({ ...data, phone: e.target.value })
                      }
                      className="focus:ring focus:ring-red-200 h-10 px-3
                      dark:bg-gray-600 rounded-lg bg-gray-200"
                      name="customerPhone"
                      type="text"
                    />
                  </fieldset>
                  <div className="flex w-full justify-end">
                    <Button type="submit">
                      Enviar
                    </Button>
                  </div>
                </form>
              </div>
              <div className="flex flex-1 p-8">
                <img src={ContactUsSvg} alt="Entre em contato" />
              </div>
            </div>
            <div className="grid place-items-center gap-5 w-full h-full p-5 shadow-md
              rounded-xl bg-white dark:text-white dark:bg-gray-800">
              <p className="text-xl">Visita Virtual</p>
              <button className="grid place-items-center bg-green-400 h-12 text-lg text-white p-3"
                onClick={function (e) {
                  changePan(); //can pass arguments this.btnTapped(foo, bar);
                }}>
                <p>Proxima imagem</p>
              </button>
              <div id="visitaVirtual" className="grid place-items-center w-full h-full">
                {/* <Pannellum
                  width="90%"
                  height="500px"
                  image={imagesPan[imagePan]}
                  pitch={10}
                  vaov={180}
                  yaw={180}
                  hfov={110}
                  autoLoad
                  onLoad={() => {
                    console.log("panorama loaded");
                  }}
                >
                </Pannellum> */}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Property;
