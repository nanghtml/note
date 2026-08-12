import React, { useState, useMemo } from 'react';
import { 
  Wallet, 
  PiggyBank, 
  Receipt, 
  PieChart as PieChartIcon, 
  TrendingUp, 
  DollarSign, 
  Sparkles, 
  Info, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle2, 
  Sliders, 
  LayoutDashboard,
  Coins,
  Compass
} from 'lucide-react';

export default function App() {
  const [income, setIncome] = useState('1000');
  const [activeTab, setActiveTab] = useState('plan'); // 'plan' or 'analytics'

  // បញ្ជីចំណាយ និងភាគរយណែនាំតាមច្បាប់ 50/30/20
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'ប្រាក់សន្សំ និងវិនិយោគ', icon: PiggyBank, amount: '200', rec: 0.20, category: 'សន្សំ (20%)', color: 'from-emerald-500 to-teal-600', textColor: 'text-emerald-600', badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 2, name: 'ថ្លៃផ្ទះ ទឹក និងភ្លើង', icon: Wallet, amount: '250', rec: 0.25, category: 'ចាំបាច់ (50%)', color: 'from-blue-500 to-indigo-600', textColor: 'text-blue-600', badgeBg: 'bg-blue-50 text-blue-700 border-blue-200' },
    { id: 3, name: 'ម្ហូបអាហារប្រចាំថ្ងៃ', icon: Receipt, amount: '150', rec: 0.15, category: 'ចាំបាច់ (50%)', color: 'from-amber-500 to-orange-600', textColor: 'text-amber-600', badgeBg: 'bg-amber-50 text-amber-700 border-amber-200' },
    { id: 4, name: 'ថ្លៃធ្វើដំណើរ & សាំង', icon: TrendingUp, amount: '100', rec: 0.10, category: 'ចាំបាច់ (50%)', color: 'from-purple-500 to-violet-600', textColor: 'text-purple-600', badgeBg: 'bg-purple-50 text-purple-700 border-purple-200' },
    { id: 5, name: 'ការកម្សាន្ត និងទិញអីវ៉ាន់', icon: Coins, amount: '200', rec: 0.20, category: 'ចំណង់ចំណូលចិត្ត (30%)', color: 'from-rose-500 to-pink-600', textColor: 'text-rose-600', badgeBg: 'bg-rose-50 text-rose-700 border-rose-200' },
    { id: 6, name: 'ចំណាយផ្សេងៗ', icon: PieChartIcon, amount: '100', rec: 0.10, category: 'ចំណង់ចំណូលចិត្ត (30%)', color: 'from-slate-500 to-gray-600', textColor: 'text-slate-600', badgeBg: 'bg-slate-50 text-slate-700 border-slate-200' },
  ]);

  // គណនាទិន្នន័យសរុប
  const { totalIncome, totalSavings, totalNeeds, totalWants, totalExpenses, balance } = useMemo(() => {
    const parsedIncome = parseFloat(income) || 0;
    
    let savings = 0;
    let needs = 0;
    let wants = 0;
    let expTotal = 0;

    expenses.forEach(exp => {
      const amt = parseFloat(exp.amount) || 0;
      expTotal += amt;
      if (exp.id === 1) savings += amt;
      else if (exp.rec === 0.25 || exp.rec === 0.15 || exp.rec === 0.10) needs += amt;
      else wants += amt;
    });

    return {
      totalIncome: parsedIncome,
      totalSavings: savings,
      totalNeeds: needs,
      totalWants: wants,
      totalExpenses: expTotal,
      balance: parsedIncome - expTotal
    };
  }, [income, expenses]);

  // ផ្លាស់ប្តូរតម្លៃចំណាយ
  const handleExpenseChange = (id, value) => {
    setExpenses(expenses.map(exp => 
      exp.id === id ? { ...exp, amount: value } : exp
    ));
  };

  // បែងចែកប្រាក់ស្វ័យប្រវត្តិតាមច្បាប់ 50/30/20
  const autoAllocate = () => {
    const parsedIncome = parseFloat(income);
    if (!parsedIncome || parsedIncome <= 0) return;

    const newExpenses = expenses.map(exp => ({
      ...exp,
      amount: Math.round(parsedIncome * exp.rec).toString()
    }));
    setExpenses(newExpenses);
  };

  // គណនាភាគរយ
  const getPercentage = (amount) => {
    if (totalIncome === 0) return 0;
    const parsedAmount = parseFloat(amount) || 0;
    return ((parsedAmount / totalIncome) * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-12 font-['Kantumruy_Pro',sans-serif]">
      {/* នាំចូល Font ខ្មែរស្អាតៗពី Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&family=Battambang:wght@400;700&display=swap');
        .font-khmer-title {
          font-family: 'Kantumruy Pro', sans-serif;
        }
      `}</style>

      {/* Header Bar */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 backdrop-blur-md bg-white/90">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Compass size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">ហិរញ្ញវត្ថុខ្ញុំ</h1>
              <p className="text-xs text-slate-500">ប្រព័ន្ធវិភាគ និងបែងចែកប្រាក់ខែឆ្លាតវៃ</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/60">
            <button
              onClick={() => setActiveTab('plan')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'plan' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sliders size={16} />
              <span className="hidden sm:inline">រៀបចំផែនការ</span>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'analytics' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard size={16} />
              <span className="hidden sm:inline">វិភាគលម្អិត</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-6">

        {/* Dashboard Top Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Card 1: Income */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-sm transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-500">ប្រាក់ខែសរុប</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <DollarSign size={18} />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900">
              ${totalIncome.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">ប្រាក់ចំណូលចូល</p>
          </div>

          {/* Card 2: Savings */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-sm transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-500">ប្រាក់សន្សំ</span>
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                <PiggyBank size={18} />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-teal-600">
              ${totalSavings.toLocaleString()}
            </div>
            <p className="text-[11px] text-teal-600/80 font-medium mt-1">
              {getPercentage(totalSavings)}% នៃប្រាក់ខែ
            </p>
          </div>

          {/* Card 3: Expenses */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-sm transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-500">ចំណាយសរុប</span>
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <ArrowUpRight size={18} />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900">
              ${totalExpenses.toLocaleString()}
            </div>
            <p className="text-[11px] text-rose-500 font-medium mt-1">
              {getPercentage(totalExpenses)}% នៃប្រាក់ខែ
            </p>
          </div>

          {/* Card 4: Balance */}
          <div className={`p-4 rounded-2xl border transition-all ${
            balance >= 0 
              ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white border-slate-800' 
              : 'bg-rose-500 text-white border-rose-600'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-300">ប្រាក់នៅសល់</span>
              <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center backdrop-blur-xs">
                <ArrowDownRight size={18} />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold">
              ${balance.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-300 mt-1">
              {balance >= 0 ? 'ស្ថានភាពហិរញ្ញវត្ថុល្អ' : 'ចំណាយលើសប្រាក់ខែ!'}
            </p>
          </div>

        </div>

        {/* Tab Content 1: Planning View */}
        {activeTab === 'plan' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Inputs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Income Input & Auto Allocation Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    បញ្ចូលប្រាក់ខែសរុបរបស់អ្នក ($)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 font-semibold">
                      $
                    </div>
                    <input
                      type="number"
                      min="0"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-9 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>

                {/* Smart Allocation Banner */}
                <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border border-emerald-100/80 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-500 text-white rounded-xl shadow-xs mt-0.5 sm:mt-0">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">បែងចែកតាមច្បាប់ 50/30/20</h4>
                      <p className="text-xs text-slate-500">គណនាប្រាក់សន្សំ និងចំណាយស្វ័យប្រវត្តិ</p>
                    </div>
                  </div>
                  <button
                    onClick={autoAllocate}
                    disabled={!income || parseFloat(income) <= 0}
                    className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wide flex items-center justify-center gap-2 transition-all ${
                      income && parseFloat(income) > 0
                        ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-900/10 active:scale-95'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Sparkles size={14} />
                    បែងចែកស្វ័យប្រវត្តិ
                  </button>
                </div>
              </div>

              {/* Expense Allocation List */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">កំណត់ការចំណាយតាមផ្នែក</h3>
                    <p className="text-xs text-slate-400">អ្នកអាចផ្លាស់ប្តូរចំនួនទឹកប្រាក់តាមជាក់ស្តែង</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">
                    {expenses.length} ប្រភេទ
                  </span>
                </div>

                <div className="space-y-4">
                  {expenses.map((expense) => {
                    const Icon = expense.icon;
                    const recommendedAmount = Math.round(parseFloat(income || 0) * expense.rec);
                    const currentAmount = parseFloat(expense.amount) || 0;
                    const isAllocated = currentAmount > 0;

                    return (
                      <div 
                        key={expense.id} 
                        className={`p-4 rounded-2xl border transition-all ${
                          isAllocated ? 'bg-white border-slate-200/80 shadow-2xs' : 'bg-slate-50/50 border-slate-100'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          
                          {/* Left: Icon & Name */}
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${expense.color} text-white flex items-center justify-center shadow-xs shrink-0`}>
                              <Icon size={20} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-slate-800">{expense.name}</h4>
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${expense.badgeBg}`}>
                                  {expense.category}
                                </span>
                              </div>
                              {parseFloat(income) > 0 && (
                                <p className="text-xs text-slate-400 mt-0.5">
                                  ណែនាំ ({expense.rec * 100}%): <span className="font-semibold text-slate-600">${recommendedAmount}</span>
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Right: Input */}
                          <div className="relative w-full sm:w-36 shrink-0">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-sm font-semibold">
                              $
                            </div>
                            <input
                              type="number"
                              min="0"
                              value={expense.amount}
                              onChange={(e) => handleExpenseChange(expense.id, e.target.value)}
                              placeholder="0"
                              className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 text-right focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            />
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column: Visual Summary */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* 50/30/20 Rule Info Box */}
              <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold tracking-wider uppercase mb-3">
                  <Info size={16} />
                  <span>រូបមន្តគ្រប់គ្រងលុយ 50/30/20</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  បច្ចេកទេសគ្រប់គ្រងហិរញ្ញវត្ថុដែលជួយឱ្យអ្នកមានលុយសន្សំច្បាស់លាស់ ដោយមិនប៉ះពាល់ដល់ការរស់នៅប្រចាំថ្ងៃ៖
                </p>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                      តម្រូវការចាំបាច់
                    </span>
                    <span className="font-bold text-blue-300">50%</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                      ចំណង់ចំណូលចិត្ត
                    </span>
                    <span className="font-bold text-pink-300">30%</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      ប្រាក់សន្សំ & អនាគត
                    </span>
                    <span className="font-bold text-emerald-300">20%</span>
                  </div>
                </div>
              </div>

              {/* Progress Bars Break Down */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                <h3 className="text-base font-bold text-slate-800">ការបែងចែកភាគរយជាក់ស្តែង</h3>
                
                {totalIncome > 0 ? (
                  <div className="space-y-4">
                    {expenses.map((expense) => {
                      const percent = getPercentage(expense.amount);
                      return (
                        <div key={`summary-${expense.id}`} className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-medium text-slate-700">{expense.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900">${(parseFloat(expense.amount) || 0).toLocaleString()}</span>
                              <span className={`font-semibold px-1.5 py-0.5 rounded ${expense.badgeBg}`}>
                                {percent}%
                              </span>
                            </div>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${expense.color} transition-all duration-500 rounded-full`}
                              style={{ width: `${Math.min(percent, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}

                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="font-bold text-slate-800">ប្រាក់នៅសល់សេរី</span>
                        <span className={`font-bold ${balance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          ${balance.toLocaleString()} ({getPercentage(balance)}%)
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 rounded-full ${
                            balance >= 0 ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${Math.max(0, Math.min(getPercentage(balance), 100))}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-400">
                    <p className="text-xs">សូមបញ្ចូលប្រាក់ខែសរុបដើម្បីមើលការបែងចែកភាគរយ</p>
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* Tab Content 2: Analytics View */}
        {activeTab === 'analytics' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900">វិភាគរចនាសម្ព័ន្ធហិរញ្ញវត្ថុ</h3>
              <p className="text-xs text-slate-400 mt-1">ការប្រៀបធៀបរវាងការបែងចែកជាក់ស្តែង ធៀបនឹងគោលការណ៍ 50/30/20</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Category 1: Needs */}
              <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">តម្រូវការចាំបាច់ (Needs)</span>
                  <span className="text-xs font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">គោលដៅ 50%</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  ${totalNeeds.toLocaleString()}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-blue-100">
                  <span>ភាគរយបច្ចុប្បន្ន:</span>
                  <span className="font-bold text-blue-700">{getPercentage(totalNeeds)}%</span>
                </div>
              </div>

              {/* Category 2: Wants */}
              <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">ចំណង់ចំណូលចិត្ត (Wants)</span>
                  <span className="text-xs font-bold px-2 py-0.5 bg-rose-100 text-rose-800 rounded-full">គោលដៅ 30%</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  ${totalWants.toLocaleString()}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-rose-100">
                  <span>ភាគរយបច្ចុប្បន្ន:</span>
                  <span className="font-bold text-rose-700">{getPercentage(totalWants)}%</span>
                </div>
              </div>

              {/* Category 3: Savings */}
              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">ប្រាក់សន្សំ (Savings)</span>
                  <span className="text-xs font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">គោលដៅ 20%</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  ${totalSavings.toLocaleString()}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-emerald-100">
                  <span>ភាគរយបច្ចុប្បន្ន:</span>
                  <span className="font-bold text-emerald-700">{getPercentage(totalSavings)}%</span>
                </div>
              </div>

            </div>

            {/* Health Check Recommendation */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
              <div className="p-2.5 bg-emerald-500 text-white rounded-xl shadow-xs mt-0.5">
                <CheckCircle2 size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-800">ការវាយតម្លៃសុខភាពហិរញ្ញវត្ថុ</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {parseFloat(getPercentage(totalSavings)) >= 20 
                    ? "អបអរសាទរ! អ្នកបានសន្សំប្រាក់លើសពី ២០% នៃប្រាក់ខែសរុប។ នេះជាទម្លាប់ហិរញ្ញវត្ថុដ៏រឹងមាំបំផុតសម្រាប់អនាគត។"
                    : "ការសន្សំរបស់អ្នកនៅទាបជាង ២០% នៃប្រាក់ខែនៅឡើយ។ សាកល្បងកាត់បន្ថយការចំណាយលើចំណង់ចំណូលចិត្ត ដើម្បីបន្ថែមចូលក្នុងប្រាក់សន្សំ។"}
                </p>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}

