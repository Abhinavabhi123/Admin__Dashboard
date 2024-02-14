import Person from "../../../assets/Icons/person.png";
import Password from "../../../assets/Icons/lock.png";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { AdminLoginData } from "../../../Services/Constants";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .nullable(false)
      .min(6, "Enter minimum 6 characters")
      .required("Password is required"),
  });
  // const [error, setError] = useState({
  //   email: "",
  //   password: "",
  // });
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });
  const initialValues = {
    email: "",
    password: "",
  };

  const { handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      if (values.email !== AdminLoginData.email) {
        errors.email = "Email not matching";
        setSubmitting(false);
      } else if (values.password !== AdminLoginData.password) {
        errors.password = "Password is not matching";
        setSubmitting(false);
      } else {
        setSubmitting(true);
        navigate("/admin/dashboard");
      }
    },
  });

  return (
    <div className="w-full h-full p-5 md:space-y-28 space-y-8 ">
      <div className="flex justify-center mt-10">
        <h3 className="text-2xl font-semibold tracking-wider">Welcome back</h3>
      </div>
      <form
        className="w-full h-fit flex flex-col items-center gap-5 "
        onSubmit={handleSubmit}
      >
        <div className=" w-full md:w-[80%] h-10 flex items-center justify-center bg-white px-2 rounded-lg drop-shadow-lg border">
          <img src={Person} alt="person" className="w-6 h-6" />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            className="w-full h-10 ps-2 outline-none placeholder:text-sm"
            onChange={handleChange}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-500">{errors?.email}</p>
        )}
        <div className=" w-full md:w-[80%] h-10 flex items-center justify-center bg-white px-2 pr-3 rounded-lg drop-shadow-lg border">
          <img src={Password} alt="Password" className="w-6 h-6" />
          <input
            type={showPass ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Email password"
            className="w-full h-10 ps-2 outline-none placeholder:text-sm"
            onChange={handleChange}
          />
          {showPass ? (
            <FaRegEye
              className="cursor-pointer"
              onClick={() => setShowPass(false)}
            />
          ) : (
            <FaRegEyeSlash
              className="cursor-pointer"
              onClick={() => setShowPass(true)}
            />
          )}
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors?.password}</p>
        )}
        <div>
          <button
            type="submit"
            className="px-5 py-2 font-semibold rounded-md bg-[#75CFC0] z-50 "
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
