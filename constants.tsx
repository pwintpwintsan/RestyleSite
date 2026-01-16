
import React from 'react';
import { Reward, Tier, Transaction, UserStats } from './types';

export const INITIAL_STATS: UserStats = {
  points: 1250,
  totalSpent: 450,
  tier: Tier.SILVER,
  restyleCount: 8,
  nextRewardPoints: 1500
};

export const SERVICES = [
  "Hemming & Tailoring",
  "Vintage Restoration",
  "Eco-Dry Cleaning",
  "Custom Embroidery",
  "Leather Care",
  "Fabric Repair"
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2024-05-10', service: 'Hemming & Tailoring', points: 150, amount: 75, status: 'completed' },
  { id: '2', date: '2024-05-02', service: 'Vintage Restoration', points: 300, amount: 120, status: 'completed' },
  { id: '3', date: '2024-04-15', service: 'Eco-Dry Cleaning', points: 50, amount: 35, status: 'completed' },
];

export const AVAILABLE_REWARDS: Reward[] = [
  {
    id: 'r1',
    title: 'Free Tailoring Consultation',
    description: 'A 30-minute one-on-one session with our lead artisan.',
    pointsCost: 500,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=400',
    category: 'Service'
  },
  {
    id: 'r2',
    title: 'Signature Fabric Mist',
    description: 'Restore the freshness of your garments between washes.',
    pointsCost: 800,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400',
    category: 'Product'
  },
  {
    id: 'r3',
    title: 'VIP Workshop Entry',
    description: 'Access to our exclusive upcycling masterclass.',
    pointsCost: 2000,
    image: 'https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?auto=format&fit=crop&q=80&w=400',
    category: 'Experience'
  },
  {
    id: 'r4',
    title: 'Lifetime Patching Kit',
    description: 'Premium needles and threads for home restoration.',
    pointsCost: 1200,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=400',
    category: 'Product'
  }
];

export const ICONS = {
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
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
  )
};
