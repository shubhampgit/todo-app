import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onEdit, onDelete }) => {
    if (!tasks.length) {
        return (
            <div className="text-center py-10 text-gray-500">
            <p className="text-lg font-medium">No tasks yet 📝</p>
            <p className="text-sm">Add a task to get started</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
        {tasks.map((task) => (
            <TaskItem
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            />
        ))}
        </div>
    );
};

export default TaskList;
