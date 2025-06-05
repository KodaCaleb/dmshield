'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePlayers } from '../context/PlayersContext'
import { useEnemies } from '../context/EnemiesContext'

export default function Home() {
  const { players } = usePlayers()
  const { enemies } = useEnemies()
  const [notes, setNotes] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('dmshield.notes')
    if (stored) setNotes(stored)
  }, [])

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
          {notes ? (
            <div className="text-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
              {notes}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No notes yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
