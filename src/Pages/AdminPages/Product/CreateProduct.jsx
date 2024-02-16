import { CreateProductFrom} from "../../../Components";
import { useFormik } from "formik";
import * as Yup from 'yup';

export default function CreateProduct() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Name must be at least 2 characters').matches(/^[a-zA-Z\s.]*$/, 'Only alphabets, spaces, and dot characters are allowed' ).required('Name is required'),
    basePrice: Yup.number().moreThan(-1 , 'Price must be a non-negative number').required('Price is required'),
    stock: Yup.number().moreThan(-1, 'Stock must be a non-negative number').required('Stock is required'),
    category: Yup.string().matches(/^[a-zA-Z\s.]*$/, 'Only alphabets, spaces, and dot characters are allowed' ).required('Category is required'),
    manufacturer: Yup.string().matches(/^[a-zA-Z\s.]*$/, 'Only alphabets, spaces, and dot characters are allowed' ).required('Manufacturer is required'),
    identification: Yup.string().matches(/^[a-zA-Z0-9_.]+$/,'Only letters, numbers, underscore, and dot are allowed').required('Identification is required'),
    summery: Yup.string().required('Summary is required'),
    subcategory: Yup.string().matches(/^[a-zA-Z\s.]*$/, 'Only alphabets, spaces, and dot characters are allowed' ).required('Subcategory is required'),
    keyword: Yup.string().required('Keyword is required'),
    currency: Yup.string().required('Currency is required'),
    discount: Yup.number("Discount should be a number").moreThan(-1 , 'Price must be a non-negative number').optional(),
    import_status: Yup.string().required('Import status is required'),
    country: Yup.string().required('Country is required'),
    released: Yup.string()  .matches(
      /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/,
      'Enter date in dd/mm/yyyy format'
    )
    .test('is-before-today', 'Released date must be before today', function(value) {
      if (!value) return true; // Skip validation if value is not provided
      const dateParts = value.split('/');
      const year = parseInt(dateParts[2], 10);
      const month = parseInt(dateParts[1], 10) - 1; // Months are 0-indexed in JavaScript Date object
      const day = parseInt(dateParts[0], 10);
      const releaseDate = new Date(year, month, day);
      const today = new Date();
      return releaseDate < today;
    })
    .required('Released date is required'),
    warranty: Yup.string().matches(/^[a-zA-Z0-9 _.\s]*$/, 'Only letters, numbers, spaces, underscores, and periods are allowed').required('Warranty is required'),
    warrantyPolicy: Yup.string().required('Warranty is required'),
  });
  
  const initialValues = {
    name: '',
    manufacturer: '',
    identification: '',
    summery: '',
    category: '',
    subcategory: '',
    keyword: '',
    basePrice: 0,
    currency: '',
    discount: 0,
    finalPrice:0,
    stock: 0,
    import_status: '',
    country: '',
    released: '',
    warranty: '',
    warrantyPolicy: '',
  };

  
  const { handleChange, handleSubmit, errors,resetForm } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm } ) => {
      console.log(values );
      alert("Form submitted Successfully")
      console.log("Success");
      resetForm();
    },
  });
  
  console.log(errors);
  return (
    <div className="w-full h-full bg-transparent mt-14 md:mt-0 pt-2 flex flex-col justify-center">
      <div className="w-full h-full">
        <form className="w-full h-fit bg-transparent flex flex-col pe-4 ps-4 md:ps-0"  onSubmit={handleSubmit}>
          <div className="w-full h-20 bg-primary flex items-center justify-between px-3 md:px-10 rounded-md shadow-xl">
            <h1 className="md:text-xl text-base font-medium">Create a Product</h1>
            <div className="flex  gap-3 text-sm md:text-base">
              <button type="reset" className=" px-4 py-2 rounded-md font-medium" onClick={()=>resetForm()}>Discard</button>
              <button type="submit" className="bg-slate-100 px-4 py-2 rounded-md font-medium">Add Product</button>
            </div>
          </div>
          {/* <div className=""> */}
            <CreateProductFrom handleChange={handleChange} errors={errors} />
          {/* </div> */}
        </form>
      </div>
    </div>
  );
}
