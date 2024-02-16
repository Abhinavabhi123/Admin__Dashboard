import { useEffect, useState } from "react";
import CreateProductImage from "./CreateProductImage";
import { RiErrorWarningLine } from "react-icons/ri";

export default function FormMiddleSection(Props) {
  const { handleChange, errors } = Props;
  const [price, setPrice] = useState({
    basePrice: 0,
    discount: 0,
    finalPrice: 0,
  });

//   setting values in the state
  function handleValue(e) {
    setPrice({
      ...price,
      [e.target.name]: e.target.value === "" ? 0 : parseInt(e.target.value),
    });
  }


// Calculating the discount price
  function calculateFinalPrice() {
    const basePrice = price.basePrice;
    const discount = price.discount;
    if (basePrice < 0) {
      setPrice({ ...price, finalPrice: 0 });
      return;
    }
    if (discount < 0) {
      setPrice({ ...price, finalPrice: basePrice });
      return;
    }

    const finalPrice = basePrice - (basePrice * discount) / 100;
    setPrice({ ...price, finalPrice: finalPrice });
  }

  useEffect(() => {
    calculateFinalPrice();
  }, [price.basePrice, price.discount]);

  return (
    <div className="w-full md:h-[30rem]  gap-3 bg-transparent flex flex-col md:flex-row max-[1170px]:flex-col ">
      {/* image section */}
      <div className="w-full md:1/3 h-full bg-white rounded-md shadow-lg drop-shadow-lg border flex flex-col p-4">
        <div className="">
          <h2 className="font-medium"> Product Image</h2>
        </div>
        <div className="mt-3 md:mt-0">
          <CreateProductImage />
        </div>
      </div>
      {/* Price section */}
      <div className="w-full md:1/3 h-full bg-white rounded-md shadow-lg drop-shadow-lg border space-y-3 flex flex-col p-4">
        <div className="mb-8">
          <h2 className="font-medium">Pricing</h2>
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex  w-full md:w-[80%]  flex-col space-y-2">
            <label className="text-sm truncate" htmlFor="basePrice">
              Base Price :{" "}
            </label>
            <div className="flex items-center justify-between bg-white px-4 rounded-md  border border-primary">
              <input
                type="number"
                name="basePrice"
                id="basePrice"
                placeholder="Enter Base Price"
                className="text-sm bg-transparent py-3 w-full outline-none placeholder:truncate"
                onChange={(e) => {
                  handleChange(e);
                  handleValue(e);
                }}
              />
              {errors.basePrice && <RiErrorWarningLine size={20} color="red" />}
            </div>

            <div className="px-2 h-4 ">
              {errors.basePrice && (
                <p className="text-xs text-red-500">{errors.basePrice}</p>
              )}
            </div>
          </div>
          <div className="flex gap-2 flex-col">
            <label htmlFor="currency" className="text-sm">
              Currency
            </label>
            <div className="border min-w-[60px] border-primary bg-white rounded-md py-[0.6rem] px-2 ">
              <select
                name="currency"
                id="currency"
                className="bg-transparent w-full rounded-md outline-none text-sm "
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="inr">INR</option>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="gbp">GBP</option>
              </select>
            </div>
            <div className="h-4 px-2">
              {errors.currency && (
                <p className="text-xs text-red-500">{errors.currency}</p>
              )}
            </div>
          </div>
        </div>
        {/* Discount input */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm truncate" htmlFor="discount">
            Discount in Percentage :{" "}
          </label>
          <input
            type="number"
            placeholder="Enter Discount Price"
            name="discount"
            id="discount"
            className="text-sm px-4 bg-transparent py-3 w-full outline-none border border-primary rounded-md"
            onChange={(e) => {
              handleChange(e), handleValue(e);
            }}
          />
          <div className="h-4 px-2">
            {errors.discount && (
              <p className="text-xs text-red-500">{errors.discount}</p>
            )}
          </div>
        </div>
        {/* Final Price */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm" htmlFor="finalPrice">
            Final Price :{" "}
          </label>
          <input
            type="number"
            name="finalPrice"
            id="finalPrice"
            value={price.finalPrice}
            placeholder="Final price will be calculated automatically."
            readOnly
            className="text-sm px-4 bg-transparent py-3 w-full outline-none border border-primary rounded-md"
            onChange={handleChange}
          />
        </div>
      </div>
      {/* Stock section */}
      <div className="w-full md:1/3 h-full rounded-md shadow-lg drop-shadow-lg border bg-white flex flex-col p-4  space-y-3">
        <div className="mb-8">
          <h2 className="font-medium">Stock Management</h2>
        </div>
        <div className="space-y-2">
          <label className="text-sm" htmlFor="stock">
            Stock
          </label>
          <div className="flex items-center justify-between bg-white px-4 rounded-md  border border-primary">
            <input
              type="number"
              id="stock"
              name="stock"
              placeholder="Enter the stock count"
              className="text-sm bg-transparent py-3 w-full outline-none "
              onChange={handleChange}
            />
            {errors.stock && <RiErrorWarningLine size={20} color="red" />}
          </div>
          <div className="px-2 h-4 ">
            {errors.stock && (
              <p className="text-xs text-red-500">{errors.stock}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
