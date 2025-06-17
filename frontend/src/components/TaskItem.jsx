export default function TaskItem({ task, onEdit, onDelete }) {
    return (
      <li className="p-3 border rounded flex justify-between items-center">
        <div>
          <span className="font-semibold">{task.titulo}</span>{" "}
          <span className={`inline-block px-2 py-1 text-xs rounded ${task.prioridad === "alta" ? "bg-red-200 text-red-700" : task.prioridad === "media" ? "bg-yellow-200 text-yellow-700" : "bg-green-200 text-green-700"}`}>
            {task.prioridad}
          </span>
          {task.descripcion && (
            <div className="text-gray-500 text-sm">{task.descripcion}</div>
          )}
        </div>
        <div className="flex gap-2">
          <button
            className="text-blue-600 underline"
            onClick={() => onEdit(task)}
          >
            Editar
          </button>
          <button
            className="text-red-600 underline"
            onClick={() => onDelete(task.id)}
          >
            Borrar
          </button>
        </div>
      </li>
    );
  }
  