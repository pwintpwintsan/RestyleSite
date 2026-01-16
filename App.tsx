
import React, { useState } from 'react';
import { INITIAL_STATS, MOCK_TRANSACTIONS, AVAILABLE_REWARDS, ICONS } from './constants';
import { StatCard } from './components/StatCard';
import { RewardCard } from './components/RewardCard';
import { HistoryList } from './components/HistoryList';
import { ManualEntry } from './components/ManualEntry';
import { UserStats, Transaction, Reward } from './types';

type Tab = 'dashboard' | 'rewards' | 'history';

const App: React.FC = () => {
  const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleAddPurchase = (amount: number, service: string) => {
    const points = Math.floor(amount * 2);
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      service: service,
      points: points,
      amount: amount,
      status: 'completed'
    };

    setTransactions([newTransaction, ...transactions]);
    setStats(prev => ({
      ...prev,
      points: prev.points + points,
      totalSpent: prev.totalSpent + amount,
      restyleCount: prev.restyleCount + 1
    }));
    
    setIsAddingEntry(false);
    showNotification(`Successfully recorded! You earned ${points} points.`);
  };

  const handleRedeem = (reward: Reward) => {
    if (stats.points >= reward.pointsCost) {
      setStats(prev => ({
        ...prev,
        points: prev.points - reward.pointsCost
      }));
      showNotification(`Redeemed: ${reward.title}. Check your email for details.`);
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const progressPercentage = (stats.points / stats.nextRewardPoints) * 100;

  return (
    <div className="min-h-screen pb-24 lg:pb-0 lg:pl-64 bg-[#fcfcfc] text-gray-900 font-sans">
      
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-100 flex-col p-8 z-40">
        <div className="mb-12">
          <h1 className="text-3xl font-serif font-bold tracking-tighter">RESTYLE</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-amber-600 font-bold">Loyalty Rewards</p>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <ICONS.Home /> <span className="font-semibold">Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('rewards')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'rewards' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <ICONS.Trophy /> <span className="font-semibold">Rewards Shop</span>
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'history' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <ICONS.History /> <span className="font-semibold">History</span>
          </button>
        </nav>

        <div className="pt-8 border-t border-gray-100">
          <div className="bg-amber-50 rounded-2xl p-4">
            <p className="text-xs text-amber-800 font-bold uppercase mb-2">Member Tier</p>
            <h4 className="text-xl font-bold text-amber-900">{stats.tier}</h4>
            <div className="mt-3 w-full bg-amber-200 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-amber-600 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <p className="text-[10px] text-amber-700 mt-2 font-medium">{stats.nextRewardPoints - stats.points} pts to next tier</p>
          </div>
        </div>
      </aside>

      {/* Header - Mobile */}
      <header className="lg:hidden p-6 flex justify-between items-center bg-white border-b border-gray-100 sticky top-0 z-30">
        <div>
          <h1 className="text-2xl font-serif font-bold tracking-tighter">RESTYLE</h1>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 px-3 py-1 rounded-full">
          <span className="text-amber-600"><ICONS.Trophy /></span>
          <span className="font-bold text-sm text-amber-900">{stats.points}</span>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-10">
          <div className="bg-black text-white px-6 py-3 rounded-full shadow-2xl font-medium flex items-center gap-3">
            <span className="text-emerald-400">●</span>
            {notification}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="p-6 lg:p-12 max-w-6xl mx-auto">
        {activeTab === 'dashboard' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Artisan.</h2>
              <p className="text-gray-500">Your restyling journey has saved <span className="font-bold text-black">12.4kg</span> of textile waste this year.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard label="Available Points" value={stats.points.toLocaleString()} icon={<ICONS.Trophy />} bgColor="bg-white" />
              <StatCard label="Total Impact" value={`$${stats.totalSpent.toFixed(2)}`} trend="+12%" />
              <StatCard label="Services Logged" value={stats.restyleCount} trend="Active" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-black rounded-3xl p-8 text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-amber-500/30 transition-all"></div>
                  <h3 className="text-2xl font-bold mb-4">Record New Restyle</h3>
                  <p className="text-gray-400 mb-8 max-w-sm">Bridge your offline boutique visit by recording your service amount manually. Points are updated instantly.</p>
                  <button 
                    onClick={() => setIsAddingEntry(true)}
                    className="bg-white text-black px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-gray-100 transition-all hover:scale-[1.02] shadow-xl"
                  >
                    <ICONS.Plus /> Add Purchase
                  </button>
                </div>
                <HistoryList transactions={transactions.slice(0, 3)} />
              </div>

              <aside className="space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-lg">Next Milestones</h4>
                  <button onClick={() => setActiveTab('rewards')} className="text-amber-600 text-xs font-bold uppercase tracking-wider">See All</button>
                </div>
                {AVAILABLE_REWARDS.slice(0, 2).map(r => (
                  <RewardCard key={r.id} reward={r} userPoints={stats.points} onRedeem={handleRedeem} />
                ))}
              </aside>
            </div>
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Rewards Catalog</h2>
                <p className="text-gray-500">Exclusively curated for our most dedicated members.</p>
              </div>
              <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 flex items-center gap-4">
                <span className="text-sm font-medium text-gray-500">Your Balance:</span>
                <span className="text-xl font-bold text-amber-600">{stats.points} <span className="text-xs uppercase">Pts</span></span>
              </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {AVAILABLE_REWARDS.map(r => (
                <RewardCard key={r.id} reward={r} userPoints={stats.points} onRedeem={handleRedeem} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Restyling Archive</h2>
              <p className="text-gray-500">Every alteration is a step towards a more sustainable future.</p>
            </header>
            <HistoryList transactions={transactions} />
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around p-4 pb-8 z-40 backdrop-blur-lg bg-white/80">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-black' : 'text-gray-400'}`}
        >
          <ICONS.Home />
          <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
        </button>
        <button 
          onClick={() => setIsAddingEntry(true)}
          className="flex flex-col items-center -mt-10"
        >
          <div className="bg-black text-white p-5 rounded-full shadow-2xl border-4 border-[#fcfcfc] active:scale-90 transition-transform">
            <ICONS.Plus />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-black mt-2">Add</span>
        </button>
        <button 
          onClick={() => setActiveTab('rewards')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'rewards' ? 'text-black' : 'text-gray-400'}`}
        >
          <ICONS.Trophy />
          <span className="text-[10px] font-bold uppercase tracking-widest">Rewards</span>
        </button>
      </nav>

      {/* Manual Entry Modal */}
      {isAddingEntry && (
        <ManualEntry 
          onSuccess={handleAddPurchase} 
          onCancel={() => setIsAddingEntry(false)} 
        />
      )}
    </div>
  );
};

export default App;
