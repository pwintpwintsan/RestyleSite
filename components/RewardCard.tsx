
import React from 'react';
import { Reward } from '../types';

interface RewardCardProps {
  reward: Reward;
  userPoints: number;
  onRedeem: (reward: Reward) => void;
  isDark?: boolean;
}

export const RewardCard: React.FC<RewardCardProps> = ({ reward, userPoints, onRedeem, isDark }) => {
  const canAfford = userPoints >= reward.pointsCost;

  return (
    <div className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100'} rounded-[2rem] overflow-hidden shadow-sm border group transition-all hover:shadow-2xl hover:border-white/30`}>
      <div className="relative h-56 overflow-hidden">
        <img 
          src={reward.image} 
          alt={reward.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-black/80 backdrop-blur-md text-white text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-[0.2em] border border-white/10">
            {reward.category}
          </span>
        </div>
      </div>
      <div className="p-7">
        <div className="flex justify-between items-start mb-3 gap-4">
          <h4 className={`font-serif text-xl font-bold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{reward.title}</h4>
          <span className="text-amber-500 font-black text-xs whitespace-nowrap tracking-wider">{reward.pointsCost.toLocaleString()} PTS</span>
        </div>
        <p className="text-sm text-gray-500 mb-8 line-clamp-2 leading-relaxed">{reward.description}</p>
        <button
          onClick={() => onRedeem(reward)}
          disabled={!canAfford}
          className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all ${
            canAfford 
              ? 'bg-white text-black hover:bg-amber-400 active:scale-95' 
              : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
          }`}
        >
          {canAfford ? 'Acquire Reward' : `${(reward.pointsCost - userPoints).toLocaleString()} pts needed`}
        </button>
      </div>
    </div>
  );
};
