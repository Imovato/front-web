import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAstronaut,
  faSignOutAlt,
  faSignInAlt,
  faHome,
  faCog
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";

library.add(faUserAstronaut, faSignOutAlt, faSignInAlt, faHome, faCog);

export default function Navbar() {
  return (
    <div className="flex h-24 bg-red-400 font-qsand text-white font-semibold rounded-b-3xl shadow-xl w-full">
      <div className="flex-none w-1/6 flex items-center justify-center border-r-2 border-red-500">
        <Link to="/">
          {/* <img src={logo} className="w-20 h-20"></img> */}
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            className="w-20 h-20"
          />
        </Link>
      </div>
      <div className="flex-auto flex-col">
        <div className="h-full flex items-center justify-center ">
          <p className="text-xl">Imobiliária</p>
        </div>
      </div>
      <div className="flex gap-1 flex-col items-center justify-evenly p-3 border-l-2 border-red-500">
        <Link className="flex items-center gap-1" to="/">
          <FontAwesomeIcon icon="home" />
          <p>Início</p>
        </Link>
        <div className="flex gap-6 justify-between">
          {localStorage.getItem("userId") ? (
            <Link className="flex items-center gap-1" to="/account/profile">
              <FontAwesomeIcon icon="user-astronaut" />
              <p>Perfil</p>
            </Link>
          ) : (
            <p>Bem vindo!</p>)}
          {localStorage.getItem("userId") ? (
            <Link className="flex items-center gap-1" to="/session">
              <FontAwesomeIcon icon="sign-out-alt" />
              <p>Log out</p>
            </Link>
          ) : (
            <Link className="flex items-center gap-1" to="/session/new">
              <FontAwesomeIcon icon="sign-in-alt" />
              <p>Log in</p>
            </Link>
          )}
        </div>
        <div className="flex gap-6 justify-between">
          {localStorage.getItem("userId") && (
            <Link className="flex items-center gap-1" to="/account/profile">
              <FontAwesomeIcon icon="cog" />
              <p>Configurações</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
