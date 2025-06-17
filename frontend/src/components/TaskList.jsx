import { useEffect, useState } from "react";
import axios from "../api/axios";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSave = async (task) => {
    try {
      if (task.id) {
        // Editar
        await axios.put(`/tareas/${task.id}`, task);
      } else {
        // Crear
        await axios.post("/tareas", task);
      }
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.msg ||
        "Error al guardar la tarea"
      );
    }
  };

  const handleEdit = (task) => setEditingTask(task);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/tareas/${id}`);
      fetchTasks();
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.msg ||
        "Error al borrar la tarea"
      );
    }
  };

  if (loading) return <div className="text-center mt-8">Cargando tareas...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Tus tareas</h2>
      <TaskForm
        onSave={handleSave}
        editingTask={editingTask}
        onCancel={() => setEditingTask(null)}
      />
      {tasks.length === 0 ? (
        <div>No tienes tareas todavía.</div>
      ) : (
        <ul className="space-y-2">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
