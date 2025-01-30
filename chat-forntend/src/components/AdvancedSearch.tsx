import { useState } from 'react';
import { SearchIcon, XIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { AdvancedSearchProps, Message } from '@/types/index';


const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ groupId, onClose }) => {
  const [filters, setFilters] = useState({
    query: '',
    sender: '',
    startDate: '',
    endDate: '',
    hasAttachments: false,
    containsLinks: false,
    isRead: false,
  });
  const [searchResults, setSearchResults] = useState<Message[]>([]);

  const handleSearch = async () => {
    const params = new URLSearchParams({
      groupId: groupId.toString(),
      query: filters.query,
      sender: filters.sender,
      startDate: filters.startDate,
      endDate: filters.endDate,
      hasAttachments: filters.hasAttachments.toString(),
      containsLinks: filters.containsLinks.toString(),
      isRead: filters.isRead.toString()
    });

    const response = await axios.get(`/api/messages/search?${params}`);
    setSearchResults(response.data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Advanced Search</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <XIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Search messages..."
            value={filters.query}
            onChange={(e) => setFilters({ ...filters, query: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Sender"
              value={filters.sender}
              onChange={(e) => setFilters({ ...filters, sender: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>

        {searchResults.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Search Results</h3>
            {searchResults.map((message) => (
              <div key={message._id} className="p-4 border border-gray-200 rounded-lg">
                <p>{message.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearch;