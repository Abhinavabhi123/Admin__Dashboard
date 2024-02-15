import { CreateProductFrom, CreateProductImage } from "../../../Components";
import { useFormik } from "formik";
import * as Yup from 'yup';



export default function CreateProduct() {

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
    price: Yup.number().moreThan(-1, 'Price must be a non-negative number').required('Price is required'),
    offer: Yup.number().moreThan(-1, 'Offer must be a non-negative number').required('Offer is required'),
    stock: Yup.number().moreThan(-1, 'Stock must be a non-negative number').required('Stock is required'),
    category: Yup.string().required('Category is required'),
    status: Yup.string().required('Status is required'),
    description: Yup.string().required('Description is required'),
  });

  const initialValues = {
    name: "",
    price: 0,
    offer: 0,
    stock: 0,
    category: "",
    status: "",
    // description: "",
  };
  
  const {  handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      alert("Form submitted Successfully")
      console.log("Success");
    },
  });

  return (
    <div className="w-full h-full bg-transparent mt-20 md:mt-5 pt-2 flex flex-col justify-center">
      <div className="w-full h-10 flex justify-center">
        <h1 className="text-xl">Create Product</h1>
      </div>
      <div className="w-full h-full">
        <form className="w-full h-fit bg-transparent flex flex-col md:flex-row" onSubmit={handleSubmit}>
          <CreateProductFrom handleChange={handleChange} errors={errors} />
          <CreateProductImage />
        </form>
      </div>
    </div>
  );
}
