import FormBottomSection from "./Components/FormBottomSection";
import FormMiddleSection from "./Components/FormMiddleSection";
import FormTopSection from "./Components/FormTopSection";


export default function CreateProductForm(Props) {
  const {handleChange,errors,setFieldValue} = Props
  return (
    <div className="w-full min-h-[50rem] space-y-5 py-4 ">
     <FormTopSection handleChange={handleChange} errors={errors} />
     <FormMiddleSection handleChange={handleChange} errors={errors} setFieldValue={setFieldValue} />
     <FormBottomSection handleChange={handleChange} errors={errors} />
    </div>
  )
} 
