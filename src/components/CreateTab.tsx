import { useState } from 'react';
import { FileText, Plus } from 'lucide-react';
import PurchaseOrderModal from './PurchaseOrderModal';

export default function CreateTab() {
  const [showPOModal, setShowPOModal] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center py-16">
        <div className="relative mb-6">
          <FileText className="w-24 h-24 text-gray-300" />
          <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2">
            <Plus className="w-6 h-6 text-white" />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-2">Create Inward Gate Entry</h2>
        <p className="text-sm text-gray-600 text-center mb-8 max-w-md">
          Record and verify all incoming materials at the gate before allowing entry into the premises.
        </p>

        <button
          onClick={() => setShowPOModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-md font-medium transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create</span>
        </button>
      </div>

      {showPOModal && <PurchaseOrderModal onClose={() => setShowPOModal(false)} />}
    </>
  );
}
