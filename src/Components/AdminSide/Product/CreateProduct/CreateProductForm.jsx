import FormBottomSection from "./Components/FormBottomSection";
import FormMiddleSection from "./Components/FormMiddleSection";
import FormTopSection from "./Components/FormTopSection";


export default function CreateProductForm() {
  return (
    <div className="w-full min-h-[50rem] space-y-5 py-4 ">
     <FormTopSection/>
     <FormMiddleSection />
     <FormBottomSection />
    </div>
  )
} 
