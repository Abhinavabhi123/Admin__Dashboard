import { Routes, Route } from "react-router-dom";
import { CreateProduct } from "../../Pages";

export default function ProductRoute() {
  return (
    <Routes>
       <Route path="/create" element={<CreateProduct />} />
    </Routes>
  )
}
