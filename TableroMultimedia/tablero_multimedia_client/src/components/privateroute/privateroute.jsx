import { Navigate, Outlet } from "react-router-dom";
import { usePermisos } from "../context/permisoscontext";

function PrivateRoute() {
  const { usuario, loading } = usePermisos();

  if (loading) return null;

  if (!usuario) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default PrivateRoute;
