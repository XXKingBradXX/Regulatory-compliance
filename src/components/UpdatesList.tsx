// src/components/UpdatesList.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Update } from '../types';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

export default function UpdatesList() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUpdates();
  }, []);

  async function fetchUpdates() {
    try {
      setLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase.rpc('get_this_weeks_changes');

      if (supabaseError) throw supabaseError;

      setUpdates(data || []);
    } catch (err) {
      console.error('Error fetching updates:', err);
      setError('Failed to load updates. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-semibold text-red-900 mb-2">Error Loading Updates</h2>
        <p className="text-red-700">{error}</p>
        <button
          onClick={fetchUpdates}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (updates.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <div className="text-8xl mb-6">✅</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          No Updates This Week
        </h2>
        <p className="text-gray-600 text-lg">
          All regulations are current. The system will check again next Monday.
        </p>
        <div className="mt-8 p-4 bg-blue-50 rounded-lg inline-block">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Next scan:</span> Monday 6:00 AM
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              This Week's Updates
            </h2>
            <p className="text-gray-600 mt-2">
              {updates.length} regulation{updates.length !== 1 ? 's' : ''} updated in the last 7 days
            </p>
          </div>
          <div className="hidden sm:block">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
              {updates.filter(u => !u.reviewed).length} Unreviewed
            </div>
          </div>
        </div>
      </div>

      {/* Updates List */}
      <div className="space-y-4">
        {updates.map((update) => (
          <Link
            key={update.change_id}
            to={`/change/${update.change_id}`}
            className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 p-6 border-l-4 border-blue-600 hover:border-blue-700 group"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 pr-4">
                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {update.regulation_title}
                </h3>

                {/* URL */}
                
                  href={update.regulation_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="break-all">{update.regulation_url}</span>
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                {/* Timestamp */}
                <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Updated: {new Date(update.detected_at).toLocaleString()}</span>
                </div>
              </div>

              {/* Status & Action */}
              <div className="flex flex-col items-end gap-3 flex-shrink-0">
                {!update.reviewed && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                    NEW
                  </span>
                )}
                <span className="text-blue-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Changes
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
