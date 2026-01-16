import React, { useState, useMemo } from 'react';
import { INITIAL_STATS, MOCK_TRANSACTIONS, AVAILABLE_REWARDS, ICONS, TIER_CONFIG } from './constants.tsx';
import { StatCard } from './components/StatCard.tsx';
import { RewardCard } from './components/RewardCard.tsx';
import { HistoryList } from './components/HistoryList.tsx';
import { ManualEntry } from './components/ManualEntry.tsx';
import { UserStats, Transaction, Reward, Tier } from './types.ts';

type Tab = 'dashboard' | 'rewards' | 'history';

const App: React.FC = () => {
  const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const currentTier = useMemo(() => {
    if (stats.totalSpent >= 200000) return Tier.PLATINUM;
    if (stats.totalSpent >= 100000) return Tier.GOLD;
    if (stats.totalSpent >= 50000) return Tier.SILVER;
    return Tier.MEMBER;
  }, [stats.totalSpent]);

  const nextTierInfo = useMemo(() => {
    if (currentTier === Tier.PLATINUM) return null;
    const targets = [
      { tier: Tier.SILVER, min: 50000 },
      { tier: Tier.GOLD, min: 100000 },
      { tier: Tier.PLATINUM, min: 200000 }
    ];
    return targets.find(t => stats.totalSpent < t.min);
  }, [currentTier, stats.totalSpent]);

  const handleAddPurchase = (amount: number, service: string) => {
    const points = Math.floor(amount / 10); 
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
      restyleCount: prev.restyleCount + 1,
      tier: currentTier
    }));
    
    setIsAddingEntry(false);
    showNotification(`Shopping Recorded! You earned ${points.toLocaleString()} points.`);
  };

  const handleRedeem = (reward: Reward) => {
    if (stats.points >= reward.pointsCost) {
      setStats(prev => ({
        ...prev,
        points: prev.points - reward.pointsCost
      }));
      showNotification(`Reward Claimed: ${reward.title}. Use your code at checkout!`);
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const progressPercentage = useMemo(() => {
    if (!nextTierInfo) return 100;
    const currentMin = stats.totalSpent >= 100000 ? 100000 : (stats.totalSpent >= 50000 ? 50000 : 0);
    const progress = ((stats.totalSpent - currentMin) / (nextTierInfo.min - currentMin)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  }, [stats.totalSpent, nextTierInfo]);

  return (
    <div className="min-h-screen pb-24 lg:pb-0 lg:pl-64 bg-[#0a0a0a] text-white font-sans selection:bg-amber-500/30">
      
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-black border-r border-white/10 flex-col p-8 z-40">
        <div className="mb-12">
          <h1 className="text-3xl font-serif font-bold tracking-tighter text-white">RESTYLE</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-bold mt-1">Official Member</p>
        </div>

        <nav className="flex-1 space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'dashboard' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <ICONS.Home /> <span className="font-medium">Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('rewards')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'rewards' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <ICONS.Trophy /> <span className="font-medium">Rewards Shop</span>
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'history' ? 'bg-black text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <ICONS.History /> <span className="font-medium">My Purchases</span>
          </button>
          
          <div className="pt-4 mt-4 border-t border-white/5">
            <a 
              href="https://restyle-official.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-amber-500/80 hover:text-amber-500 transition-all group"
            >
              <ICONS.Globe /> <span className="font-medium">Shop Online</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>
        </nav>

        <div className="pt-8 mt-auto border-t border-white/10">
          <div className={`rounded-xl p-5 bg-gradient-to-br ${TIER_CONFIG.find(t => t.tier === currentTier)?.color || 'from-gray-700 to-gray-900'} shadow-xl relative overflow-hidden group`}>
             <div className="relative z-10">
              <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest mb-1">Status</p>
              <h4 className="text-2xl font-serif font-bold text-white drop-shadow-md">{currentTier}</h4>
              
              {nextTierInfo && (
                <>
                  <div className="mt-4 w-full bg-white/20 h-1 rounded-full overflow-hidden">
                    <div className="h-full bg-white shadow-[0_0_10px_white] rounded-full transition-all duration-1000" style={{ width: `${progressPercentage}%` }}></div>
                  </div>
                  <p className="text-[9px] text-white/80 mt-2 font-medium">To {nextTierInfo.tier}: {(nextTierInfo.min - stats.totalSpent).toLocaleString()} Ks</p>
                </>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Header - Mobile */}
      <header className="lg:hidden p-6 flex justify-between items-center bg-black border-b border-white/10 sticky top-0 z-30">
        <div>
          <h1 className="text-2xl font-serif font-bold tracking-tighter">RESTYLE</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <span className="text-amber-500 w-4 h-4"><ICONS.Trophy /></span>
            <span className="font-bold text-sm text-white">{stats.points.toLocaleString()}</span>
          </div>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-10 fade-in duration-300">
          <div className="bg-white text-black px-8 py-4 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.2)] font-semibold flex items-center gap-3">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
            {notification}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="p-6 lg:p-16 max-w-7xl mx-auto">
        {activeTab === 'dashboard' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-4xl font-serif font-bold text-white mb-3">Your Style Journey</h2>
                <p className="text-gray-400 max-w-xl">Manage your membership benefits and points earned from every purchase at Restyle boutique.</p>
              </div>
              <a 
                href="https://restyle-official.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500 hover:text-white transition-colors border border-amber-500/30 px-5 py-3 rounded-full hover:bg-amber-500/10"
              >
                Go To Official Store <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" /></svg>
              </a>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard label="Reward Points" value={stats.points.toLocaleString()} icon={<ICONS.Trophy />} bgColor="bg-white/5 border-white/10" />
              <StatCard label="Total Shopping" value={`${stats.totalSpent.toLocaleString()} Ks`} trend="Loyal Guest" bgColor="bg-white/5 border-white/10" />
              <StatCard label="Items Purchased" value={stats.restyleCount} trend="Fashionista" bgColor="bg-white/5 border-white/10" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                <div className="bg-gradient-to-br from-white/10 to-transparent rounded-[2.5rem] p-10 border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                  <div className="relative z-10">
                    <h3 className="text-3xl font-serif font-bold mb-4">Record New Purchase</h3>
                    <p className="text-gray-400 mb-10 max-w-md">Document your latest shopping haul from our offline store to update your points balance instantly.</p>
                    <button 
                      onClick={() => setIsAddingEntry(true)}
                      className="bg-white text-black px-10 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-amber-400 transition-all hover:scale-[1.03] shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
                    >
                      <ICONS.Plus /> Log New Shopping
                    </button>
                  </div>
                </div>
                
                <div className="space-y-6">
                   <div className="flex justify-between items-center">
                    <h4 className="font-serif text-2xl font-bold tracking-tight">Recent Purchases</h4>
                    <button onClick={() => setActiveTab('history')} className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest">View All</button>
                  </div>
                  <HistoryList transactions={transactions.slice(0, 3)} isDark={true} />
                </div>
              </div>

              <aside className="space-y-8">
                <div className="flex justify-between items-center">
                  <h4 className="font-serif text-2xl font-bold">Member Privileges</h4>
                  <span className="text-[10px] bg-amber-500 text-black font-black px-2 py-0.5 rounded tracking-tighter">ACTIVE</span>
                </div>
                
                <div className="space-y-4">
                  {TIER_CONFIG.find(t => t.tier === currentTier)?.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                      <span className="text-sm font-medium text-gray-200">{benefit}</span>
                    </div>
                  )) || (
                    <p className="text-sm text-gray-500 italic">Shop for at least 50,000 Ks to unlock Silver benefits.</p>
                  )}
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-3xl p-6">
                   <h5 className="font-bold text-amber-500 mb-2 uppercase text-xs tracking-widest">New Arrivals</h5>
                   <p className="text-xs text-gray-400 leading-relaxed">Our Spring Ready-To-Wear collection is now available. Exclusive 5% bonus points for this weekend!</p>
                </div>
              </aside>
            </div>
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-4xl font-serif font-bold text-white mb-3 text-center md:text-left">Rewards Shop</h2>
                <p className="text-gray-400 text-center md:text-left">Use your hard-earned points for vouchers and exclusive gifts.</p>
              </div>
              <div className="bg-white/5 px-8 py-4 rounded-2xl border border-white/10 backdrop-blur-lg flex items-center gap-6">
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">My Points</p>
                  <p className="text-2xl font-bold text-amber-500">{stats.points.toLocaleString()}</p>
                </div>
                <div className="w-px h-10 bg-white/10"></div>
                <div>
                   <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Tier</p>
                   <p className="text-lg font-bold text-white leading-tight uppercase tracking-tighter">{currentTier}</p>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {AVAILABLE_REWARDS.map(r => (
                <div key={r.id} className="relative group">
                   {r.exclusiveTo && r.exclusiveTo !== currentTier && (
                     <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 rounded-3xl flex flex-col items-center justify-center text-center p-6 border border-white/10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white/40 mb-3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                        <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-1">Limited Access</p>
                        <p className="text-lg font-serif font-bold text-white mb-4">Unlocks at {r.exclusiveTo}</p>
                        <button disabled className="px-6 py-2 bg-white/10 text-white/50 rounded-full text-[10px] font-black uppercase">Locked</button>
                     </div>
                   )}
                   <RewardCard reward={r} userPoints={stats.points} onRedeem={handleRedeem} isDark={true} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <header>
              <h2 className="text-4xl font-serif font-bold text-white mb-3">Shopping Archive</h2>
              <p className="text-gray-400">Track all your purchases and the points they've earned you.</p>
            </header>
            <HistoryList transactions={transactions} isDark={true} />
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/95 border-t border-white/10 flex justify-around p-5 pb-9 z-40 backdrop-blur-xl">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1.5 ${activeTab === 'dashboard' ? 'text-amber-500' : 'text-gray-500'}`}
        >
          <ICONS.Home />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Home</span>
        </button>
        <button 
          onClick={() => setIsAddingEntry(true)}
          className="flex flex-col items-center -mt-12 group"
        >
          <div className="bg-amber-500 text-black p-5 rounded-full shadow-[0_10px_40px_rgba(245,158,11,0.4)] border-4 border-[#0a0a0a] active:scale-90 transition-all">
            <ICONS.Plus />
          </div>
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-amber-500 mt-2">Log Buy</span>
        </button>
        <button 
          onClick={() => setActiveTab('rewards')}
          className={`flex flex-col items-center gap-1.5 ${activeTab === 'rewards' ? 'text-amber-500' : 'text-gray-500'}`}
        >
          <ICONS.Trophy />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Rewards</span>
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