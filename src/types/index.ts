export interface WatchlistEntry {
    id: string;
    name: string;
    year: string;
    category: string;
    status: 'Watched' | 'Currently Watching' | 'To Watch';
    rating: string;
    remarks: string;
    platform: string;
    imageUrl?: string;
}

export interface FilterState {
    category: string;
    status: string;
    rating: string;
    searchTerm: string;
} 