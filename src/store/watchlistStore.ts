import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WatchlistEntry, FilterState } from '../types';

interface WatchlistStore {
    entries: WatchlistEntry[];
    filters: FilterState;
    addEntry: (entry: Omit<WatchlistEntry, 'id'>) => void;
    updateEntry: (id: string, entry: WatchlistEntry) => void;
    deleteEntry: (id: string) => void;
    setFilters: (filters: FilterState) => void;
}

const useWatchlistStore = create<WatchlistStore>()(
    persist(
        (set) => ({
            entries: [],
            filters: {
                category: '',
                status: '',
                rating: '',
                searchTerm: '',
            },
            addEntry: (entry) =>
                set((state) => ({
                    entries: [
                        ...state.entries,
                        {
                            ...entry,
                            id: crypto.randomUUID(),
                        },
                    ],
                })),
            updateEntry: (id, entry) =>
                set((state) => ({
                    entries: state.entries.map((e) => (e.id === id ? entry : e)),
                })),
            deleteEntry: (id) =>
                set((state) => ({
                    entries: state.entries.filter((e) => e.id !== id),
                })),
            setFilters: (filters) => set({ filters }),
        }),
        {
            name: 'watchlist-storage',
        }
    )
);

export { useWatchlistStore }; 