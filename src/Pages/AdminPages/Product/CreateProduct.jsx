import { CreateProductForm } from "../../../Components";


export default function CreateProduct() {
  return (
    <div className="w-full h-full bg-transparent mt-20 md:mt-0 pt-2 flex flex-col justify-center">
      <div className="w-full h-10 flex justify-center">
        <h1 className="text-xl">Create Product</h1>
      </div>
      <div className="w-full h-full">
        <CreateProductForm/>
      </div>
    </div>
  )
}
