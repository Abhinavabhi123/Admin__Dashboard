import { useContext, useEffect, useState } from "react";
import CreateProductImage from "./CreateProductImage";
import { RiErrorWarningLine } from "react-icons/ri";
import { MdDone } from "react-icons/md";
import "../create.css";
import { imageDataContext } from "../../../../../Pages/AdminPages/Product/CreateProduct";
import { Select } from "antd";

export default function FormMiddleSection() {
  const { handleChange, errors, handleBlur, touched, values, setFieldValue } =
    useContext(imageDataContext);
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
          <CreateProductImage
            errors={errors}
            handleBlur={handleBlur}
            touched={touched}
          />
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
                onBlur={handleBlur}
              />
              {errors.basePrice && touched.basePrice && (
                <RiErrorWarningLine size={20} color="red" />
              )}
              {!errors.basePrice && touched.basePrice && values.basePrice ? (
                <MdDone size={20} color="green" />
              ) : (
                ""
              )}
            </div>

            <div className="px-2 h-4 ">
              {errors.basePrice && touched.basePrice && (
                <p className="text-xs text-red-500">{errors.basePrice}</p>
              )}
            </div>
          </div>
          <div className="flex gap-2 flex-col">
            <label htmlFor="currency" className="text-sm">
              Currency
            </label>
            <div className="border w-28 min-w-20 border-primary bg-white rounded-md ">
              <Select
                name="currency"
                id="currency"
                value={values.currency}
                className="border-none h-11 relative hover:outline-none placeholder:text-black"
                onChange={(value) => setFieldValue("currency", value)}
                onBlur={handleBlur}
                style={{
                  width: "100%",
                }}
              >
                <Select.Option value="" disabled hidden>Select</Select.Option>

                {[
                  {
                    value: "inr",
                    label: "INR",
                  },
                  {
                    value: "usd",
                    label: "USD",
                  },
                  {
                    value: "eur",
                    label: "EUR",
                  },
                  {
                    value: "gbp",
                    label: "GBP",
                  },
                ].map((item, index) => {
                  return <Select.Option key={index} value={item.value}>{item.label}</Select.Option>;
                })}
              </Select>
            </div>
            <div className="h-4 px-2">
              {errors.currency && touched.currency && (
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
            onBlur={handleBlur}
          />
          <div className="h-4 px-2">
            {errors.discount && touched.discount && (
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
              onBlur={handleBlur}
            />
            {errors.stock && touched.stock && (
              <RiErrorWarningLine size={20} color="red" />
            )}
            {!errors.stock && touched.stock && values.stock ? (
              <MdDone size={20} color="green" />
            ) : (
              ""
            )}
          </div>
          <div className="px-2 h-4 ">
            {errors.stock && touched.stock && (
              <p className="text-xs text-red-500">{errors.stock}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
