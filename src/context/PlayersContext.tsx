'use client'
import { createContext, useContext, useEffect, useState } from 'react'

export interface Player {
  id: number
  name: string
  hp: number
}

interface PlayersContextValue {
  players: Player[]
  addPlayer: (player: Player) => void
  adjustHp: (id: number, delta: number) => void
  removePlayer: (id: number) => void
}

const PlayersContext = createContext<PlayersContextValue | undefined>(undefined)

export function PlayersProvider({ children }: { children: React.ReactNode }) {
  const [players, setPlayers] = useState<Player[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('dmshield.players')
    if (stored) {
      try {
        setPlayers(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse stored players', e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('dmshield.players', JSON.stringify(players))
  }, [players])

  const addPlayer = (player: Player) => {
    setPlayers(prev => [...prev, player])
  }

  const adjustHp = (id: number, delta: number) => {
    setPlayers(prev =>
      prev.map(p => (p.id === id ? { ...p, hp: p.hp + delta } : p))
    )
  }

  const removePlayer = (id: number) => {
    setPlayers(prev => prev.filter(p => p.id !== id))
  }

  return (
    <PlayersContext.Provider
      value={{ players, addPlayer, adjustHp, removePlayer }}
    >
      {children}
    </PlayersContext.Provider>
  )
}

export function usePlayers() {
  const ctx = useContext(PlayersContext)
  if (!ctx) {
    throw new Error('usePlayers must be used within a PlayersProvider')
  }
  return ctx
}
