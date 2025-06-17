import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [token, setToken] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  if (!token) {
    return showRegister ? (
      <Register
        onRegister={() => setShowRegister(false)}
        switchToLogin={() => setShowRegister(false)}
      />
    ) : (
      <Login
        onLogin={setToken}
        switchToRegister={() => setShowRegister(true)}
      />
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-8">Gestor de Tareas</h1>
      {/* ... */}
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
