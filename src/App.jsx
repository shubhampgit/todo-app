import { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { loadTasks, saveTasks } from "./utils/taskStorage";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import Pagination from "./components/Pagination";

const App = () => {
    const [tasks, setTasks] = useState(() => loadTasks());

    const [editingTask, setEditingTask] = useState(null);

    const [taskToDelete, setTaskToDelete] = useState(null);

    const [statusMessage, setStatusMessage] = useState(null);

    const [viewMode, setViewMode] = useState("list");

    const TASKS_PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const [searchQuery, setSearchQuery] = useState("");

    const filteredTasks = tasks.filter((task) => {
        const query = searchQuery.toLowerCase();
        return (
            task.name.toLowerCase().includes(query) ||
            (task.note && task.note.toLowerCase().includes(query))
        );
    });

    const startIndex = (currentPage - 1) * TASKS_PER_PAGE;
    const endIndex = startIndex + TASKS_PER_PAGE;
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    const showStatus = (message) => {
        setStatusMessage(message);
        setTimeout(() => setStatusMessage(null), 3000);
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setViewMode("edit");
    };


    const saveTask = (task) => {
        if (editingTask) {
            setTasks((prev) => {
            const updatedTask = { ...task };

            return [
                updatedTask,
                ...prev.filter((t) => t.id !== task.id),
            ];
            });

            setEditingTask(null);
            showStatus("Task updated successfully!");
        } else {
            setTasks((prev) => [
            { ...task, id: crypto.randomUUID() },
            ...prev,
            ]);

            showStatus("Task added successfully!");
        }
        setEditingTask(null);
        setViewMode("list");
        setCurrentPage(1);
    };


    const requestDelete = (task) => {
        setTaskToDelete(task);
    };

    const confirmDelete = () => {
        setTasks(tasks.filter((t) => t.id !== taskToDelete.id));
        setTaskToDelete(null);
        showStatus("Task deleted successfully!");
    };

    const cancelDelete = () => {
        setTaskToDelete(null);
    };


    return (
        <>
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
            {viewMode !== "list" && (
                <TaskForm
                    onSave={saveTask}
                    editingTask={viewMode === "edit" ? editingTask : null}
                    onCancel={() => {
                        setViewMode("list");
                        setEditingTask(null);
                    }}
                />
            )}
            {statusMessage && (
                <div
                    className="
                    mb-4 rounded-lg border border-green-200
                    bg-green-50 px-4 py-3 text-sm text-green-700
                    animate-fade-in
                    "
                >
                    {statusMessage}
                </div>
            )}
            {viewMode === "list" && (
            <div
                className="
                flex flex-col sm:flex-row sm:items-center sm:justify-between
                gap-3 mb-6
                px-4 py-3
                bg-white rounded-xl
                border shadow-sm
                "
            >
                {/* Left: search + count */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
                {/* Search input */}
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="
                    w-full sm:w-64
                    px-3 py-2 rounded-lg border
                    text-sm
                    focus:outline-none focus:ring-2 focus:ring-gray-200
                    "
                />

                {/* Count */}
                <p className="text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-medium text-gray-900">
                    {paginatedTasks.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-gray-900">
                    {filteredTasks.length}
                    </span>{" "}
                    tasks
                </p>
                </div>

                {/* Right: Add button */}
                <button
                onClick={() => setViewMode("add")}
                className="
                    inline-flex items-center gap-2
                    bg-black text-white
                    px-4 py-2 rounded-lg
                    text-sm font-medium
                    hover:bg-gray-800
                    active:scale-[0.97]
                    transition
                "
                >
                <span className="text-lg leading-none">+</span>
                Add Task
                </button>
            </div>
            )}
            <TaskList
            tasks={paginatedTasks}
            onEdit={handleEdit}
            onDelete={requestDelete}
            />
            <Pagination
                currentPage={currentPage}
                totalItems={filteredTasks.length}
                itemsPerPage={TASKS_PER_PAGE}
                onPageChange={setCurrentPage}
            />
        </main>
        <ConfirmDeleteModal
            isOpen={!!taskToDelete}
            onCancel={cancelDelete}
            onConfirm={confirmDelete}
        />
        </>
    );

};

export default App;
