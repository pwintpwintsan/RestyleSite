
import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: string;
  bgColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon, trend, bgColor = "bg-white/5" }) => {
  return (
    <div className={`${bgColor} p-8 rounded-[2rem] border border-white/5 flex flex-col hover:border-white/20 transition-all group`}>
      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.25em]">{label}</span>
        {icon && <div className="text-white/20 group-hover:text-amber-500 transition-colors">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-3">
        <h3 className="text-4xl font-serif font-bold text-white tracking-tighter">{value}</h3>
        {trend && (
          <span className="text-[10px] font-black text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full uppercase tracking-widest border border-amber-500/20">
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};
