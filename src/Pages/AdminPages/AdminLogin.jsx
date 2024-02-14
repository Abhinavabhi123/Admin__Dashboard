import { AdminLoginForm } from "../../Components";
import LoginImage from "../../assets/images/Login Image.svg";

export default function AdminLogin() {
  return (
    <div className="w-screen h-screen bg-white px-10 md:px-0 flex justify-center items-center ">
      <div className="w-[80rem] h-[35rem] md:h-[80%] bg-transparent flex flex-col shadow-lg border-t shadow-gray-400 md:flex-row rounded-lg overflow-hidden">
        <div className="w-full h-1/2 md:w-1/2 md:h-full bg-transparent flex justify-center items-center">
          <AdminLoginForm />
        </div>
        <div className="w-full h-1/2 md:w-1/2 md:h-full relative flex items-center justify-center md:justify-start">
          <div className="h-[500px] -top-10 md:top-0 md:h-full w-[100%] md:w-[50%] rotate-90 md:rotate-0 rounded-l-full absolute bg-opacity-40 bg-[#75CFC0] md:right-0 bottom-10"></div>
          <div className="h-[500px] -top-10 md:top-0 md:h-full w-[80%] md:w-[60%] rotate-90 md:rotate-0 rounded-l-full absolute bg-opacity-40 bg-[#9CDED2] md:right-0 bottom-10"></div>
          <div className="h-[500px] -top-10 md:top-0 md:h-full w-[50%] md:w-[70%] rotate-90 md:rotate-0 rounded-l-full absolute bg-opacity-40 bg-[#9FDFD1] md:right-0 bottom-10"></div>
          <img src={LoginImage} alt="image" className="relative w-36 md:w-96" />
        </div>
      </div>
    </div>
  );
}
