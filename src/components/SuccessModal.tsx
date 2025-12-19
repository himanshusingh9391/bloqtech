import { CheckCircle } from 'lucide-react';

interface SuccessModalProps {
  onClose: () => void;
}

export default function SuccessModal({ onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div>
            <CheckCircle className="w-16 h-16 text-blue-500 relative" />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Inward Gate Pass Generated
        </h2>

        <button
          onClick={onClose}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-md font-medium transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
}
