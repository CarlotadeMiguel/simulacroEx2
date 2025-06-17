//src/components/Register.jsx
import { useState } from "react";
import axios from "../api/axios";

export default function Register({ onRegister, switchToLogin, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const data = await axios.post("/auth/registro", { email, password });
      if (data.mensaje) {
        // Login automático tras registro
        try {
          const loginData = await axios.post("/auth/login", { email, password });
          if (loginData.access_token) {
            onLogin(loginData.access_token);
          } else {
            setSuccess("Usuario creado, pero error al iniciar sesión.");
            setTimeout(() => switchToLogin(), 2000);
          }
        } catch {
          setSuccess("Usuario creado, pero error al iniciar sesión.");
          setTimeout(() => switchToLogin(), 2000);
        }
      } else {
        setError(data.error || "Error en el registro");
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.msg ||
        "Error de red o servidor"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl mb-4 font-bold text-center">Registro</h2>
      {success && <div className="text-green-600 mb-2">{success}</div>}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <input
        className="w-full mb-2 p-2 border rounded"
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        className="w-full mb-4 p-2 border rounded"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700" type="submit">
        Registrarse
      </button>
      <p className="mt-2 text-center">
        ¿Ya tienes cuenta?{" "}
        <button type="button" className="text-blue-600 underline" onClick={switchToLogin}>
          Inicia sesión
        </button>
      </p>
    </form>
  );
}
