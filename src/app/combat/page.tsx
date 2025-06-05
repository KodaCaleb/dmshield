'use client'
import { useState } from 'react'
import { useEnemies } from '../../context/EnemiesContext'

export default function CombatPage() {
  const { enemies, addEnemy, adjustHp, removeEnemy } = useEnemies()
  const [name, setName] = useState('')
  const [hp, setHp] = useState(10)

  const handleAddEnemy = () => {
    if (!name) return
    addEnemy({ id: Date.now(), name, hp })
    setName('')
    setHp(10)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Combat Tracker</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border border-gray-600 bg-gray-800 text-gray-100 p-1 rounded"
          placeholder="Enemy"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          className="border border-gray-600 bg-gray-800 text-gray-100 p-1 w-20 rounded"
          value={hp}
          onChange={(e) => setHp(parseInt(e.target.value))}
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 rounded" onClick={handleAddEnemy}>
          Add
        </button>
      </div>
      <ul>
        {enemies.map((e) => (
          <li key={e.id} className="mb-2 flex items-center gap-2 bg-gray-800 p-2 rounded">
            <span className="font-semibold mr-2">{e.name}</span>
            <button
              className="px-2 bg-gray-700 rounded"
              onClick={() => adjustHp(e.id, -1)}
            >
              -
            </button>
            <span>{e.hp} hp</span>
            <button
              className="px-2 bg-gray-700 rounded"
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
