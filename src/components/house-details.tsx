import { FunctionComponent } from "react";
import DetailsDiv from "../components/details-div";

const HouseDetails: FunctionComponent = () => {
  return (
    <div className="absolute top-[586px] left-[47px] w-[687px] h-[383px] text-left text-lg text-white font-lato">
      <DetailsDiv />
      <b className="absolute top-[25px] left-[36px] inline-block">Detalhes</b>
    </div>
  );
};

export default HouseDetails;
