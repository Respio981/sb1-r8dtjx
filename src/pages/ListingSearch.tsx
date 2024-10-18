import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { searchListings } from '../services/listingService';

type Listing = {
  id: string;
  mlsNumber: string;
  compensation: {
    type: 'percentage' | 'fixed';
    value: number;
  };
  documentUrl: string;
};

const ListingSearch: React.FC = () => {
  const [mlsNumber, setMlsNumber] = useState('');
  const [listing, setListing] = useState<Listing | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await searchListings(mlsNumber);
      setListing(result);
      setError('');
    } catch (err) {
      setListing(null);
      setError('Listing not found. Please check the MLS number and try again.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Search Listings</h2>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex">
          <input
            type="text"
            value={mlsNumber}
            onChange={(e) => setMlsNumber(e.target.value)}
            placeholder="Enter MLS Number"
            className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition duration-300 flex items-center"
          >
            <Search className="mr-2" /> Search
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {listing && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Listing Details</h3>
          <p><strong>MLS Number:</strong> {listing.mlsNumber}</p>
          <p><strong>Compensation:</strong> {listing.compensation.type === 'percentage' ? `${listing.compensation.value}%` : `$${listing.compensation.value.toFixed(2)}`}</p>
          <a
            href={listing.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline mt-4 inline-block"
          >
            View Compensation Agreement
          </a>
        </div>
      )}
    </div>
  );
};

export default ListingSearch;