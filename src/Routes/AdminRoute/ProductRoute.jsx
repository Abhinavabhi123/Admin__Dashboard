import { Routes, Route } from "react-router-dom";
import { CreateProduct, ProductList } from "../../Pages";

export default function ProductRoute() {
  return (
    <Routes>
       <Route path="/create" element={<CreateProduct />} />
       <Route path="/product-list" element={<ProductList />} />
    </Routes>
  )
}
