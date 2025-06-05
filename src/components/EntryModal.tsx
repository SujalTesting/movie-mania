import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { WatchlistEntry } from '../types';
import { useWatchlistStore } from '../store/watchlistStore';
import ImageUploader from './ImageUploader';

interface EntryModalProps {
    isOpen: boolean;
    onClose: () => void;
    entry?: WatchlistEntry;
}

export default function EntryModal({ isOpen, onClose, entry }: EntryModalProps) {
    const { addEntry, updateEntry } = useWatchlistStore();
    const [imageUrl, setImageUrl] = useState<string | null>(entry?.imageUrl || null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        const newEntry = {
            name: formData.get('name') as string,
            year: formData.get('year') as string,
            category: formData.get('category') as string,
            status: formData.get('status') as WatchlistEntry['status'],
            rating: formData.get('rating') as string,
            remarks: formData.get('remarks') as string,
            platform: formData.get('platform') as string,
            imageUrl: imageUrl || undefined,
        };

        if (entry) {
            updateEntry(entry.id, { ...newEntry, id: entry.id });
        } else {
            addEntry(newEntry);
        }

        onClose();
    };

    const handleImageUploaded = (url: string) => {
        setImageUrl(url);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    {entry ? 'Edit Entry' : 'Add New Entry'}
                                </Dialog.Title>

                                <button
                                    aria-label="Close Modal"
                                    type="button"
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                                    onClick={onClose}
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>

                                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Movie/Series Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            required
                                            defaultValue={entry?.name}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                                            Release Year
                                        </label>
                                        <input
                                            type="text"
                                            name="year"
                                            id="year"
                                            required
                                            placeholder="e.g., 2022-2024"
                                            defaultValue={entry?.year}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                            Category
                                        </label>
                                        <input
                                            type="text"
                                            name="category"
                                            id="category"
                                            list="categoryList"
                                            required
                                            defaultValue={entry?.category}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                        <datalist id="categoryList">
                                            <option value="Anime" />
                                            <option value="Marvel" />
                                            <option value="OTT Series" />
                                            <option value="Bollywood Movies" />
                                            <option value="South Movies" />
                                            <option value="Telugu Movies" />
                                            <option value="Hollywood Movies" />
                                            <option value="Hollywood Series" />
                                        </datalist>
                                    </div>

                                    <div>
                                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                            Status
                                        </label>
                                        <select
                                            name="status"
                                            id="status"
                                            required
                                            defaultValue={entry?.status}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        >
                                            <option value="Watched">Watched</option>
                                            <option value="Currently Watching">Currently Watching</option>
                                            <option value="To Watch">To Watch</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                                            Rating
                                        </label>
                                        <select
                                            name="rating"
                                            id="rating"
                                            required
                                            defaultValue={entry?.rating}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        >
                                            {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((rating) => (
                                                <option key={rating} value={rating}>
                                                    {rating}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">
                                            Remarks
                                        </label>
                                        <textarea
                                            name="remarks"
                                            id="remarks"
                                            rows={3}
                                            defaultValue={entry?.remarks}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="platform" className="block text-sm font-medium text-gray-700">
                                            Streaming Platform
                                        </label>
                                        <input
                                            type="text"
                                            name="platform"
                                            id="platform"
                                            defaultValue={entry?.platform}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Movie Poster
                                        </label>
                                        <ImageUploader
                                            onImageUploaded={handleImageUploaded}
                                            initialImageUrl={entry?.imageUrl}
                                            aspectRatio="poster"
                                        />
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                                        >
                                            {entry ? 'Update Entry' : 'Add Entry'}
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
} 