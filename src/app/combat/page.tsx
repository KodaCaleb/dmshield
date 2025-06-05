'use client'
import { useState } from 'react'

interface Enemy {
  id: number
  name: string
  hp: number
}

export default function CombatPage() {
  const [enemies, setEnemies] = useState<Enemy[]>([])
  const [name, setName] = useState('')
  const [hp, setHp] = useState(10)

  const addEnemy = () => {
    if (!name) return
    setEnemies((prev) => [...prev, { id: Date.now(), name, hp }])
    setName('')
    setHp(10)
  }

  const adjustHp = (id: number, delta: number) => {
    setEnemies((prev) =>
      prev.map((e) => (e.id === id ? { ...e, hp: e.hp + delta } : e))
    )
  }

  const removeEnemy = (id: number) => {
    setEnemies((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Combat Tracker</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-1 text-black"
          placeholder="Enemy"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          className="border p-1 w-20 text-black"
          value={hp}
          onChange={(e) => setHp(parseInt(e.target.value))}
        />
        <button className="bg-blue-500 text-white px-2" onClick={addEnemy}>
          Add
        </button>
      </div>
      <ul>
        {enemies.map((e) => (
          <li key={e.id} className="mb-2 flex items-center gap-2">
            <span className="font-semibold mr-2">{e.name}</span>
            <button
              className="px-2 bg-gray-200"
              onClick={() => adjustHp(e.id, -1)}
            >
              -
            </button>
            <span>{e.hp} hp</span>
            <button
              className="px-2 bg-gray-200"
              onClick={() => adjustHp(e.id, 1)}
            >
              +
            </button>
            <button
              className="ml-2 text-red-500"
              onClick={() => removeEnemy(e.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
