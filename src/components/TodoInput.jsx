import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState('')

  function submit(e) {
    e.preventDefault()
    onAdd(text)
    setText('')
  }

  return (
    <form className="todo-input" onSubmit={submit}>
      <input
        autoFocus
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={e => setText(e.target.value)}
        aria-label="New todo"
      />
      <button type="submit" aria-label="Add todo"><FontAwesomeIcon icon={faPlus} /> Add</button>
    </form>
  )
}
