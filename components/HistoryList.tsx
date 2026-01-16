
import React from 'react';
import { Transaction } from '../types';

interface HistoryListProps {
  transactions: Transaction[];
  isDark?: boolean;
}

export const HistoryList: React.FC<HistoryListProps> = ({ transactions, isDark }) => {
  return (
    <div className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100'} rounded-[2rem] shadow-sm border overflow-hidden`}>
      <div className="px-8 py-5 border-b border-white/5 flex justify-between items-center">
        <h3 className={`font-serif text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Purchase Records</h3>
        <button className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-[0.2em] transition-colors">Audit All</button>
      </div>
      <div className="divide-y divide-white/5">
        {transactions.map((t) => (
          <div key={t.id} className="px-8 py-5 flex items-center justify-between hover:bg-white/5 transition-colors group">
            <div className="flex items-center gap-5">
              <div className={`w-12 h-12 rounded-2xl ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-100'} border flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <div>
                <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.service}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">{new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-sm text-amber-500">+{t.points.toLocaleString()} PTS</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mt-1">{t.amount.toLocaleString()} Ks</p>
            </div>
          </div>
        ))}
        {transactions.length === 0 && (
          <div className="p-12 text-center text-gray-600 italic">No transactions recorded yet.</div>
        )}
      </div>
    </div>
  );
};
