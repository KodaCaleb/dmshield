'use client'

import Link from 'next/link'
import { usePlayers } from '../context/PlayersContext'
import { useEnemies } from '../context/EnemiesContext'
import { useNotes } from '../context/NotesContext'

export default function Home() {
  const { players } = usePlayers()
  const { enemies } = useEnemies()
  const { notes } = useNotes()

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">DMShield</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded border border-gray-700">
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="text-xl font-bold">Players</h2>
            <Link href="/players" className="text-blue-400 text-sm">Manage</Link>
          </div>
          {players.length === 0 ? (
            <p className="text-gray-400 text-sm">No players added.</p>
          ) : (
            <ul className="text-sm space-y-1">
              {players.map(p => (
                <li key={p.id} className="flex justify-between">
                  <span>{p.name}</span>
                  <span>{p.hp} hp</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-gray-800 p-4 rounded border border-gray-700">
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="text-xl font-bold">Combat</h2>
            <Link href="/combat" className="text-blue-400 text-sm">Manage</Link>
          </div>
          {enemies.length === 0 ? (
            <p className="text-gray-400 text-sm">No enemies tracked.</p>
          ) : (
            <ul className="text-sm space-y-1">
              {enemies.map(e => (
                <li key={e.id} className="flex justify-between">
                  <span>{e.name}</span>
                  <span>{e.hp} hp</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-gray-800 p-4 rounded border border-gray-700">
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="text-xl font-bold">Notes</h2>
            <Link href="/notes" className="text-blue-400 text-sm">Open</Link>
          </div>
          {notes.length === 0 ? (
            <p className="text-gray-400 text-sm">No notes yet.</p>
          ) : (
            <ul className="text-sm space-y-1 max-h-60 overflow-y-auto">
              {notes.map((n) => (
                <li key={n.id}>{n.title}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
