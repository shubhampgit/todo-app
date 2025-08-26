import { useEffect, useMemo, useState } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

const STORAGE_KEY = 'todos-v1'

export default function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [filter, setFilter] = useState('all') // 'all' | 'active' | 'completed'
  const [query, setQuery] = useState('') // search

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const filteredTodos = useMemo(() => {
    let list = todos
    if (filter === 'active') list = todos.filter(t => !t.completed)
    if (filter === 'completed') list = todos.filter(t => t.completed)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(t => t.text.toLowerCase().includes(q))
    }
    return list
  }, [todos, filter, query])

  function addTodo(text) {
    const trimmed = text.trim()
    if (!trimmed) return
    const newTodo = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    }
    setTodos(prev => [newTodo, ...prev])
  }

  function toggleTodo(id) {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  function deleteTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  function updateTodo(id, nextText) {
    const trimmed = nextText.trim()
    if (!trimmed) return deleteTodo(id) // empty edit removes
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, text: trimmed } : t)))
  }

  function clearCompleted() {
    setTodos(prev => prev.filter(t => !t.completed))
  }

  const remaining = todos.filter(t => !t.completed).length

  return (
    <div className="app">
      <h1>📝 To-Do</h1>

      <TodoInput onAdd={addTodo} />

      <div className="toolbar">
        <div className="filters" role="tablist" aria-label="Filters">
          <button
            role="tab"
            aria-selected={filter === 'all'}
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            role="tab"
            aria-selected={filter === 'active'}
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            role="tab"
            aria-selected={filter === 'completed'}
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        <input
          className="search"
          placeholder="Search..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Search todos"
        />

        <button className="secondary" onClick={clearCompleted} disabled={!todos.some(t => t.completed)}>
          Clear completed
        </button>
      </div>

      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onUpdate={updateTodo}
      />

      <footer className="footer">
        <span>{remaining} item{remaining === 1 ? '' : 's'} left</span>
      </footer>
    </div>
  )
}
