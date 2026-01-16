
import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: string;
  bgColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon, trend, bgColor = "bg-white" }) => {
  return (
    <div className={`${bgColor} p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col`}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">{label}</span>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-2">
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        {trend && <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{trend}</span>}
      </div>
    </div>
  );
};
