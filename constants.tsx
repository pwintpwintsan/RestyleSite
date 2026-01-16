
import React from 'react';
import { Reward, Tier, Transaction, UserStats, TierBenefit } from './types';

export const INITIAL_STATS: UserStats = {
  points: 4500,
  totalSpent: 48500,
  tier: Tier.MEMBER,
  restyleCount: 5,
};

export const TIER_CONFIG: TierBenefit[] = [
  {
    tier: Tier.SILVER,
    minSpend: 50000,
    benefits: ["5% Off All Purchases", "Seasonal Lookbook Access", "Birthday Special Discount"],
    color: "from-slate-300 to-slate-500"
  },
  {
    tier: Tier.GOLD,
    minSpend: 100000,
    benefits: ["10% Off All Purchases", "Early Access to Sales", "Free Express Shipping"],
    color: "from-amber-300 to-amber-600"
  },
  {
    tier: Tier.PLATINUM,
    minSpend: 200000,
    benefits: ["15% Off All Purchases", "Dedicated Personal Shopper", "Exclusive Capsule Collection Invites"],
    color: "from-indigo-400 to-purple-600"
  }
];

export const CATEGORIES = [
  "Evening Collection",
  "Ready-To-Wear",
  "Seasonal Essentials",
  "Premium Outerwear",
  "Bespoke Tailored Piece",
  "Limited Edition Accessories"
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2024-05-10', service: 'Evening Silk Gown', points: 15000, amount: 75000, status: 'completed' },
  { id: '2', date: '2024-05-02', service: 'Summer Linen Suit', points: 6000, amount: 30000, status: 'completed' },
  { id: '3', date: '2024-04-15', service: 'Essential Wool Blazer', points: 2400, amount: 12000, status: 'completed' },
];

export const AVAILABLE_REWARDS: Reward[] = [
  {
    id: 'r1',
    title: '5,000 Ks Store Credit',
    description: 'Redeem your points for immediate shopping credit on your next visit.',
    pointsCost: 5000,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600',
    category: 'Product'
  },
  {
    id: 'r2',
    title: 'Exclusive Scarf Set',
    description: 'A limited edition Restyle signature silk scarf set.',
    pointsCost: 15000,
    image: 'https://images.unsplash.com/photo-1601924638867-3a6de6b7a58e?auto=format&fit=crop&q=80&w=600',
    category: 'Product'
  },
  {
    id: 'r3',
    title: 'Private Preview Night',
    description: 'Be the first to see our upcoming collection with cocktails and catering.',
    pointsCost: 30000,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600',
    category: 'Experience',
    exclusiveTo: Tier.GOLD
  },
  {
    id: 'r4',
    title: '25,000 Ks Luxury Voucher',
    description: 'Our highest value voucher for our most loyal Platinum members.',
    pointsCost: 60000,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=600',
    category: 'Product',
    exclusiveTo: Tier.PLATINUM
  }
];

export const ICONS = {
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  ),
  Trophy: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.503-1.125 1.125-1.125h.872m5.003 0V12m-9 0V3m9 9V3m0 0h.375a1.125 1.125 0 0 1 1.125 1.125V6.75A9.75 9.75 0 0 1 12 16.5a9.75 9.75 0 0 1-9.75-9.75V4.125A1.125 1.125 0 0 1 3.375 3h.375m9 0h-9m9 9a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>
  ),
  History: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  Home: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  Globe: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m17.432 0a8.959 8.959 0 0 1-4.893 4.482M12 16.5c.237 0 .47-.008.702-.023m0 0A17.919 17.919 0 0 0 20.716 14.253M12 16.5a17.919 17.919 0 0 1-8.716-2.247m0 0A8.959 8.959 0 0 0 3 12c0-.778.099-1.533.284-2.253m0 0A17.919 17.919 0 0 0 12 10.5Z" />
    </svg>
  )
};
