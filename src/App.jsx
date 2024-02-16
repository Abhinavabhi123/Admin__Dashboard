import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserHomePage } from "./Pages";
import Admin from "./Routes/AdminRoute/Admin";

export default function App() {
  window.scrollTo(0,0)
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserHomePage />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </Router>
  );
}
