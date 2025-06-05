import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import { PlayersProvider } from '../context/PlayersContext'
import { EnemiesProvider } from '../context/EnemiesContext'

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
    <html lang="en">
      <body>
        <PlayersProvider>
          <EnemiesProvider>
            <nav className="bg-gray-800 text-white p-4 flex gap-4">
              <Link href="/">Home</Link>
              <Link href="/notes">Notes</Link>
              <Link href="/players">Players</Link>
              <Link href="/combat">Combat</Link>
            </nav>
            <div className="p-4">{children}</div>
          </EnemiesProvider>
        </PlayersProvider>
      </body>
    </html>
  )
}
