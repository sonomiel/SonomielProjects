import { createContext, useContext, useState, useEffect } from "react";

const PermisosContext = createContext();
export const usePermisos = () => useContext(PermisosContext);

export const PermisosProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar sesión guardada
  useEffect(() => {
    const user = sessionStorage.getItem("usuario");
    if (user) setUsuario(user);
    setLoading(false);
  }, []);

  const login = (username) => {
    setUsuario(username);
    sessionStorage.setItem("usuario", username);
  };

  const logout = () => {
    setUsuario(null);
    sessionStorage.removeItem("usuario");
  };

  return (
    <PermisosContext.Provider value={{ usuario, login, logout, loading }}>
      {children}
    </PermisosContext.Provider>
  );
};
