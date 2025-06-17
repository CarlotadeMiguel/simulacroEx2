//src/components/TaskForm.jsx
import { useState, useEffect } from "react";
import axios from "../api/axios";

export default function TaskForm({ onSave, editingTask, onCancel }) {
  const [titulo, setTitulo] = useState("");
  const [prioridad, setPrioridad] = useState("baja");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitulo(editingTask.titulo);
      setPrioridad(editingTask.prioridad);
      setDescripcion(editingTask.descripcion || "");
    } else {
      setTitulo("");
      setPrioridad("baja");
      setDescripcion("");
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave({
      titulo,
      prioridad,
      descripcion,
      id: editingTask?.id,
    });
    setTitulo("");
    setPrioridad("baja");
    setDescripcion("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        className="border p-2 mr-2 rounded"
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        required
      />
      <select
        className="border p-2 mr-2 rounded"
        value={prioridad}
        onChange={e => setPrioridad(e.target.value)}
      >
        <option value="baja">Baja</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>
      <input
        className="border p-2 mr-2 rounded"
        type="text"
        placeholder="Descripción (opcional)"
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
        {editingTask ? "Guardar cambios" : "Agregar tarea"}
      </button>
      {editingTask && (
        <button
          type="button"
          className="ml-2 text-gray-600 underline"
          onClick={onCancel}
        >
          Cancelar
        </button>
      )}
    </form>
  );
}
