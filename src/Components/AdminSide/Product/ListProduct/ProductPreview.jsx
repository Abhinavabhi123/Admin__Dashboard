import { useState } from "react";

export default function ProductPreview(Props) {
  const { setShowDetails, data } = Props;

  const [showImage, setShowImage] = useState(0);

  function changeImage(i){
    setShowImage(i)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center transition-all overflow-hidden duration-1000 justify-center bg-black bg-opacity-15 backdrop-blur-sm">
      <div className="bg-white p-3 md:p-5 rounded-lg overflow-hidden w-[90%] md:w-[75%] h-[85%] md:h-[38rem] lg:h-[35rem]">
        <div className="flex justify-between p-2">
          <h2 className="md:text-xl font-medium italic text-base">
            Product Preview
          </h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={() => setShowDetails(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="w-full h-[92%] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row bg-transparent gap-5 border border-primary rounded-md">
          <div className=" w-full h-2/3 md:w-1/2 md:h-full bg-transparent flex flex-col md:flex-row">
            <div className="w-full h-full md:w-[80%] md:h-full bg-transparent flex justify-center items-center">
              <div className="w-36 md:w-1/2 md:min-w-36 aspect-square rounded-md bg-transparent flex justify-center drop-shadow-xl   items-center">
                <img
                  src={data.Image}
                  alt="product image"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </div>
            <div className="md:w-[20%]  h-36 md:h-full bg-transparent px-3 md:px-0 flex md:flex-col justify-center items-center gap-1">
              {[1, 2, 3, 4, 5].map((item, i) => (
                <div key={i} className={`w-full md:w-[70%] aspect-square ${showImage===i&&"md:border-[5px] border-2"}  border-primary m-1`} onClick={()=>changeImage(i)}>
                  <img src={data.Image} alt="product image" />
                </div>
              ))}
            </div>
          </div>
          <div className=" w-full h-fit md:w-1/2 md:h-full bg-transparent md:py-2 font-serif">
            <div className="flex justify-center items-center">
              <h1 className="font-semibold italic">{data.Name}</h1>
            </div>
            <div className="w-full text-xs md:text-sm tracking-wider ps-4 ">
              <p>ProductId : {data.ProductId}</p>
              <p>Category : {data.Category}</p>
              <p>Sub-Category : {data.Sub_Category}</p>
              <p>Base Price : {data.Base_Price}</p>
              <p>Final Price : {data.Price}</p>
              <p>Discount : {data.Discount}</p>
              <p>Stock : {data.Stock}</p>
              <p>Manufacturer : {data.Manufacturer}</p>
              <p>Currency : {data.Currency}</p>
              <p>Country : {data.Country}</p>
              <p>Released Date : {data.Released}</p>
              <p>Warranty : {data.Warranty}</p>
              <p>Status : {data.Status === true ? "True" : "False"}</p>
              <p>Date : {data.Released}</p>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-3 p-4">
              <div className="w-full md:w-1/2 space-y-1">
                <h2>Summery</h2>
                <p className="text-xs max-h-[7rem] ps-2 overflow-y-auto   md:text-sm">
                  {data.Summery}
                </p>
              </div>
              <div className="w-full md:w-1/2 space-y-1">
                <h2>Description</h2>
                <p className="text-xs  max-h-[7rem] ps-2 overflow-y-auto   md:text-sm">
                  {data.Description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
