import { useState, useEffect } from "react";

const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

const getCurrentTime = () => {
  const now = new Date();
  return now.toTimeString().slice(0, 5);
};

const TaskForm = ({ onSave, editingTask, onCancel }) => {
  const [task, setTask] = useState({
    name: "",
    note: "",
    date: getTodayDate(),
    time: getCurrentTime(),
    status: "Todo",
  });

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task);
    setTask({ name: "", date: "", time: "", status: "Todo" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-4 transition hover:shadow-xl">
      <input
        type="text"
        name="name"
        placeholder="Task Name"
        value={task.name}
        onChange={handleChange}
        required
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
      />

      <textarea
        name="note"
        placeholder="Add a note (optional)"
        value={task.note}
        onChange={handleChange}
        rows={3}
        className="
            w-full border rounded-lg px-3 py-2
            text-sm resize-none
            focus:outline-none focus:ring-2 focus:ring-gray-200"
        />

      <div className="flex gap-2">
        <input
          type="date"
          name="date"
          value={task.date}
          onChange={handleChange}
          required
          className="border rounded-lg px-3 py-2 w-1/2 focus:ring-2 focus:ring-gray-200"
        />
        <input
          type="time"
          name="time"
          value={task.time}
          onChange={handleChange}
          required
          className="border rounded-lg px-3 py-2 w-1/2 focus:ring-2 focus:ring-gray-200"
        />
      </div>

      <select
        name="status"
        value={task.status}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <option>Todo</option>
        <option>Pending</option>
        <option>Completed</option>
      </select>

      <button className="bg-black text-white p-2 rounded-lg font-medium hover:bg-gray-800 active:scale-[0.98] transition">
        {editingTask ? "Update Task" : "Add Task"}
      </button>
      <button
            type="button"
            onClick={onCancel}
            className="flex-1 border p-2 mx-5 rounded-lg hover:bg-gray-100"
      >
        Cancel
      </button>
    </form>
  );
};

export default TaskForm;
