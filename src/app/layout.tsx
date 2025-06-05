import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import { PlayersProvider } from '../context/PlayersContext'
import { EnemiesProvider } from '../context/EnemiesContext'
import { NotesProvider } from '../context/NotesContext'

export const metadata: Metadata = {
  title: 'DMShield - A tool for Dungeon Masters',
  description: 'A tool for Dungeon Masters',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-900 text-gray-100 min-h-screen">
        <PlayersProvider>
          <EnemiesProvider>
            <NotesProvider>
              <nav className="bg-gray-800 text-gray-100 p-4 flex gap-4 border-b border-gray-700">
                <Link href="/">Home</Link>
                <Link href="/notes">Notes</Link>
                <Link href="/players">Players</Link>
                <Link href="/combat">Combat</Link>
              </nav>
              <div className="p-4 max-w-4xl mx-auto">{children}</div>
            </NotesProvider>
          </EnemiesProvider>
        </PlayersProvider>
      </body>
    </html>
  )
}
