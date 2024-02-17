
import { RiErrorWarningLine } from "react-icons/ri";


export default function FormTopSection(Props) {
  const { handleChange, errors } = Props;



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
              placeholder="Enter Product Name"
              className=" text-sm bg-transparent py-3 w-full outline-none"
              onChange={handleChange}
            />
            {errors.name && <RiErrorWarningLine size={20} color="red" />}
          </div>
          <div className="px-2 h-4 ">
            {errors.name && (
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
              placeholder="Enter Manufacturer Name"
              className=" text-sm bg-transparent py-3 w-full outline-none"
              onChange={handleChange}
            />
            {errors.manufacturer && (
              <RiErrorWarningLine size={20} color="red" />
            )}
          </div>
          <div className="px-2 h-4 ">
            {errors.manufacturer && (
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
              placeholder="Enter Identification No"
              className=" text-sm bg-transparent py-3 w-full outline-none"
              onChange={handleChange}
            />
            {errors.identification && (
              <RiErrorWarningLine size={20} color="red" />
            )}
          </div>
          <div className="px-2 h-4 ">
            {errors.identification && (
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
              placeholder="Enter Product Summery"
              className=" text-sm bg-transparent py-3 w-full outline-none"
              onChange={handleChange}
            />
            {errors.summery && <RiErrorWarningLine size={20} color="red" />}
          </div>
          <div className="px-2 h-4 ">
            {errors.summery && (
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
            <div className="flex bg-white items-center justify-between p-[0.6rem] relative rounded-md border border-primary ">
              {errors.category && (
                <div className="absolute right-10">
                  <RiErrorWarningLine size={20} color="red" />
                </div>
              )}
              <select
                name="category"
                id="category"
                className="w-full outline-none text-sm py-1"
                onChange={handleChange}
              >
                <option value="">Please select </option>
                <option value="ele">electronics</option>
              </select>
            </div>
            <div className="px-2 h-4 ">
              {errors.category && (
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
            <div className="flex bg-white items-center justify-between p-[0.6rem] relative rounded-md border border-primary ">
              {errors.subcategory && (
                <div className="absolute right-10">
                  <RiErrorWarningLine size={20} color="red" />
                </div>
              )}
              <select
                name="subcategory"
                id="subcategory"
                className="w-full outline-none text-sm py-1"
                onChange={handleChange}
              >
                <option value="">Please select</option>
                <option value="lap">lapTop</option>
              </select>
            </div>
            <div className="px-2 h-4 ">
              {errors.subcategory && (
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
            {/* sectoin 1 */}
            <div className="flex flex-col space-y-2">
            <label className="text-sm" htmlFor="keyword">
              Select keyword<span className="text-red-500 text-sm">*</span>{" "}
              :
            </label>
            <div className="flex bg-white items-center justify-between p-[0.6rem] relative rounded-md border border-primary ">
              {errors.keyword && (
                <div className="absolute right-10">
                  <RiErrorWarningLine size={20} color="red" />
                </div>
              )}
              <select
                name="keyword"
                id="keyword"
                className="w-full outline-none text-sm py-1"
                onChange={handleChange}
             >
                <option value="">Please Tag</option>
                <option value="tag 1">Please 1</option>
              </select>
            </div>
            <div className="px-2 h-4 ">
              {errors.keyword && (
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
