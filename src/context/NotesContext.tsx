'use client'
import { createContext, useContext, useEffect, useState } from 'react'

export interface Note {
  id: number
  title: string
  content: string
}

interface NotesContextValue {
  notes: Note[]
  addNote: (note: Note) => void
  removeNote: (id: number) => void
  updateNote: (note: Note) => void
}

const NotesContext = createContext<NotesContextValue | undefined>(undefined)

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('dmshield.notes')
    if (stored) {
      try {
        setNotes(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse stored notes', e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('dmshield.notes', JSON.stringify(notes))
  }, [notes])

  const addNote = (note: Note) => {
    setNotes(prev => [...prev, note])
  }

  const removeNote = (id: number) => {
    setNotes(prev => prev.filter(n => n.id !== id))
  }

  const updateNote = (note: Note) => {
    setNotes(prev => prev.map(n => (n.id === note.id ? note : n)))
  }

  return (
    <NotesContext.Provider value={{ notes, addNote, removeNote, updateNote }}>
      {children}
    </NotesContext.Provider>
  )
}

export function useNotes() {
  const ctx = useContext(NotesContext)
  if (!ctx) {
    throw new Error('useNotes must be used within a NotesProvider')
  }
  return ctx
}
