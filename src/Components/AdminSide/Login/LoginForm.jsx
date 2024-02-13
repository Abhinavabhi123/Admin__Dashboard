import Person from "../../../assets/Icons/person.png";
import Password from "../../../assets/Icons/lock.png";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

export default function LoginForm() {
  const [showPass,setShowPass] = useState(false)
  return (
    <div className="w-full h-full p-5 md:space-y-28 space-y-8 ">
      <div className="flex justify-center mt-10">
        <h3 className="text-xl font-semibold">Welcome back</h3>
      </div>
      <form className="w-full h-fit flex flex-col items-center gap-5">
        <div className=" w-full md:w-[80%] h-10 flex items-center justify-center bg-white px-2 rounded-lg drop-shadow-lg border">
          <img src={Person} alt="person" className="w-6 h-6" />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            className="w-full h-10 ps-2 outline-none"
          />
        </div>
        <div className=" w-full md:w-[80%] h-10 flex items-center justify-center bg-white px-2 pr-3 rounded-lg drop-shadow-lg border">
          <img src={Password} alt="Password" className="w-6 h-6" />
          <input
            type={showPass ? 'text' : 'password'}
            name="password"
            id="password"
            placeholder="Email password"
            className="w-full h-10 ps-2 outline-none"
          />
          {
            showPass ?(<FaRegEye className="cursor-pointer" onClick={()=>setShowPass(false)}/>):(<FaRegEyeSlash className="cursor-pointer" onClick={()=>setShowPass(true)}/>)
          }
        </div>
        <div>
          <button type="submit" className="px-5 py-2 font-semibold rounded-md bg-[#75CFC0]">Login</button>
        </div>
      </form>
    </div>
  );
}
