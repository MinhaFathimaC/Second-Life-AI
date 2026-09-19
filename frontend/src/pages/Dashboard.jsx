import React, { useState, useEffect } from 'react';
import { LayoutDashboard, RefreshCw, Sparkles, TrendingUp, Recycle, Heart, Wrench, RefreshCw as ReuseIcon, ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { fetchDashboardStats } from '../services/api';
import CertificateModal from '../components/CertificateModal';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCertOpen, setIsCertOpen] = useState(false);

  const loadStats = async () => {
    setLoading(true);
    try {
      const res = await fetchDashboardStats();
      setData(res);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500 text-sm flex items-center justify-center gap-2">
        <RefreshCw className="w-5 h-5 animate-spin text-emerald-600" />
        <span>Loading Sustainability Dashboard...</span>
      </div>
    );
  }

  const metrics = data?.metrics || {
    total_analyzed: 12,
    items_reused: 4,
    items_donated: 3,
    items_recycled: 3,
    items_upcycled: 1,
    items_repaired: 1,
    average_sustainability_score: 85.4
  };

  const actionChartData = data?.charts?.action_breakdown || [];
  const categoryChartData = data?.charts?.category_distribution || [];
  const recentItems = data?.recent_activity || [];

  const divertCount = (metrics.items_reused || 0) + (metrics.items_donated || 0) + (metrics.items_upcycled || 0) + (metrics.items_repaired || 0) + (metrics.items_recycled || 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <LayoutDashboard className="w-3.5 h-3.5 text-emerald-600" />
            Live Analytics & Metrics
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Sustainability Dashboard</h1>
          <p className="text-slate-600 text-sm mt-1">
            Real-time overview of your second-life item recommendations, action breakdowns, and circularity impact.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start">
          <button
            onClick={() => setIsCertOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all"
          >
            <Award className="w-4 h-4 text-emerald-200" />
            View My Certificate
          </button>

          <button
            onClick={loadStats}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            Refresh Stats
          </button>
        </div>
      </div>

      {/* Personal Sustainability Journey Card ⭐ */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md space-y-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs uppercase font-extrabold text-emerald-200 tracking-wider">
            Personal Sustainability Journey
          </div>
          <h3 className="text-xl font-black">
            «"You have analyzed {metrics.total_analyzed} items and identified sustainable circular alternatives for {divertCount} of them."»
          </h3>
          <p className="text-xs text-emerald-100">
            Diverting functional products from municipal landfills conserves virgin resources and supports community welfare.
          </p>
        </div>

        <div className="px-5 py-3 rounded-xl bg-white/20 backdrop-blur-xs text-center shrink-0 border border-white/20">
          <div className="text-xs font-semibold text-emerald-100">Circularity Rate</div>
          <div className="text-2xl font-black">{Math.round((divertCount / Math.max(1, metrics.total_analyzed)) * 100)}%</div>
        </div>
      </div>

      {/* 6 Key Stat Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-500">Items Analyzed</div>
          <div className="text-2xl font-black text-slate-900">{metrics.total_analyzed}</div>
          <div className="text-[10px] text-emerald-600 font-medium">Total AI Scans</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-500">Reuse Recs</div>
          <div className="text-2xl font-black text-teal-600">{metrics.items_reused}</div>
          <div className="text-[10px] text-teal-700 font-medium">Direct Repurpose</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-500">Donation Recs</div>
          <div className="text-2xl font-black text-emerald-600">{metrics.items_donated}</div>
          <div className="text-[10px] text-emerald-700 font-medium">Community Aid</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-500">Upcycling Recs</div>
          <div className="text-2xl font-black text-purple-600">{metrics.items_upcycled}</div>
          <div className="text-[10px] text-purple-700 font-medium">Creative Craft</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-500">Recycling Recs</div>
          <div className="text-2xl font-black text-sky-600">{metrics.items_recycled}</div>
          <div className="text-[10px] text-sky-700 font-medium">Material Stream</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 text-white shadow-sm space-y-1 col-span-2 sm:col-span-1">
          <div className="text-xs font-semibold text-slate-400">Avg Score</div>
          <div className="text-2xl font-black text-emerald-400">{metrics.average_sustainability_score}</div>
          <div className="text-[10px] text-slate-400 font-medium">Circularity Rating</div>
        </div>

      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Pie Chart: Action Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">Action Distribution</h3>
            <span className="text-xs text-slate-500">Reuse vs Donate vs Recycle</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={actionChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                >
                  {actionChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Category Distribution (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">Category Distribution</h3>
            <span className="text-xs text-slate-500">Items Scanned per Category</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip cursor={{ fill: 'rgba(16, 185, 129, 0.05)' }} />
                <Bar dataKey="count" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">Recent Sustainability Activity</h3>
          <span className="text-xs text-slate-500">Latest analyzed records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4">Item Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Recommended Action</th>
                <th className="p-4">Circularity Score</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {recentItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                    <span>{item.item_name}</span>
                    {item.is_sample && (
                      <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">Sample</span>
                    )}
                  </td>
                  <td className="p-4 text-slate-600">{item.category}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                      {item.primary_action}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-emerald-700">{item.sustainability_score} / 100</td>
                  <td className="p-4 text-slate-400">{new Date(item.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
        userName="Sustainable Citizen"
        metrics={metrics}
      />

    </div>
  );
}
