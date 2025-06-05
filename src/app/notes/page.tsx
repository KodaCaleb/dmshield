'use client'
import { useState } from 'react'
import { useNotes } from '../../context/NotesContext'

export default function NotesPage() {
  const { notes, addNote, removeNote } = useNotes()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [openId, setOpenId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)

  const handleAdd = () => {
    if (!title && !content) return
    addNote({ id: Date.now(), title, content })
    setTitle('')
    setContent('')
    setShowForm(false)
  }

  const handleDelete = (id: number) => {
    if (confirm('are you sure you want to delete')) {
      removeNote(id)
      setOpenId(null)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Notes</h1>
      {!showForm ? (
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
          onClick={() => setShowForm(true)}
        >
          Create Note
        </button>
      ) : (
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
          <div className="flex gap-2">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 rounded"
              onClick={handleAdd}
            >
              Save Note
            </button>
            <button
              className="bg-gray-700 hover:bg-gray-600 text-white px-3 rounded"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div>
        {notes.length === 0 ? (
          <p className="text-gray-400">No notes yet.</p>
        ) : (
          <ul className="space-y-2">
            {notes.map((n) => (
              <li key={n.id} className="bg-gray-800 border border-gray-700 rounded">
                <button
                  className="w-full text-left p-2 flex justify-between items-center"
                  onClick={() => setOpenId(openId === n.id ? null : n.id)}
                >
                  <span>{n.title}</span>
                  <span className="text-sm text-gray-400">{openId === n.id ? '▲' : '▼'}</span>
                </button>
                {openId === n.id && (
                  <div className="p-2 pt-0 space-y-2">
                    <p className="whitespace-pre-wrap">{n.content}</p>
                    <button
                      className="bg-transparent border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-3 rounded"
                      onClick={() => handleDelete(n.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
