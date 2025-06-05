import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import type { WatchlistEntry } from './types'
import { useWatchlistStore } from './store/watchlistStore'
import EntryModal from './components/EntryModal'
import WatchlistTable from './components/WatchlistTable'
import FilterBar from './components/FilterBar'

export default function App() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedEntry, setSelectedEntry] = useState<WatchlistEntry | undefined>()
    const { entries, filters } = useWatchlistStore()

    const filteredEntries = entries.filter((entry) => {
        const matchesSearch = entry.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
        const matchesCategory = !filters.category || entry.category === filters.category
        const matchesStatus = !filters.status || entry.status === filters.status
        const matchesRating = !filters.rating || entry.rating === filters.rating
        return matchesSearch && matchesCategory && matchesStatus && matchesRating
    })

    const handleAddClick = () => {
        setSelectedEntry(undefined)
        setIsModalOpen(true)
    }

    const handleEditClick = (entry: WatchlistEntry) => {
        setSelectedEntry(entry)
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
        setSelectedEntry(undefined)
    }

  return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Watchlist</h1>
                        <button
                            type="button"
                            onClick={handleAddClick}
                            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                            Add Entry
                        </button>
                    </div>
                </div>
            </header>

            <main>
                <FilterBar />
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <WatchlistTable entries={filteredEntries} onEdit={handleEditClick} />
      </div>
            </main>

            <EntryModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                entry={selectedEntry}
            />
      </div>
  )
}
