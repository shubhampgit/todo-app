import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPen, faPlus } from "@fortawesome/free-solid-svg-icons"

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus()
  }, [editing])

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      onUpdate(draft)
      setEditing(false)
    } else if (e.key === 'Escape') {
      setDraft(todo.text)
      setEditing(false)
    }
  }

  return (
    <li className={`todo-item ${todo.completed ? 'done' : ''}`}>
      <label className="checkbox">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          aria-label={`Mark "${todo.text}" ${todo.completed ? 'active' : 'completed'}`}
        />
        <span className="checkmark" />
      </label>

      {!editing ? (
        <span
          className="text"
          onDoubleClick={() => setEditing(true)}
          title="Double-click to edit"
        >
          {todo.text}
        </span>
      ) : (
        <input
          ref={inputRef}
          className="edit-input"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            onUpdate(draft)
            setEditing(false)
          }}
          aria-label="Edit todo"
        />
      )}

      <div className="actions">
        {!editing && (
          <button className="icon" onClick={() => setEditing(true)} aria-label="Edit">
            <FontAwesomeIcon icon={faPen} />
          </button>
        )}
        <button className="icon danger" onClick={onDelete} aria-label="Delete">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </li>
  )
}
