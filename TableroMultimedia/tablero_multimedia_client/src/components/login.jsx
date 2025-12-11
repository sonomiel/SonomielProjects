import { useState } from "react";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { usePermisos } from "./context/permisoscontext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = usePermisos();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ÚNICO ENDPOINT
      const res = await axios.post(API + "/validar_usuario.php", {
        username,
        password,
      });

      if (res.data.success) {
        // Guardar sesión (solo username)
        login(username);

        // Redirigir
        navigate("/inicio");
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (err) {
      alert("Error en la conexión con el servidor");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-content-center align-items-center h-screen">
      <Card title="Iniciar Sesión" style={{ width: "350px" }}>
        <form onSubmit={handleSubmit}>
          <div className="p-field mb-3">
            <label>Usuario</label>
            <InputText
              className="w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="p-field mb-3">
            <label>Contraseña</label>
            <Password
              className="w-full"
              feedback={false}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            label={loading ? "Validando..." : "Entrar"}
            className="w-full"
            loading={loading}
          />
        </form>
      </Card>
    </div>
  );
}

export default Login;
