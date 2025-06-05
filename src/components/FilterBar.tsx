import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useWatchlistStore } from '../store/watchlistStore';

export default function FilterBar() {
    const { filters, setFilters } = useWatchlistStore();

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    return (
        <div className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            type="text"
                            name="searchTerm"
                            value={filters.searchTerm}
                            onChange={handleFilterChange}
                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Search by name..."
                        />
                    </div>

                    <select
                        aria-label="Category"
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                        <option value="">All Categories</option>
                        <option value="Anime">Anime</option>
                        <option value="Marvel">Marvel</option>
                        <option value="OTT Series">OTT Series</option>
                        <option value="Bollywood Movies">Bollywood Movies</option>
                        <option value="South Movies">South Movies</option>
                        <option value="Telugu Movies">Telugu Movies</option>
                        <option value="Hollywood Movies">Hollywood Movies</option>
                        <option value="Hollywood Series">Hollywood Series</option>
                    </select>

                    <select
                        aria-label="Status"
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                        <option value="">All Status</option>
                        <option value="Watched">Watched</option>
                        <option value="Currently Watching">Currently Watching</option>
                        <option value="To Watch">To Watch</option>
                    </select>

                    <select
                        aria-label="Rating"
                        name="rating"
                        value={filters.rating}
                        onChange={handleFilterChange}
                        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                        <option value="">All Ratings</option>
                        {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((rating) => (
                            <option key={rating} value={rating}>
                                {rating}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
} 