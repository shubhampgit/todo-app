import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { getDayFromDate } from "../utils/getDayFromDate";

const STATUS_STYLES = {
  Todo: {
    badge: "bg-gray-200 text-gray-700",
    dot: "bg-gray-400",
  },
  Pending: {
    badge: "bg-yellow-100 text-yellow-700",
    dot: "bg-yellow-500",
  },
  Completed: {
    badge: "bg-green-100 text-green-700",
    dot: "bg-green-500",
  },
};

const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const statusStyle = STATUS_STYLES[task.status];

  return (
    <div
      className="
        group bg-white rounded-xl p-5 border shadow-sm
        hover:shadow-md hover:border-gray-300
        transition-all duration-200
      "
    >
      <div className="flex justify-between gap-4">
        {/* Left section */}
        <div className="flex gap-3">
          {/* Status toggle */}
          <button
            onClick={() => onToggleStatus(task)}
            className={`
              w-3 h-3 mt-2 rounded-full
              ${statusStyle.dot}
              hover:scale-125 transition
            `}
            title="Change status"
          />

          <div>
            <h3
              className={`font-semibold text-lg ${
                task.status === "Completed"
                  ? "line-through text-gray-400"
                  : ""
              }`}
            >
              {task.name}
            </h3>

            {task.note && (
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {task.note}
                </p>
            )}

            <p className="text-sm text-gray-500 mt-1">
              {task.date} • {task.time} • {getDayFromDate(task.date)}
            </p>

            <span
              className={`
                inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full
                ${statusStyle.badge}
              `}
            >
              {task.status}
            </span>
          </div>
        </div>

        {/* Right actions (icons only) */}
        <div
          className="
            flex gap-3 items-start
            opacity-0 group-hover:opacity-100
            transition
          "
        >
          {/* Edit */}
          <button
            onClick={() => onEdit(task)}
            className="
              p-2 rounded-lg text-blue-600
              hover:bg-blue-50 hover:scale-105
              transition
            "
            title="Edit task"
          >
            <FiEdit2 size={16} />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(task)}
            className="
                p-2 rounded-lg text-red-600
                hover:bg-red-50 hover:scale-105
                transition
            "
            title="Delete task"
            >
            <FiTrash2 size={16} />
         </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
