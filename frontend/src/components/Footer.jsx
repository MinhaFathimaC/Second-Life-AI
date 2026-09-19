import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Heart, Globe, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1 */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                <Leaf className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                SecondLife <span className="text-emerald-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              An academic AI initiative for Sustainable Consumption & Production (SDG 12), empowering communities to reuse, repair, donate, upcycle, and recycle everyday items.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link to="/analyze" className="hover:text-emerald-400 transition-colors">Analyze an Item</Link></li>
              <li><Link to="/history" className="hover:text-emerald-400 transition-colors">My History</Link></li>
              <li><Link to="/dashboard" className="hover:text-emerald-400 transition-colors">Sustainability Dashboard</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Learn & Impact</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/learn" className="hover:text-emerald-400 transition-colors">5 Rs of Circularity</Link></li>
              <li><Link to="/sdg" className="hover:text-emerald-400 transition-colors">SDG 12 Mapping</Link></li>
              <li><Link to="/sdg" className="hover:text-emerald-400 transition-colors">SDG 11 & SDG 13 Links</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">UN SDG Goals</h4>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-medium">
                🎯 SDG 12: Responsible Consumption
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-300 border border-orange-500/20 text-xs font-medium">
                🏙️ SDG 11: Sustainable Cities
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-medium">
                🌍 SDG 13: Climate Action
              </span>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} SecondLife AI – Academic AI for Sustainability Initiative.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for AI & Circular Economy Research.
          </p>
        </div>
      </div>
    </footer>
  );
}
