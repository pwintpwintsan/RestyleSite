
import React from 'react';
import { Transaction } from '../types';

interface HistoryListProps {
  transactions: Transaction[];
}

export const HistoryList: React.FC<HistoryListProps> = ({ transactions }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center">
        <h3 className="font-bold text-gray-900">Activity History</h3>
        <button className="text-xs font-semibold text-gray-400 hover:text-black uppercase tracking-widest">View All</button>
      </div>
      <div className="divide-y divide-gray-50">
        {transactions.map((t) => (
          <div key={t.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900">{t.service}</p>
                <p className="text-xs text-gray-400">{new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm text-emerald-600">+{t.points} pts</p>
              <p className="text-xs text-gray-400">${t.amount.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
