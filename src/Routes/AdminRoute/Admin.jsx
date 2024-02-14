import { Routes, Route } from "react-router-dom";
import { AdminDashboard, AdminLogin, UserManagement } from "../../Pages";
import AdminLayout from "../../Layouts/AdminLayout";
import ProductRoute from "./ProductRoute";

export default function Admin() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/product/*" element={<ProductRoute/>} />
        </Route>
      </Routes>
    </div>
  );
}

