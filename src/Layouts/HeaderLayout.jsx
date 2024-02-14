import Logo from "../assets/logo.svg";
import User from "../assets/images/user.png";
import { FaRegBell } from "react-icons/fa6";

export default function HeaderLayout() {
  return (
    <div className="w-full h-14 md:h-20 fixed bg-[#FFFBF5] flex px-10 md:px-24 z-10 py-5 justify-between items-center border-b-2">
      <img src={Logo} alt="logo" className="w-8 h-8 md:w-auto md:h-auto"/>
      <div className="flex items-center gap-5">
        <div className="w-8 md:w-10 h-8 md:h-10 rounded-full border drop-shadow-lg flex justify-center items-center">
          <FaRegBell />
        </div>

        <div className="w-8 md:w-10 h-8 md:h-10 rounded-full border drop-shadow-lg flex justify-center items-center">
          <img src={User} alt="user image" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
