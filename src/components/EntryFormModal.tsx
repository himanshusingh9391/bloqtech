import { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SuccessModal from './SuccessModal';

interface EntryFormModalProps {
  poNumber: string;
  onClose: () => void;
}

interface FormData {
  poDate: string;
  supplierName: string;
  supplierAddress: string;
  invoiceNo: string;
  driverEmail: string;
  vehicleType: string;
  vehicleNumber: string;
  drivingLicenseNo: string;
  remark: string;
}

export default function EntryFormModal({ poNumber, onClose }: EntryFormModalProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    poDate: '',
    supplierName: '',
    supplierAddress: '',
    invoiceNo: '',
    driverEmail: '',
    vehicleType: 'Mini Truck',
    vehicleNumber: '',
    drivingLicenseNo: '',
    remark: '',
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { data: seqData } = await supabase.rpc('nextval', { sequence_name: 'entry_number_seq' });
      const entryNumber = `IGE-${seqData || Math.floor(Math.random() * 10000)}`;

      const { error } = await supabase.from('inward_gate_entries').insert([
        {
          entry_number: entryNumber,
          po_no: poNumber,
          po_date: formData.poDate,
          supplier_name: formData.supplierName,
          supplier_address: formData.supplierAddress,
          invoice_no: formData.invoiceNo,
          driver_email: formData.driverEmail,
          vehicle_type: formData.vehicleType,
          vehicle_number: formData.vehicleNumber,
          driving_license_no: formData.drivingLicenseNo,
          remark: formData.remark,
          created_by: 'System User',
        },
      ]);

      if (error) throw error;
      setShowSuccess(true);
    } catch (error) {
      console.error('Error creating entry:', error);
      alert('Failed to create entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return <SuccessModal onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full my-8">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-1">
              <span>Gate Entry Management</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span>Inward Gate Entry</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span>New Inward Gate Entry</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">New Inward Gate Entry</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto">
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex">
                <span className="text-sm font-medium text-gray-700 w-32">PO No.</span>
                <span className="text-sm text-gray-900">: {poNumber}</span>
              </div>
              <div className="flex">
                <span className="text-sm font-medium text-gray-700 w-32">PO Date</span>
                <input
                  type="text"
                  value={formData.poDate}
                  onChange={(e) => handleInputChange('poDate', e.target.value)}
                  placeholder="e.g. 10 Apr 25"
                  className="text-sm text-gray-900 flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex">
              <span className="text-sm font-medium text-gray-700 w-32">Supplier Name</span>
              <input
                type="text"
                value={formData.supplierName}
                onChange={(e) => handleInputChange('supplierName', e.target.value)}
                placeholder="Enter supplier name"
                className="text-sm text-gray-900 flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex">
              <span className="text-sm font-medium text-gray-700 w-32">Supplier Address</span>
              <input
                type="text"
                value={formData.supplierAddress}
                onChange={(e) => handleInputChange('supplierAddress', e.target.value)}
                placeholder="Enter supplier address"
                className="text-sm text-gray-900 flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex items-start">
              <span className="text-sm font-medium text-gray-700 w-40 pt-2">Invoice No.*</span>
              <div className="flex-1">
                <input
                  type="text"
                  value={formData.invoiceNo}
                  onChange={(e) => handleInputChange('invoiceNo', e.target.value)}
                  placeholder="Enter invoice number"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-sm font-medium text-gray-700 w-40 pt-2">Driver Email Id</span>
              <div className="flex-1">
                <input
                  type="email"
                  value={formData.driverEmail}
                  onChange={(e) => handleInputChange('driverEmail', e.target.value)}
                  placeholder="Enter driver email"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-sm font-medium text-gray-700 w-40 pt-2">Vehicle Type*</span>
              <div className="flex-1 relative">
                <select
                  value={formData.vehicleType}
                  onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Mini Truck</option>
                  <option>Large Truck</option>
                  <option>Van</option>
                  <option>Car</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-sm font-medium text-gray-700 w-40 pt-2">Vehicle Number*</span>
              <div className="flex-1">
                <input
                  type="text"
                  value={formData.vehicleNumber}
                  onChange={(e) => handleInputChange('vehicleNumber', e.target.value)}
                  placeholder="Enter vehicle number"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-sm font-medium text-gray-700 w-40 pt-2">Driving License No.*</span>
              <div className="flex-1">
                <input
                  type="text"
                  value={formData.drivingLicenseNo}
                  onChange={(e) => handleInputChange('drivingLicenseNo', e.target.value)}
                  placeholder="Enter driving license number"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-sm font-medium text-gray-700 w-40 pt-2">Remark*</span>
              <div className="flex-1">
                <textarea
                  value={formData.remark}
                  onChange={(e) => handleInputChange('remark', e.target.value)}
                  placeholder="Enter remarks"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Generating...' : 'Generate Entry Pass'}
          </button>
        </div>
      </div>
    </div>
  );
}
