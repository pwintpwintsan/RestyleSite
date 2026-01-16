
import React from 'react';
import { Reward } from '../types';

interface RewardCardProps {
  reward: Reward;
  userPoints: number;
  onRedeem: (reward: Reward) => void;
}

export const RewardCard: React.FC<RewardCardProps> = ({ reward, userPoints, onRedeem }) => {
  const canAfford = userPoints >= reward.pointsCost;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group transition-all hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={reward.image} 
          alt={reward.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
            {reward.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-bold text-gray-900 leading-tight">{reward.title}</h4>
          <span className="text-amber-600 font-bold text-sm whitespace-nowrap">{reward.pointsCost} PTS</span>
        </div>
        <p className="text-sm text-gray-500 mb-6 line-clamp-2">{reward.description}</p>
        <button
          onClick={() => onRedeem(reward)}
          disabled={!canAfford}
          className={`w-full py-3 rounded-xl font-bold transition-colors ${
            canAfford 
              ? 'bg-black text-white hover:bg-gray-800' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {canAfford ? 'Redeem Reward' : `${reward.pointsCost - userPoints} More Pts Needed`}
        </button>
      </div>
    </div>
  );
};
