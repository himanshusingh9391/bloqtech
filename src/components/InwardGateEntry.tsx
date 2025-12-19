import { useState } from 'react';
import CreateTab from './CreateTab';
import ReportTab from './ReportTab';

interface InwardGateEntryProps {
  onBack: () => void;
}

export default function InwardGateEntry({ onBack }: InwardGateEntryProps) {
  const [activeTab, setActiveTab] = useState<'create' | 'report'>('create');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-slate-800 text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button onClick={onBack} className="hover:bg-slate-700 p-2 rounded">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm text-gray-300">Gate Entry Management</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-sm">Inward Gate Entry</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="hover:bg-slate-700 p-2 rounded">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Inward Gate Entry</h1>

        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('create')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'create'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Create
              </button>
              <button
                onClick={() => setActiveTab('report')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'report'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Report
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'create' ? <CreateTab /> : <ReportTab />}
          </div>
        </div>
      </main>
    </div>
  );
}
