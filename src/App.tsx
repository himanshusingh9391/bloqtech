import { useState } from 'react';
import Dashboard from './components/Dashboard';
import InwardGateEntry from './components/InwardGateEntry';

type Page = 'dashboard' | 'inward' | 'visitor' | 'returnable' | 'non-returnable' | 'outward';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const handleNavigate = (page: string) => {
    if (page === 'inward') {
      setCurrentPage('inward');
    } else {
      alert(`${page} page is under development`);
    }
  };

  const handleBack = () => {
    setCurrentPage('dashboard');
  };

  return (
    <>
      {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
      {currentPage === 'inward' && <InwardGateEntry onBack={handleBack} />}
    </>
  );
}

export default App;
