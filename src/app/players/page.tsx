'use client'
import { useState } from 'react'
import { usePlayers } from '../../context/PlayersContext'

export default function PlayersPage() {
  const { players, addPlayer, adjustHp, removePlayer } = usePlayers()
  const [name, setName] = useState('')
  const [hp, setHp] = useState(10)

  const handleAddPlayer = () => {
    if (!name) return
    addPlayer({ id: Date.now(), name, hp })
    setName('')
    setHp(10)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Players</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border border-gray-600 bg-gray-800 text-gray-100 p-1 rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          className="border border-gray-600 bg-gray-800 text-gray-100 p-1 w-20 rounded"
          value={hp}
          onChange={(e) => setHp(parseInt(e.target.value))}
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 rounded" onClick={handleAddPlayer}>
          Add
        </button>
      </div>
      <ul>
        {players.map((p) => (
          <li key={p.id} className="mb-2 flex items-center gap-2 bg-gray-800 p-2 rounded">
            <span className="font-semibold mr-2">{p.name}</span>
            <button
              className="px-2 bg-gray-700 rounded"
              onClick={() => adjustHp(p.id, -1)}
            >
              -
            </button>
            <span>{p.hp} hp</span>
            <button
              className="px-2 bg-gray-700 rounded"
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
