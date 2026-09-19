import React, { useState, useEffect } from 'react';
import { Building2, Heart, RefreshCw, Sparkles, Recycle, ShieldCheck, ArrowRight, CheckCircle2, Info, Users, Share2, MapPin, Mail, Tag, Search, Filter, AlertCircle } from 'lucide-react';
import { fetchCommunityImpact, fetchCommunityListings, claimCommunityItem } from '../services/api';

export default function CommunityImpact() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Community Swap Board State
  const [listings, setListings] = useState([]);
  const [boardLoading, setBoardLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState('All');
  const [boardSearch, setBoardSearch] = useState('');
  const [claimMessage, setClaimMessage] = useState('');

  const CATEGORIES = ["All", "Clothing", "Plastic", "Paper", "Glass", "Metal", "Furniture", "Electronics", "Other"];

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchCommunityImpact();
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadBoardListings = async (cat = selectedCat, search = boardSearch) => {
    setBoardLoading(true);
    try {
      const res = await fetchCommunityListings(cat, 'available', search);
      setListings(res.listings || []);
    } catch (err) {
      console.error('Failed to load board listings:', err);
    } finally {
      setBoardLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    loadBoardListings(selectedCat, boardSearch);
  }, []);

  const handleClaimItem = async (item) => {
    try {
      const res = await claimCommunityItem(item.id);
      setClaimMessage(`Success! Contact request sent to ${item.contact_info} for '${item.item_name}'.`);
      loadBoardListings(selectedCat, boardSearch);
      setTimeout(() => setClaimMessage(''), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCategoryChange = (cat) => {
    setSelectedCat(cat);
    loadBoardListings(cat, boardSearch);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadBoardListings(selectedCat, boardSearch);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500 text-sm flex items-center justify-center gap-2">
        <RefreshCw className="w-5 h-5 animate-spin text-emerald-600" />
        <span>Loading Community Resource Intelligence...</span>
      </div>
    );
  }

  const metrics = data?.community_metrics || {
    total_items_analyzed: 14,
    potentially_reusable: 8,
    potentially_donatable: 5,
    potentially_recyclable: 4,
    potentially_upcyclable: 3
  };

  const catPercentages = data?.community_insights?.category_percentages || [
    { category: 'Clothing', percentage: 42.0 },
    { category: 'Plastic', percentage: 21.0 },
    { category: 'Paper', percentage: 15.0 },
    { category: 'Electronics', percentage: 10.0 },
    { category: 'Glass', percentage: 7.0 },
    { category: 'Furniture', percentage: 5.0 }
  ];

  const actionPercentages = data?.community_insights?.action_percentages || [
    { action: 'Reuse', percentage: 38.0 },
    { action: 'Donate', percentage: 25.0 },
    { action: 'Recycle', percentage: 21.0 },
    { action: 'Upcycle', percentage: 11.0 },
    { action: 'Repair', percentage: 5.0 }
  ];

  const ngoMatches = data?.ngo_matches || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <Users className="w-4 h-4 text-emerald-600" />
          Foundation & NGO Community Hub
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Community Freecycle & Item Swap Board
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Connecting neighborhood item donors, community organizations, and makers to keep functional items in active circular use.
        </p>
      </div>

      {/* Claim Toast Notification */}
      {claimMessage && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-between shadow-lg animate-bounce">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-200" />
            {claimMessage}
          </span>
          <button onClick={() => setClaimMessage('')} className="text-emerald-200 hover:text-white">✕</button>
        </div>
      )}

      {/* Live Item Swap Marketplace Board ⭐⭐⭐ */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Share2 className="w-5 h-5 text-emerald-600" />
              Live Available Community Listings
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Free items posted by community members for donation or pickup</p>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search board items..."
                value={boardSearch}
                onChange={(e) => setBoardSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none w-48 sm:w-56"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>

            <select
              value={selectedCat}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </form>
        </div>

        {/* Listings Grid */}
        {boardLoading ? (
          <div className="py-12 text-center text-slate-500 text-xs">Loading live community swap board...</div>
        ) : listings.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
            <Tag className="w-8 h-8 text-slate-400 mx-auto" />
            <div className="text-sm font-bold text-slate-800">No Listings Found for Filter</div>
            <p className="text-xs text-slate-500">Analyze an item on the Analyze page and click 'Publish to Community Board' to post the first listing!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((item) => (
              <div key={item.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition-all shadow-xs flex flex-col justify-between space-y-3">
                
                <div className="space-y-2">
                  <div className="aspect-video w-full rounded-xl bg-slate-100 overflow-hidden border border-slate-200 relative">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.item_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-bold">
                        {item.category}
                      </div>
                    )}
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] font-bold backdrop-blur-xs">
                      {item.category}
                    </span>
                    <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-emerald-600/90 text-white text-[10px] font-bold backdrop-blur-xs">
                      {item.condition}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base line-clamp-1">{item.item_name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      {item.location}
                    </span>
                    <span className="font-semibold text-slate-700">Action: {item.primary_action}</span>
                  </div>

                  <button
                    onClick={() => handleClaimItem(item)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Heart className="w-3.5 h-3.5 text-emerald-200" />
                    Request / Claim Free Item
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5 Community Resource Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-500">Items Analyzed</div>
          <div className="text-2xl font-black text-slate-900">{metrics.total_items_analyzed}</div>
          <div className="text-[10px] text-emerald-600 font-medium">Community Scans</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-500">Potentially Reusable</div>
          <div className="text-2xl font-black text-teal-600">{metrics.potentially_reusable}</div>
          <div className="text-[10px] text-teal-700 font-medium">Direct Home Reuse</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-500">Potentially Donatable</div>
          <div className="text-2xl font-black text-emerald-600">{metrics.potentially_donatable}</div>
          <div className="text-[10px] text-emerald-700 font-medium">Charity Resource</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-500">Potentially Recyclable</div>
          <div className="text-2xl font-black text-sky-600">{metrics.potentially_recyclable}</div>
          <div className="text-[10px] text-sky-700 font-medium">Material Stream</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1 col-span-2 sm:col-span-1">
          <div className="text-xs font-semibold text-slate-500">Potentially Upcyclable</div>
          <div className="text-2xl font-black text-purple-600">{metrics.potentially_upcyclable}</div>
          <div className="text-[10px] text-purple-700 font-medium">Maker Crafts</div>
        </div>
      </div>

      {/* How Foundations Can Use This Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-950 text-white shadow-xl relative overflow-hidden space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight">How Foundations & NGOs Can Use This</h3>
            <span className="text-xs text-emerald-300 font-medium">Resource Forecasting for Community Organizations</span>
          </div>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
          «"{data?.foundation_guidance || 'Organizations can use aggregated item insights to understand what types of reusable resources are available in their community.'}"»
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 space-y-1">
            <div className="text-emerald-300 font-bold text-sm">Apparel Drive Forecast</div>
            <p className="text-xs text-slate-300">Predict incoming clothing donations for local shelters and job interview programs.</p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 space-y-1">
            <div className="text-emerald-300 font-bold text-sm">E-Waste Hardware Collection</div>
            <p className="text-xs text-slate-300">Identify computers and phones available for digital inclusion refurbishing initiatives.</p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 space-y-1">
            <div className="text-emerald-300 font-bold text-sm">Bulky Furniture Reuse</div>
            <p className="text-xs text-slate-300">Coordinate local pickups for sturdy chairs and tables needed by housing programs.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
