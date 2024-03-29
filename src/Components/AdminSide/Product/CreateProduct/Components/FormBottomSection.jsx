import { RiErrorWarningLine } from "react-icons/ri";
import { useContext, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import countryList from "react-select-country-list";
import { MdDone } from "react-icons/md";
import "../create.css";
import { imageDataContext } from "../../../../../Pages/AdminPages/Product/CreateProduct";
import { Select } from "antd";

export default function FormBottomSection() {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const { handleChange, errors, handleBlur, touched, values, setFieldValue } =
    useContext(imageDataContext);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    // "indent",
    "ordered",
    "link",
    "image",
    // "video",
    // "code-block",
    // "undo",
  ];
  
  const status=[
    {
      value: "active",
      label: "Active",
    },
    {
      value: "Inactive",
      label: "Inactive",
    },
  ];
  return (
    <div className="w-fill  md:min-h-[30rem]  bg-transparent flex flex-col md:flex-row gap-4">
      {/* Left section */}
      <div className="w-full h-[28rem] md:h-[40rem] md:w-[60%] bg-white rounded-md shadow-lg drop-shadow-lg border space-y-3 flex flex-col p-4">
        {/* Text editor */}
        <div>
          <h2>Product description</h2>
        </div>
        <div className="w-full h-full">
          <div className="w-full max-h-[19rem] h-[83%] md:max-h-[30rem]">
            <ReactQuill
              theme="snow"
              value={value}
              name="description"
              modules={modules}
              formats={formats}
              onChange={(value) => {
                setValue(value), handleChange("description")(value);
              }}
              onBlur={() => handleBlur("description")}
              id="description"
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="px-2 h-4 ">
          {errors.description && touched.description && (
            <p className="text-xs text-red-500">{errors.description}</p>
          )}
        </div>
      </div>
      {/* Right section */}
      <div className="w-full h-full md:w-[40%] bg-white rounded-md shadow-lg drop-shadow-lg border space-y-3 flex flex-col p-4">
        <div className="mb-8">
          <h2 className="font-medium">Additional Details</h2>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm" htmlFor="import_status">
            Import Status :
          </label>
          <div className="flex bg-white items-center justify-between relative rounded-md border border-primary ">
            <Select
              id="import_status"
              name="import_status"
              className="border-none h-11 relative  placeholder:text-black "
              onChange={(value) => setFieldValue("import_status", value)}
              onBlur={handleBlur}
              value={values.import_status}
              style={{
                width: "100%",
                outline:"none"
              }}
              
            >
               <Select.Option value="" disabled hidden >Select</Select.Option>
               {
                status.map((item,index)=>{
                  return(
                    <Select.Option key={index} value={item.value}>{item.label}</Select.Option>
                  )
                })
               }
            </Select>
            {errors.import_status && touched.import_status && (
              <div className="absolute right-10 ">
                <RiErrorWarningLine size={20} color="red" />
              </div>
            )}
            {!errors.import_status && touched.import_status && (
              <div className="absolute right-10 ">
                <MdDone size={20} color="green" />
              </div>
            )}
          </div>
          <div className="px-2 h-4 ">
            {errors.import_status && touched.import_status && (
              <p className="text-xs text-red-500">{errors.import_status}</p>
            )}
          </div>
        </div>
        {/* Country section */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm" htmlFor="country">
            Country of Origin :
          </label>
          <div className="flex bg-white items-center justify-between relative rounded-md border border-primary ">
            <Select
              showSearch
              name="country"
              id="country"
              className="border-none h-11 "
              style={{ width: "100%"}}
              defaultValue={"Select"}
              placeholder="Search to Select"
              optionFilterProp="children"
              onChange={(value) => setFieldValue("country", value)}
              onBlur={handleBlur}
              value={values.country}
              
            >
              <Select.Option hidden value="" disabled> Select</Select.Option>
              {
                options.map((item,i)=>{
                  return(
                    <Select.Option key={i} value={item.value}>{item.label}</Select.Option>
                  )
                })
              }
            </Select>
            {errors.country && touched.country && (
              <div className="absolute right-10">
                <RiErrorWarningLine size={20} color="red" />
              </div>
            )}
            {!errors.country && touched.country && (
              <div className="absolute right-10">
                <MdDone size={20} color="green" />
              </div>
            )}
          </div>
          <div className="px-2 h-4 ">
            {errors.country && touched.country && (
              <p className="text-xs text-red-500">{errors.country}</p>
            )}
          </div>
        </div>
        {/* Released date section */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm" htmlFor="released">
            Released Date<span className="text-red-500 text-sm">*</span> :
          </label>
          <div className="flex items-center bg-white px-4 rounded-md  border border-primary">
            <input
              type="text"
              name="released"
              id="released"
              value={values.released}
              placeholder="Enter Released Date Eg.(dd/mm/yyyy)"
              className=" text-sm bg-transparent py-3 w-full outline-none"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.released && touched.released && (
              <RiErrorWarningLine size={20} color="red" />
            )}
            {!errors.released && touched.released && (
              <MdDone size={20} color="green" />
            )}
          </div>
          <div className="px-2 h-4 ">
            {errors.released && touched.released && (
              <p className="text-xs text-red-500">{errors.released}</p>
            )}
          </div>
        </div>
        {/* Warranty Length */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm" htmlFor="warranty">
            Warranty Length<span className="text-red-500 text-sm">*</span> :
          </label>
          <div className="flex items-center bg-white px-4 rounded-md  border border-primary">
            <input
              type="text"
              name="warranty"
              id="warranty"
              value={values.warranty}
              placeholder="Enter  Warranty Length"
              className=" text-sm bg-transparent py-3 w-full outline-none"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.warranty && touched.warranty && (
              <RiErrorWarningLine size={20} color="red" />
            )}
            {!errors.warranty && touched.warranty && (
              <MdDone size={20} color="green" />
            )}
          </div>
          <div className="px-2 h-4 ">
            {errors.warranty && touched.warranty && (
              <p className="text-xs text-red-500">{errors.warranty}</p>
            )}
          </div>
        </div>
        {/* Warranty Policy */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm" htmlFor="warrantyPolicy">
            Warranty Policy<span className="text-red-500 text-sm">*</span> :
          </label>
          <div className="flex items-center bg-white px-4 rounded-md  border border-primary">
            <input
              type="text"
              name="warrantyPolicy"
              id="warrantyPolicy"
              value={values.warrantyPolicy}
              placeholder="Enter  Warranty Policy"
              className=" text-sm bg-transparent py-3 w-full outline-none"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.warrantyPolicy && touched.warrantyPolicy && (
              <RiErrorWarningLine size={20} color="red" />
            )}
            {!errors.warrantyPolicy && touched.warrantyPolicy && (
              <MdDone size={20} color="green" />
            )}
          </div>
          <div className="px-2 h-4 ">
            {errors.warrantyPolicy && touched.warrantyPolicy && (
              <p className="text-xs text-red-500">{errors.warrantyPolicy}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
