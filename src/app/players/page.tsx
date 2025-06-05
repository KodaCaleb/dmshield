'use client'
import { useState } from 'react'

interface Player {
  id: number
  name: string
  hp: number
}

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [name, setName] = useState('')
  const [hp, setHp] = useState(10)

  const addPlayer = () => {
    if (!name) return
    setPlayers((prev) => [...prev, { id: Date.now(), name, hp }])
    setName('')
    setHp(10)
  }

  const adjustHp = (id: number, delta: number) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, hp: p.hp + delta } : p))
    )
  }

  const removePlayer = (id: number) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Players</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-1 text-black"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          className="border p-1 w-20 text-black"
          value={hp}
          onChange={(e) => setHp(parseInt(e.target.value))}
        />
        <button className="bg-blue-500 text-white px-2" onClick={addPlayer}>
          Add
        </button>
      </div>
      <ul>
        {players.map((p) => (
          <li key={p.id} className="mb-2 flex items-center gap-2">
            <span className="font-semibold mr-2">{p.name}</span>
            <button
              className="px-2 bg-gray-200"
              onClick={() => adjustHp(p.id, -1)}
            >
              -
            </button>
            <span>{p.hp} hp</span>
            <button
              className="px-2 bg-gray-200"
              onClick={() => adjustHp(p.id, 1)}
            >
              +
            </button>
            <button
              className="ml-2 text-red-500"
              onClick={() => removePlayer(p.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
