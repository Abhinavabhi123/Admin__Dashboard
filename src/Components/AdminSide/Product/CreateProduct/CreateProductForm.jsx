export default function CreateProductForm(Props) {
  const { handleChange, errors } = Props;
  return (
    <div className="w-full md:w-1/2 h-fit md:h-full border-b md:border-r bg-transparent mb-5 md:mb-0 p-5 md:p-10">
      <div className="w-full h-full bg-transparent">
        <div className="md:p-5 py-2">
          <h2 className="w-full text-center">Product Details</h2>
          <p className="text-sm text-red-500 mt-3 mb-3 md:mb-0">
            Required Field<span>*</span>
          </p>
        </div>
        <div className="w-full h-full flex flex-col gap-5 bg-transparent">
          {/* section 1 */}
          <div className="flex flex-col md:flex-row md:justify-center space-y-4 md:space-y-0 md:gap-3 flex-wrap">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm">
                Product Name <span className="text-red-500 ">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="py-2 md:w-64 ps-2 rounded-md outline-none border border-primary text-sm"
                placeholder="Product Name"
                onChange={handleChange}
                required
              />

              <div className="w-full h-3">{
                errors.name&& <p className="text-xs text-red-500">{errors.name}</p>
              }</div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="price" className="text-sm">
                Product Price <span className="text-red-500 ">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="py-2 md:w-64 ps-2 rounded-md outline-none border border-primary text-sm"
                placeholder="Product Price"
                onChange={handleChange}
                required
              />
              <div className="w-full h-3 ">{
                errors.price && <p className="text-xs text-red-500">{errors.price}</p>
              }</div>
            </div>
          </div>

          {/* section 2 */}
          <div className="flex flex-col md:flex-row md:justify-center space-y-4 md:space-y-0 md:gap-3 flex-wrap">
            <div className="flex flex-col gap-1">
              <label htmlFor="offer" className="text-sm">
                Offer Price <span className="text-red-500 ">*</span>
              </label>
              <input
                type="number"
                id="offer"
                name="offer"
                className="py-2 md:w-64 ps-2 rounded-md outline-none border border-primary text-sm"
                placeholder="Offer Price"
                onChange={handleChange}
                required
              />
              <div className="w-full h-3 ">{
                errors.offer&& <p className="text-xs text-red-500">{errors.offer}</p>
              }</div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="stock" className="text-sm">
                Product Stock <span className="text-red-500 ">*</span>
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                className="py-2 md:w-64 ps-2 rounded-md outline-none border border-primary text-sm"
                placeholder="Product Stock"
                onChange={handleChange}
                required
              />
                <div className="w-full h-3 ">{
                errors.stock&& <p className="text-xs text-red-500">{errors.stock}</p>
              }</div>
            </div>
          </div>
          {/* section 3 */}
          <div className="flex flex-col md:flex-row md:justify-center space-y-4 md:space-y-0 md:gap-3 flex-wrap">
            <div className="flex flex-col gap-1">
              <label htmlFor="category" className="text-sm">
                Category <span className="text-red-500 ">*</span>
              </label>
              <select
                id="category"
                name="category"
                className="py-2 md:w-64 ps-2 rounded-md outline-none border border-primary text-sm"
                onChange={handleChange}
                required
              >
                <option value>Select Category</option>
                <option value="Active">Home Appliances</option>
                <option value="Inactive">Electronics</option>
                <option value="Inactive">Dress</option>
                <option value="Inactive">Foot Wear</option>
                <option value="Inactive">Food</option>
              </select>
              <div className="w-full h-3">{
                errors.category&& <p  className="text-xs text-red-500">{errors.category}</p>
              }</div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="status" className="text-sm">
                Product Status <span className="text-red-500 ">*</span>
              </label>
              <select
                id="status"
                name="status"
                className="py-2 md:w-64 ps-2 rounded-md outline-none border border-primary text-sm"
                onChange={handleChange}
                required
              >
                <option value>Select Product status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="w-full h-3 ">{
                errors.status&& <p className="text-xs text-red-500">{errors.status}</p>
              }</div>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-center  md:px-12">
            <label
              htmlFor="description"
              className="text-sm w-full text-start min-w-[16rem]"
            >
              Product Description <span className="text-red-500 ">*</span>
            </label>
            <textarea
              name="description"
              id="description"
              className="w-full min-w-[16rem] md:w-full  ps-2 rounded-md outline-none text-sm border border-primary py-2"
              rows="8"
              placeholder="Product Description"
              onChange={handleChange}
              required
            ></textarea>
             <div className="w-full h-3 ">{
                errors.description&& <p className="text-xs w-full text-start md:ps-12 text-red-500">{errors.description}</p>
              }</div>
          </div>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              className="py-2 px-3 text-sm font-medium bg-red-400 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-3 text-sm font-medium bg-primary rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
