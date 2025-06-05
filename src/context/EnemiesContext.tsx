'use client'
import { createContext, useContext, useEffect, useState } from 'react'

export interface Enemy {
  id: number
  name: string
  hp: number
}

interface EnemiesContextValue {
  enemies: Enemy[]
  addEnemy: (enemy: Enemy) => void
  adjustHp: (id: number, delta: number) => void
  removeEnemy: (id: number) => void
}

const EnemiesContext = createContext<EnemiesContextValue | undefined>(undefined)

export function EnemiesProvider({ children }: { children: React.ReactNode }) {
  const [enemies, setEnemies] = useState<Enemy[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('dmshield.enemies')
    if (stored) {
      try {
        setEnemies(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse stored enemies', e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('dmshield.enemies', JSON.stringify(enemies))
  }, [enemies])

  const addEnemy = (enemy: Enemy) => {
    setEnemies(prev => [...prev, enemy])
  }

  const adjustHp = (id: number, delta: number) => {
    setEnemies(prev => prev.map(e => (e.id === id ? { ...e, hp: e.hp + delta } : e)))
  }

  const removeEnemy = (id: number) => {
    setEnemies(prev => prev.filter(e => e.id !== id))
  }

  return (
    <EnemiesContext.Provider value={{ enemies, addEnemy, adjustHp, removeEnemy }}>
      {children}
    </EnemiesContext.Provider>
  )
}

export function useEnemies() {
  const ctx = useContext(EnemiesContext)
  if (!ctx) {
    throw new Error('useEnemies must be used within an EnemiesProvider')
  }
  return ctx
}
