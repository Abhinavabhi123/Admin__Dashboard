import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

export default function AllProduct() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
//   const []

  async function fetchData() {
    setPage(page + 5);
    await axios
      .get(`https://api.escuelajs.co/api/v1/products?offset=0&limit=${page}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res.data);
          setData(data.concat(res.data));
        }
      })
      .catch((error) => {
        console.error("error", error);
      });
  }

  useEffect(() => {
    (async () => {
      await axios
        .get(`https://api.escuelajs.co/api/v1/products?offset=0&limit=${page}`)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            console.log(res.data);
            setData(data.concat(res.data));
          }
        })
        .catch((error) => {
          console.error("error", error);
        });
    })()
  }, []);

  return (
    <div className="w-full h-full text-black py-6 space-y-5 mt-10 md:mt-0 ">
      <div className="w-full px-3 md:pe-4">
        <div className="w-full h-20  bg-primary flex items-center justify-between px-3 md:px-10 rounded-md shadow-xl">
          <h1 className="md:text-xl text-base font-medium">All Products</h1>
        </div>
      </div>
      <div className="w-full h-full bg-transparent px-4">
        <InfiniteScroll
          dataLength={data.length}
          next={fetchData}
          hasMore={true}
          loader={
            <div className="w-screen flex justify-center">
              Loading...
            </div>
          }
          className="w-full h-full bg-transparent grid grid-cols-5 gap-4"
        >
          {/* <div className="w-full"> */}
            {data.map((item) => (
              <div
                key={item.id}
                className="w-56 h-72 bg-violet-300/30 flex flex-col items-center space-y-4 justify-center rounded-md"
              >
                <img
                  src={item.category.image}
                  alt="product image"
                  className="size-48 rounded-md"
                />
                <h1 className="font-medium italic">{item.title}</h1>
                <p className="text-xl">{item.price}</p>
              </div>
            ))}
          {/* </div> */}
        </InfiniteScroll>
      </div>
    </div>
  );
}
