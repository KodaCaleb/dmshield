'use client'
import { useState } from 'react'
import { useNotes } from '../../context/NotesContext'

export default function NotesPage() {
  const { notes, addNote } = useNotes()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const handleAdd = () => {
    if (!title && !content) return
    addNote({ id: Date.now(), title, content })
    setTitle('')
    setContent('')
  }

  const selected = notes.find(n => n.id === selectedId)

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Notes</h1>
      <div className="flex flex-col gap-2 bg-gray-800 p-3 rounded border border-gray-700">
        <input
          className="border border-gray-600 bg-gray-900 text-gray-100 p-1 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border border-gray-600 bg-gray-900 text-gray-100 p-1 rounded h-32"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 rounded self-start"
          onClick={handleAdd}
        >
          Save Note
        </button>
      </div>

      <div>
        {notes.length === 0 ? (
          <p className="text-gray-400">No notes yet.</p>
        ) : (
          <ul className="space-y-1">
            {notes.map((n) => (
              <li
                key={n.id}
                className="cursor-pointer text-blue-400 hover:underline"
                onClick={() => setSelectedId(n.id)}
              >
                {n.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {selected && (
        <div className="border-t border-gray-700 pt-4">
          <h2 className="text-xl font-bold mb-2">{selected.title}</h2>
          <p className="whitespace-pre-wrap">{selected.content}</p>
        </div>
      )}
    </div>
  )
}
