import { Routes, Route } from "react-router-dom";
import { AdminDashboard, AdminLogin, UserManagement } from "../../Pages";
import AdminLayout from "../../Layouts/AdminLayout";

export default function Admin() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/users" element={<UserManagement />} />
        </Route>
      </Routes>
    </div>
  );
}

{
  /* <Route
  path="/dashboard/*"
  element={
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/users" element={<UserManagement />} />
      </Routes>
    </AdminLayout>
  }
/> */
}
