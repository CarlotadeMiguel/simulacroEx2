//src/components/Login.jsx

import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.access_token) {
        onLogin(data.access_token);
      } else {
        setError(data.error || "Credenciales incorrectas");
      }
    } catch {
      setError("Error de red o servidor");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl mb-4 font-bold text-center">Iniciar Sesión</h2>
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
        Entrar
      </button>
    </form>
  );
}
