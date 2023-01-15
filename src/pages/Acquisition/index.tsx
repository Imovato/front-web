import { FunctionComponent } from "react";
import HouseImage from "../../components/house-image";
import TituloComprarPropriedade from "../../components/titulo-comprar-propriedade";
import HouseDetails from "../../components/house-details";
import CheckoutDiv from "../../components/checkout-div";
import BotaoConcluirCompra from "../../components/botao-concluir-compra";
import { apiAcquisition, apiContact, apiProperty, apiRent } from "../../services/api";

export function Acquisition() {
  /*const TelaComprarPropriedade: FunctionComponent = () => {*/
    return (
      <div className="relative bg-white w-full h-[1090px] overflow-hidden text-left text-xl text-brown font-lato">
        <div className="absolute top-[0px] left-[0px] w-[1280px] h-[1201px]">
          <div className="absolute top-[0px] left-[0px] bg-gray-200 w-[1280px] h-[1201px]" />
          <HouseImage />
          <TituloComprarPropriedade />
          <HouseDetails />
          <form
            className="absolute top-[253px] left-[774px] w-[460px] h-[716px]"
            action="www.google.com"
            method="post"
            id="2"
          >
            <CheckoutDiv />
            <b className="absolute top-[548px] left-[240px] text-base inline-block font-lato text-white text-left">
              R$130.000,00
            </b>
            <b className="absolute top-[146px] left-[240px] text-base inline-block font-lato text-white text-left">
              R$128.000,00
            </b>
            <b className="absolute top-[216px] left-[240px] text-base inline-block font-lato text-white text-left">
              R$2.000,00
            </b>
            <b className="absolute top-[548px] left-[40px] text-base inline-block font-lato text-white text-left">
              Total
            </b>
            <b className="absolute top-[146px] left-[40px] text-base inline-block font-lato text-white text-left">
              Preço
            </b>
            <b className="absolute top-[26px] left-[30px] text-[55px] inline-block font-lato text-white text-left">
              Total
            </b>
            <b className="absolute top-[216px] left-[40px] text-base inline-block font-lato text-white text-left">
              IPTU
            </b>
            <BotaoConcluirCompra />
            <div className="absolute top-[516px] left-[45px] bg-gray-100 w-[387px] h-[6px]" />
          </form>
        </div>
      </div>
    );
  //};
}
export default Acquisition;
