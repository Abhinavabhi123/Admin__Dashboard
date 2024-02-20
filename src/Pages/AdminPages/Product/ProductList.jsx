import { useNavigate } from "react-router-dom";
import { ProductListTable } from "../../../Components";

export default function ProductList() {
    const navigate = useNavigate()
  return (
    <div className="w-full bg-transparent md:mt-4 mt-14 flex flex-col  md:pe-3 md:px-0 px-3">
        <div className="w-full h-20  bg-primary flex items-center justify-between px-3 md:px-10 rounded-md shadow-xl">
            <h1 className="md:text-xl text-base font-medium">
              Product List
            </h1>
            {/* <div className="flex  gap-3 text-sm md:text-base"> */}
              <button
                type="submit"
                className="bg-slate-100 px-4 py-2 rounded-md font-medium"
                onClick={()=>navigate("/admin/product/create")}
              >
                Create Product
              </button>
            {/* </div> */}
          </div>
      <div className="w-full bg-transparent">
        <ProductListTable />
      </div>
    </div>
  );
}
