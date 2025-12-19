import { ArrowDownToLine, KeyRound, Package, PackageX, ArrowUpFromLine } from 'lucide-react';

interface GateCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
}

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const gateCards: GateCard[] = [
    {
      id: 'inward',
      title: 'Inward Gate Entry',
      icon: <ArrowDownToLine className="w-12 h-12" />,
      color: 'text-blue-600',
    },
    {
      id: 'visitor',
      title: 'Visitor Gate Pass',
      icon: <KeyRound className="w-12 h-12" />,
      color: 'text-gray-700',
    },
    {
      id: 'returnable',
      title: 'Returnable Gate Pass',
      icon: <Package className="w-12 h-12" />,
      color: 'text-yellow-600',
    },
    {
      id: 'non-returnable',
      title: 'Non - Returnable Gate Pass',
      icon: <PackageX className="w-12 h-12" />,
      color: 'text-orange-600',
    },
    {
      id: 'outward',
      title: 'Outward Gate Entry',
      icon: <ArrowUpFromLine className="w-12 h-12" />,
      color: 'text-red-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-slate-800 text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button className="hover:bg-slate-700 p-2 rounded">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg font-medium">Gate Entry Management</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="hover:bg-slate-700 p-2 rounded relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gateCards.map((card) => (
            <button
              key={card.id}
              onClick={() => onNavigate(card.id)}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col items-center justify-center space-y-4 border border-gray-200 hover:border-blue-300"
            >
              <div className={`${card.color}`}>{card.icon}</div>
              <h2 className="text-base font-medium text-gray-800 text-center">{card.title}</h2>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
