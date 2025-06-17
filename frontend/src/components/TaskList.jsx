//src/components/TaskList.jsx
import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await axios.get("/tareas");
        setTasks(data);
      } catch (err) {
        setError(
          err.response?.data?.error ||
          err.response?.data?.msg ||
          "Error al cargar las tareas"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) return <div className="text-center mt-8">Cargando tareas...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Tus tareas</h2>
      {tasks.length === 0 ? (
        <div>No tienes tareas todavía.</div>
      ) : (
        <ul className="space-y-2">
          {tasks.map(task => (
            <li key={task.id} className="p-3 border rounded flex justify-between items-center">
              <div>
                <span className="font-semibold">{task.titulo}</span>{" "}
                <span className={`inline-block px-2 py-1 text-xs rounded ${task.prioridad === "alta" ? "bg-red-200 text-red-700" : task.prioridad === "media" ? "bg-yellow-200 text-yellow-700" : "bg-green-200 text-green-700"}`}>
                  {task.prioridad}
                </span>
                {task.descripcion && (
                  <div className="text-gray-500 text-sm">{task.descripcion}</div>
                )}
              </div>
              {task.completada && (
                <span className="text-green-600 font-bold">✔</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
