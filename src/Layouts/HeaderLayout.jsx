import Logo from "../assets/logo.svg";
import User from "../assets/images/user.png";
import { FaRegBell } from "react-icons/fa6";

export default function HeaderLayout() {
  return (
    <div className="w-full h-20 fixed bg-[#FFFBF5] flex px-10 md:px-24 py-5 justify-between">
      <img src={Logo} alt="logo" />
      <div className="flex items-center gap-5">
        <div className="w-10 h-10 rounded-full bg-green-400 flex justify-center items-center">
          <FaRegBell />
        </div>

        <div className="w-10 h-10 rounded-full bg-green-400 flex justify-center items-center">
          <img src={User} alt="user image" className="w-10 h-10 object-cover" />
        </div>
      </div>
    </div>
  );
}
