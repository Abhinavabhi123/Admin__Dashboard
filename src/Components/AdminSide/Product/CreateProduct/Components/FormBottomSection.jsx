import { RiErrorWarningLine } from "react-icons/ri";

export default function FormBottomSection(Props) {
  const { handleChange, errors } = Props;
  return (
    <div className="w-fill md:min-h-[30rem]  bg-transparent flex flex-col md:flex-row gap-4">
      {/* Left section */}
      <div className="w-full h-[32.5rem] md:w-[60%] bg-white rounded-md shadow-lg drop-shadow-lg border space-y-3 flex flex-col p-4">
        <h1>Text Editor</h1>
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
          <div className="flex bg-white items-center justify-between p-[0.6rem] relative rounded-md border border-primary ">
            {errors.import_status && (
              <div className="absolute right-10 ">
                <RiErrorWarningLine size={20} color="red" />
              </div>
            )}
            <select
              className="w-full outline-none text-sm py-1"
              id="import_status"
              name="import_status"
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="px-2 h-4 ">
            {errors.import_status && (
              <p className="text-xs text-red-500">{errors.import_status}</p>
            )}
          </div>
        </div>
        {/* Country section */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm" htmlFor="country">
            Country of Origin :
          </label>
          <div className="flex bg-white items-center justify-between p-[0.6rem] relative rounded-md border border-primary ">
            {errors.country && (
              <div className="absolute right-10">
                <RiErrorWarningLine size={20} color="red" />
              </div>
            )}
            <select
              className=" bg-transparent w-full text-sm rounded-md outline-none"
              id="country"
              name="country"
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="ind">India</option>
              <option value="usa">USA</option>
            </select>
          </div>
          <div className="px-2 h-4 ">
            {errors.country && (
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
              placeholder="Enter Released Date Eg.(dd/mm/yyyy)"
              className=" text-sm bg-transparent py-3 w-full outline-none"
              onChange={handleChange}
            />
            {errors.released && <RiErrorWarningLine size={20} color="red" />}
          </div>
          <div className="px-2 h-4 ">
            {errors.released && (
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
              placeholder="Enter  Warranty Length"
              className=" text-sm bg-transparent py-3 w-full outline-none"
              onChange={handleChange}
            />
            {errors.warranty && <RiErrorWarningLine size={20} color="red" />}
          </div>
          <div className="px-2 h-4 ">
            {errors.warranty && (
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
              placeholder="Enter  Warranty Policy"
              className=" text-sm bg-transparent py-3 w-full outline-none"
              onChange={handleChange}
            />
            {errors.warrantyPolicy && <RiErrorWarningLine size={20}  color="red"/>}
          </div>
          <div className="px-2 h-4 ">
            {errors.warrantyPolicy && (
              <p className="text-xs text-red-500">{errors.warrantyPolicy}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
