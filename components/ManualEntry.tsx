
import React, { useState } from 'react';
import { CATEGORIES as SERVICES } from '../constants';

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
    setTimeout(() => {
      onSuccess(numAmount, service);
    }, 800);
  };

  const calculatedPoints = amount ? Math.floor(parseFloat(amount) / 10) : 0;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        onClick={onCancel}
      />
      
      <div className="relative w-full max-w-xl bg-[#111] border border-white/10 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-10 lg:p-14">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-3xl font-serif font-bold text-white tracking-tight">Shopping Record</h3>
              <p className="text-xs text-gray-500 mt-2 uppercase tracking-[0.2em] font-bold">Update My Fashion Activity</p>
            </div>
            <button onClick={onCancel} className="text-white/20 hover:text-white transition-colors p-2 bg-white/5 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">Apparel Category</label>
              <select 
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-amber-500 outline-none transition-all appearance-none font-bold text-white"
              >
                {SERVICES.map(s => <option key={s} value={s} className="bg-black text-white">{s}</option>)}
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">Amount Spent (Ks)</label>
              <div className="relative">
                 <input 
                  autoFocus
                  type="number" 
                  step="1"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-6 text-4xl font-serif font-bold focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-white/5 text-white pr-16"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xl font-serif font-bold text-white/40">Ks</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-500/20 to-transparent rounded-[2rem] p-8 border border-amber-500/20 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2">Points You'll Earn</p>
                <p className="text-4xl font-serif font-bold text-white tracking-tighter">{calculatedPoints.toLocaleString()}</p>
              </div>
              <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
            </div>

            <button
              type="submit"
              disabled={!amount || isSubmitting}
              className={`w-full py-6 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] transition-all shadow-2xl ${
                amount && !isSubmitting 
                  ? 'bg-white text-black hover:bg-amber-400 hover:scale-[1.02] active:scale-95' 
                  : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
              }`}
            >
              {isSubmitting ? 'Recording Purchase...' : 'Confirm Entry'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
