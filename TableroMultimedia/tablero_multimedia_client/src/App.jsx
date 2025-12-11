import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Inicio from "./components/inicio";
import PrivateRoute from "./components/privateroute/privateroute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route path="/inicio" element={<Inicio />} />
      </Route>

      {/* Por defecto */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
