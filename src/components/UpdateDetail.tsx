// src/components/UpdateDetail.tsx
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ChangeDetail } from '../types';
import { diffWords } from 'diff';
import LoadingSpinner from './LoadingSpinner';

export default function UpdateDetail() {
  const { changeId } = useParams<{ changeId: string }>();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<ChangeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (changeId) {
      fetchDetail();
    }
  }, [changeId]);

  async function fetchDetail() {
    try {
      setLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase.rpc('get_change_details', {
        p_change_id: changeId
      });

      if (supabaseError) throw supabaseError;

      if (data && data.length > 0) {
        setDetail(data[0]);
        await markAsReviewed();
      } else {
        setError('Change not found');
      }
    } catch (err) {
      console.error('Error fetching change details:', err);
      setError('Failed to load change details');
    } finally {
      setLoading(false);
    }
  }

  async function markAsReviewed() {
    try {
      await supabase.rpc('mark_as_reviewed', { p_change_id: changeId });
    } catch (err) {
      console.error('Error marking as reviewed:', err);
    }
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !detail) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {error || 'Change Not Found'}
        </h2>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Updates
        </Link>
      </div>
    );
  }

  const diff = diffWords(detail.old_content, detail.new_content);

  return (
    <div>
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Updates
      </Link>

      {/* Regulation Info Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900 flex-1 pr-4">
            {detail.regulation_title}
          </h1>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0">
            REVIEWED
          </span>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <div>
              <span className="font-medium text-gray-700">URL:</span>{' '}
              
                href={detail.regulation_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline break-all"
              >
                {detail.regulation_url}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-gray-700">Change Detected:</span>{' '}
            <span className="text-gray-600">
              {new Date(detail.detected_at).toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* View Mode Toggle */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">Content Comparison</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('split')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'split'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Split View
            </button>
            <button
              onClick={() => setViewMode('unified')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'unified'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Unified View
            </button>
          </div>
        </div>

        {/* Split View */}
        {viewMode === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-3 bg-red-50 p-3 rounded-lg flex items-center gap-2">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
                Previous Version
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono text-sm whitespace-pre-wrap overflow-auto max-h-96 leading-relaxed">
                {detail.old_content || 'No previous content'}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-3 bg-green-50 p-3 rounded-lg flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Current Version
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono text-sm whitespace-pre-wrap overflow-auto max-h-96 leading-relaxed">
                {detail.new_content}
              </div>
            </div>
          </div>
        )}

        {/* Unified View */}
        {viewMode === 'unified' && (
          <div>
            <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Changes Highlighted
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono text-sm whitespace-pre-wrap overflow-auto max-h-96 leading-relaxed">
              {diff.map((part, index) => (
                <span
                  key={index}
                  className={
                    part.added
                      ? 'bg-green-200 text-green-900'
                      : part.removed
                      ? 'bg-red-200 text-red-900 line-through'
                      : ''
                  }
                >
                  {part.value}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 font-medium mb-2">Legend:</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="bg-red-200 px-2 py-1 rounded">Text</span>
              <span className="text-gray-600">= Removed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-green-200 px-2 py-1 rounded">Text</span>
              <span className="text-gray-600">= Added</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
