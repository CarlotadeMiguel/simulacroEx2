//src/App.jsx
import { useState } from "react";
import './App.css'
import Login from "./components/Login";

function App() {
  const [token, setToken] = useState(null);

  if (!token) {
    return <Login onLogin={setToken} />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-8">Gestor de Tareas</h1>
      <button
        onClick={() => setToken(null)}
        className="absolute top-4 right-4 bg-gray-200 px-4 py-2 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default App;