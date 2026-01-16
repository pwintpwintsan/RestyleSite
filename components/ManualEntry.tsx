
import React, { useState } from 'react';
import { SERVICES } from '../constants';

interface ManualEntryProps {
  onSuccess: (amount: number, service: string) => void;
  onCancel: () => void;
}

export const ManualEntry: React.FC<ManualEntryProps> = ({ onSuccess, onCancel }) => {
  const [amount, setAmount] = useState<string>('');
  const [service, setService] = useState<string>(SERVICES[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    setIsSubmitting(true);
    // Simulate a brief "processing" state for premium feel
    setTimeout(() => {
      onSuccess(numAmount, service);
    }, 600);
  };

  const calculatedPoints = amount ? Math.floor(parseFloat(amount) * 2) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onCancel}
      />
      
      <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8 pb-4">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-serif font-bold tracking-tight">Record Purchase</h3>
            <button onClick={onCancel} className="text-gray-400 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Service Type</label>
              <select 
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-black outline-none transition-all appearance-none font-medium"
              >
                {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Amount Spent ($)</label>
              <input 
                autoFocus
                type="number" 
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4 text-2xl font-bold focus:ring-2 focus:ring-black outline-none transition-all placeholder:text-gray-200"
              />
            </div>

            <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100/50 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-1">Earned Reward</p>
                <p className="text-2xl font-bold text-amber-900">{calculatedPoints} PTS</p>
              </div>
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
            </div>

            <button
              type="submit"
              disabled={!amount || isSubmitting}
              className={`w-full py-5 rounded-[1.5rem] font-bold text-lg transition-all ${
                amount && !isSubmitting 
                  ? 'bg-black text-white hover:scale-[1.02] shadow-xl' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Logging...
                </div>
              ) : 'Confirm Transaction'}
            </button>
          </form>
        </div>
        <div className="p-6 bg-gray-50 text-center">
          <p className="text-xs text-gray-400 italic">This will be added to your Restyle Archive immediately.</p>
        </div>
      </div>
    </div>
  );
};
