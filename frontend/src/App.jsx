import { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import TaskList from "./components/TaskList";

const TOKEN_KEY = "jwt_token";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [showRegister, setShowRegister] = useState(false);


  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem(TOKEN_KEY, newToken);
  };


  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
  };

  if (!token) {
    return showRegister ? (
      <Register
        onRegister={() => setShowRegister(false)}
        switchToLogin={() => setShowRegister(false)}
        onLogin={handleLogin}
      />
    ) : (
      <Login
        onLogin={handleLogin}
        switchToRegister={() => setShowRegister(true)}
      />
    );
  }


  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-8">Gestor de Tareas</h1>
      <TaskList />
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-gray-200 px-4 py-2 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default App;
