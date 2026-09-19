import React, { useState, useEffect } from 'react';
import { History as HistoryIcon, Search, Filter, Calendar, Sparkles, ArrowRight, Eye, RefreshCw, Share2, Tag } from 'lucide-react';
import ItemDetailModal from '../components/ItemDetailModal';
import PublishCommunityModal from '../components/PublishCommunityModal';
import ItemQrTagModal from '../components/ItemQrTagModal';
import { fetchHistory } from '../services/api';

const CATEGORIES = ["All", "Clothing", "Plastic", "Paper", "Glass", "Metal", "Furniture", "Electronics", "Other"];
const ACTIONS = ["All", "DONATE", "REUSE", "REPAIR", "UPCYCLE", "RECYCLE"];

export default function History() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAction, setSelectedAction] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected item modal
  const [selectedItem, setSelectedItem] = useState(null);
  const [publishItem, setPublishItem] = useState(null);
  const [qrItem, setQrItem] = useState(null);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const res = await fetchHistory(selectedCategory, selectedAction, searchQuery);
      setItems(res.items || []);
    } catch (err) {
      console.error('Failed to load history:', err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, [selectedCategory, selectedAction]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadHistory();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <HistoryIcon className="w-3.5 h-3.5 text-emerald-600" />
            Saved Analysis Log
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My History</h1>
          <p className="text-slate-600 text-sm mt-1">
            Browse and review your past AI second-life item recommendations.
          </p>
        </div>

        <button
          onClick={loadHistory}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-xs self-start"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          Refresh History
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="w-full md:w-80 relative">
          <input
            type="text"
            placeholder="Search items or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </form>

        {/* Filter dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-semibold text-slate-600">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-700 bg-white outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Action:</span>
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-700 bg-white outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {ACTIONS.map((act) => (
                <option key={act} value={act}>{act}</option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {/* Items Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-500 text-sm flex items-center justify-center gap-2">
          <RefreshCw className="w-5 h-5 animate-spin text-emerald-600" />
          <span>Loading historical records...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <HistoryIcon className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No Historical Records Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting your category or action filters, or analyze a new item to populate your history log.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group"
            >
              {/* Thumbnail */}
              <div className="aspect-video w-full bg-slate-100 relative overflow-hidden">
                <img 
                  src={item.image_url || 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&q=80'} 
                  alt={item.item_name} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 text-white text-[11px] font-bold backdrop-blur-xs">
                  {item.category}
                </div>
                {item.is_sample && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-amber-500/90 text-white text-[10px] font-semibold backdrop-blur-xs">
                    Sample Data
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-slate-900 text-base line-clamp-1">{item.item_name}</h3>
                    <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md shrink-0">
                      {item.sustainability_score} pts
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(item.created_at).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>Condition: {item.condition}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="text-[10px] uppercase font-semibold text-slate-400">Action</div>
                    <div className="text-sm font-extrabold text-emerald-800">{item.primary_action}</div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setQrItem(item)}
                      title="Print Item QR Tag"
                      className="p-1.5 rounded-xl bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-600 text-xs transition-colors"
                    >
                      <Tag className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPublishItem(item)}
                      title="Share to Community Swap Board"
                      className="p-1.5 rounded-xl bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-600 text-xs transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-semibold text-xs transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Result</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Item Detail Modal */}
      <ItemDetailModal
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
        onOpenQrTag={(item) => setQrItem(item)}
      />

      <PublishCommunityModal
        isOpen={Boolean(publishItem)}
        onClose={() => setPublishItem(null)}
        item={publishItem}
      />

      <ItemQrTagModal
        isOpen={Boolean(qrItem)}
        onClose={() => setQrItem(null)}
        item={qrItem}
      />

    </div>
  );
}
