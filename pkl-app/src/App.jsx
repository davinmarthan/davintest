import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman Login */}
        <Route path="/" element={<LoginForm />} />
        
        {/* Halaman Register */}
        <Route path="/register" element={<RegisterForm />} />

        {/* Halaman Setelah Login */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;