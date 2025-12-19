import { useEffect, useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';
import dummyData from '../data/dummyData.json';

interface InwardGateEntry {
  id: string;
  entry_number: string;
  vehicle_number: string;
  supplier_name: string;
  created_at: string;
  created_by: string;
}

export default function ReportTab() {
  const [entries, setEntries] = useState<InwardGateEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setEntries(dummyData as InwardGateEntry[]);
      setLoading(false);
    }, 500);
  }, []);

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).replace(',', ' |');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No entries found. Create your first entry to get started.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="hidden lg:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Entry Id
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Supplier Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date and Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created by
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {entries.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {entry.entry_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {entry.vehicle_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {entry.supplier_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDateTime(entry.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {entry.created_by}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => alert('View functionality coming soon')}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="View"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden space-y-4">
        {entries.map((entry) => (
          <div key={entry.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">Entry Id</p>
                  <p className="text-sm font-semibold text-gray-900">{entry.entry_number}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => alert('View functionality coming soon')}
                    className="text-blue-600 hover:text-blue-800 transition-colors p-2"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="text-red-600 hover:text-red-800 transition-colors p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">Vehicle Number</p>
                  <p className="text-sm text-gray-900">{entry.vehicle_number}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">Created by</p>
                  <p className="text-sm text-gray-900">{entry.created_by}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase font-medium">Supplier Name</p>
                <p className="text-sm text-gray-900">{entry.supplier_name}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase font-medium">Date and Time</p>
                <p className="text-sm text-gray-900">{formatDateTime(entry.created_at)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
