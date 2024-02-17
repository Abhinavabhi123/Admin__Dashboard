import { RiErrorWarningLine } from "react-icons/ri";
import { MdDone } from "react-icons/md";
import "../create.css";
import { imageDataContext } from "../../../../../Pages/AdminPages/Product/CreateProduct";
import { useContext } from "react";
import { Select } from "antd";

export default function FormTopSection() {
  const { handleChange, errors, handleBlur, touched, values, setFieldValue } =
    useContext(imageDataContext);

  const category = [
    {
      value: "Electronics",
      label: "Electronics",
    },
    {
      value: "Dress",
      label: "Dress",
    },
    {
      value: "Footwear",
      label: "Footwear",
    },
    {
      value: "Food",
      label: "Food",
    },
    {
      value: "Home appliances",
      label: "Home appliances",
    },
  ];

  const subCategory = [
    {
      value: "lap Top",
      label: "lap Top",
    },
    {
      value: "Mobile",
      label: "Mobile",
    },
    {
      value: "TV",
      label: "TV",
    },
    {
      value: "PC",
      label: "PC",
    },
  ];
  const keyword = [
    {
      value: "Tag 1",
      label: "Tag 1",
    },
    {
      value: "Tag 2",
      label: "Tag 2",
    },
    {
      value: "Tag 3",
      label: "Tag 3",
    },
    {
      value: "Tag 4",
      label: "Tag 4",
    },
  ];

  return (
    <div className="w-full h-fit md:min-h-[32rem] flex flex-col md:flex-row bg-transparent gap-3">
      {/* left section */}
      <div className="md:w-[60%] h-full bg-white shadow-lg drop-shadow-lg rounded-md p-4 space-y-2">
        <div className="mb-8">
          <h2 className="font-medium">General information</h2>
        </div>
        {/* input section one */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm" htmlFor="name">
            Product Name<span className="text-red-500 text-sm">*</span> :
          </label>
          <div className="flex items-center bg-white px-4 rounded-md  border border-primary">
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              placeholder="Enter Product Name"
              className=" text-sm bg-transparent py-3 w-full outline-none"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name && (
              <RiErrorWarningLine size={20} color="red" />
            )}
            {!errors.name && touched.name && <MdDone size={20} color="green" />}
          </div>
          <div className="px-2 h-4 ">
            {errors.name && touched.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
            )}
          </div>
        </div>
        {/* input section two */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm" htmlFor="manufacturer">
            Manufacturer Name<span className="text-red-500 text-sm">*</span> :
          </label>
          <div className="flex items-center bg-white px-4 rounded-md  border border-primary">
            <input
              type="text"
              name="manufacturer"
              id="manufacturer"
              value={values.manufacturer}
              placeholder="Enter Manufacturer Name"
              className=" text-sm bg-transparent py-3 w-full outline-none"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.manufacturer && touched.manufacturer && (
              <RiErrorWarningLine size={20} color="red" />
            )}
            {!errors.manufacturer && touched.manufacturer && (
              <MdDone size={20} color="green" />
            )}
          </div>
          <div className="px-2 h-4 ">
            {errors.manufacturer && touched.manufacturer && (
              <p className="text-xs text-red-500">{errors.manufacturer}</p>
            )}
          </div>
        </div>
        {/* input section three */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm" htmlFor="identification">
            Product Identification No
            <span className="text-red-500 text-sm">*</span> :
          </label>
          <div className="flex items-center bg-white px-4 rounded-md  border border-primary">
            <input
              type="text"
              name="identification"
              id="identification"
              value={values.identification}
              placeholder="Enter Identification No"
              className=" text-sm bg-transparent py-3 w-full outline-none"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.identification && touched.identification && (
              <RiErrorWarningLine size={20} color="red" />
            )}
            {!errors.identification && touched.identification && (
              <MdDone size={20} color="green" />
            )}
          </div>
          <div className="px-2 h-4 ">
            {errors.identification && touched.identification && (
              <p className="text-xs text-red-500">{errors.identification}</p>
            )}
          </div>
        </div>
        {/* input section four */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm" htmlFor="summery">
            Product Summery<span className="text-red-500 text-sm">*</span> :
          </label>
          <div className="flex items-center bg-white px-4 rounded-md  border border-primary">
            <input
              type="text"
              name="summery"
              id="summery"
              value={values.summery}
              placeholder="Enter Product Summery"
              className=" text-sm bg-transparent py-3 w-full outline-none"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.summery && touched.summery && (
              <RiErrorWarningLine size={20} color="red" />
            )}
            {!errors.summery && touched.summery && (
              <MdDone size={20} color="green" />
            )}
          </div>
          <div className="px-2 h-4 ">
            {errors.summery && touched.summery && (
              <p className="text-xs text-red-500">{errors.summery}</p>
            )}
          </div>
        </div>
      </div>
      {/* right section */}
      <div className="w-full md:min-w-[10rem] md:w-[40%] h-full bg-transparent  rounded-md flex flex-col gap-3">
        {/* Top section */}
        <div className="w-full h-fit bg-white rounded-md p-4 shadow-lg drop-shadow-lg space-y-3">
          <div className="mb-8">
            <h2 className="font-medium">Type</h2>
          </div>
          {/* sectoin 1 */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm" htmlFor="category">
              Select Category<span className="text-red-500 text-sm">*</span> :
            </label>
            <div className="flex bg-white items-center justify-between relative rounded-md border border-primary ">
              {/* <select
                name="category"
                value={values.category}
                id="category"
                className="w-full outline-none text-sm rounded-md py-3 form_select px-2"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="" disabled  hidden>Please select </option>
                <option className="form_select_option" value="ele">Electronics</option>
                <option className="form_select_option" value="ele">Dress</option>
                <option className="form_select_option" value="ele">Footwear</option>
                <option className="form_select_option" value="ele">Food</option>
                <option className="form_select_option" value="ele">Home appliances</option>
              </select> */}

              <Select
                showSearch
                name="category"
                value={values.category}
                id="category"
                className="border-none h-10 hover:outline-none"
                style={{ width: "100%", border: "none" }}
                defaultValue={"Select"}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                onChange={(value) => setFieldValue("category", value)}
                onBlur={handleBlur}
                options={category}
              />
              {errors.category && touched.category && (
                <div className="absolute right-10">
                  <RiErrorWarningLine size={20} color="red" />
                </div>
              )}
              {!errors.category && touched.category && (
                <div className="absolute right-10">
                  <MdDone size={20} color="green" />
                </div>
              )}
            </div>
            <div className="px-2 h-4 ">
              {errors.category && touched.category && (
                <p className="text-xs text-red-500">{errors.category}</p>
              )}
            </div>
          </div>
          {/* section 2 */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm" htmlFor="subcategory">
              Select sub-Category<span className="text-red-500 text-sm">*</span>{" "}
              :
            </label>
            <div className="flex bg-white items-center justify-between  relative rounded-md border border-primary ">
              {/* <select
                name="subcategory"
                id="subcategory"
                value={values.subcategory}
                className="w-full outline-none text-sm rounded-md py-3 px-2 form_select"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="" disabled hidden>
                  Please select
                </option>
                <option className="form_select_option" value="lap">
                  lap Top
                </option>
                <option className="form_select_option" value="mob">
                  Mobile
                </option>
                <option className="form_select_option" value="tv">
                  TV
                </option>
                <option className="form_select_option" value="pc">
                  PC
                </option>
              </select> */}
              <Select
                showSearch
                name="subcategory"
                id="subcategory"
                value={values.subcategory}
                className="border-none h-10 hover:outline-none"
                style={{ width: "100%", border: "none" }}
                defaultValue={"Select"}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                onChange={(value) => setFieldValue("subcategory", value)}
                onBlur={handleBlur}
                options={subCategory}
              />
              {errors.subcategory && touched.subcategory && (
                <div className="absolute right-10">
                  <RiErrorWarningLine size={20} color="red" />
                </div>
              )}
              {!errors.subcategory && touched.subcategory && (
                <div className="absolute right-10">
                  <MdDone size={20} color="green" />
                </div>
              )}
            </div>
            <div className="px-2 h-4 ">
              {errors.subcategory && touched.subcategory && (
                <p className="text-xs text-red-500">{errors.subcategory}</p>
              )}
            </div>
          </div>
        </div>
        {/* bottom section */}
        <div className="w-full h-1/2  rounded-md">
          <div className="w-full h-fit bg-white shadow-lg drop-shadow-lg rounded-md p-4  space-y-3">
            <div className="mb-8">
              <h2 className="font-medium">Tags</h2>
            </div>
            {/* section 1 */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm" htmlFor="keyword">
                Select keyword<span className="text-red-500 text-sm">*</span> :
              </label>
              <div className="flex bg-white items-center justify-between  relative rounded-md border border-primary ">
                {/* <select
                  name="keyword"
                  id="keyword"
                  value={values.keyword}
                  className="w-full  text-sm py-3 rounded-md px-2 form_select"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="" disabled hidden>
                    Please Tag
                  </option>
                  <option className="form_select_option" value="tag 1">
                    Tag 1
                  </option>
                  <option className="form_select_option" value="tag 2">
                    Tag 2
                  </option>
                  <option className="form_select_option" value="tag 3">
                    Tag 3
                  </option>
                  <option className="form_select_option" value="tag 4">
                    Tag 4
                  </option>
                </select> */}
                <Select
                  showSearch
                  name="keyword"
                  id="keyword"
                  value={values.keyword}
                  className="border-none h-10 hover:outline-none"
                  style={{ width: "100%", border: "none" }}
                  defaultValue={"Select"}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  onChange={(value) => setFieldValue("keyword", value)}
                  onBlur={handleBlur}
                  options={keyword}
                />
                {errors.keyword && touched.keyword && (
                  <div className="absolute right-10">
                    <RiErrorWarningLine size={20} color="red" />
                  </div>
                )}
                {!errors.keyword && touched.keyword && (
                  <div className="absolute right-10">
                    <MdDone size={20} color="green" />
                  </div>
                )}
              </div>
              <div className="px-2 h-4 ">
                {errors.keyword && touched.keyword && (
                  <p className="text-xs text-red-500">{errors.keyword}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
