'use client'
import { useEffect, useState } from 'react'

export default function NotesPage() {
  const [notes, setNotes] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('dmshield.notes')
    if (stored) {
      setNotes(stored)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('dmshield.notes', notes)
  }, [notes])

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Notes</h1>
      <textarea
        className="w-full h-96 p-2 rounded bg-gray-800 border border-gray-600 text-gray-100"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </div>
  )
}
