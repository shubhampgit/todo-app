import TodoItem from './TodoItem'

export default function TodoList({ todos, onToggle, onDelete, onUpdate }) {
  if (!todos.length) {
    return <p className="empty">No todos to show.</p>
  }
  return (
    <ul className="todo-list">
      {todos.map(t => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={() => onToggle(t.id)}
          onDelete={() => onDelete(t.id)}
          onUpdate={next => onUpdate(t.id, next)}
        />
      ))}
    </ul>
  )
}
