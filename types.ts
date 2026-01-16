
export enum Tier {
  MEMBER = 'Member',
  SILVER = 'Silver',
  GOLD = 'Gold',
  PLATINUM = 'Platinum'
}

export interface TierBenefit {
  tier: Tier;
  minSpend: number;
  benefits: string[];
  color: string;
}

export interface UserStats {
  points: number;
  totalSpent: number;
  tier: Tier;
  restyleCount: number;
}

export interface Transaction {
  id: string;
  date: string;
  service: string;
  points: number;
  amount: number;
  status: 'pending' | 'completed';
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  image: string;
  category: 'Service' | 'Product' | 'Experience';
  exclusiveTo?: Tier;
}

export interface ScannedResult {
  service: string;
  amount: number;
  points: number;
  date: string;
  storeLocation: string;
}
