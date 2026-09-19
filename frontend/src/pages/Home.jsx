import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Leaf, Recycle, Heart, Wrench, RefreshCw, ArrowRight, ShieldCheck, Globe, CheckCircle2, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-slate-50 to-slate-50 pt-12 pb-20 border-b border-slate-200/60">
        
        {/* Background glow graphics */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-emerald-400/10 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* SDG Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 border border-emerald-200 text-xs font-semibold shadow-xs animate-float">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              AI for Sustainability Initiative • UN SDG 12
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Give Your Old Items a <span className="gradient-text">Second Life</span>.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
              Use AI to discover smarter, more sustainable ways to reuse, repair, donate, upcycle, and recycle everyday items.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/analyze"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all hover:-translate-y-0.5"
              >
                <Sparkles className="w-5 h-5 text-emerald-200" />
                <span>Analyze an Item</span>
              </Link>
              <Link
                to="/learn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-base border border-slate-300 shadow-xs transition-all"
              >
                <span>How It Works</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Quick Metrics highlight */}
            <div className="pt-10 grid grid-cols-3 gap-4 max-w-xl mx-auto text-left border-t border-slate-200/80">
              <div className="p-3">
                <div className="text-2xl font-extrabold text-emerald-700">8</div>
                <div className="text-xs text-slate-500 font-medium">Core Categories</div>
              </div>
              <div className="p-3 border-x border-slate-200">
                <div className="text-2xl font-extrabold text-emerald-700">5 Rs</div>
                <div className="text-xs text-slate-500 font-medium">Circularity Actions</div>
              </div>
              <div className="p-3">
                <div className="text-2xl font-extrabold text-emerald-700">SDG 12</div>
                <div className="text-xs text-slate-500 font-medium">Primary Focus</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Smart AI Sustainable Circularity</h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            From image upload to targeted action, SecondLife AI simplifies sustainable decision-making.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">🤖 AI Identification</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Identify everyday items automatically using computer vision transfer learning (MobileNetV2 architecture).
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-6">
              <Recycle className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">♻️ Smart Recommendations</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Get customized, practical recommendations to Reuse, Repair, Donate, Upcycle, or Recycle based on category and condition.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-6">
              <Leaf className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">🌱 Sustainability Impact</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Understand how your decisions avoid landfill waste, save raw resources, and boost your app-generated circularity score.
            </p>
          </div>

        </div>
      </section>

      {/* 5 Circular Actions Preview */}
      <section className="bg-slate-100/70 py-12 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-700">The 5 Rs Framework</span>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">Five Sustainable Pathways for Every Item</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 text-center space-y-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <RefreshCw className="w-4 h-4" />
              </div>
              <div className="font-bold text-slate-900 text-sm">Reuse</div>
              <div className="text-xs text-slate-500">Use again without replacement</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 text-center space-y-2">
              <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 mx-auto flex items-center justify-center">
                <Wrench className="w-4 h-4" />
              </div>
              <div className="font-bold text-slate-900 text-sm">Repair</div>
              <div className="text-xs text-slate-500">Fix usable products easily</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 text-center space-y-2">
              <div className="w-9 h-9 rounded-lg bg-rose-100 text-rose-700 mx-auto flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </div>
              <div className="font-bold text-slate-900 text-sm">Donate</div>
              <div className="text-xs text-slate-500">Give to people in need</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 text-center space-y-2">
              <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 mx-auto flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="font-bold text-slate-900 text-sm">Upcycle</div>
              <div className="text-xs text-slate-500">Transform into craft items</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 text-center space-y-2 col-span-2 sm:col-span-1">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 mx-auto flex items-center justify-center">
                <Recycle className="w-4 h-4" />
              </div>
              <div className="font-bold text-slate-900 text-sm">Recycle</div>
              <div className="text-xs text-slate-500">Channel to proper processing</div>
            </div>
          </div>
        </div>
      </section>

      {/* SDG Impact Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white shadow-xl relative overflow-hidden">
          
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              UN Global Goals Alignment
            </span>

            <h3 className="text-3xl font-extrabold tracking-tight">
              Supporting Sustainable Development Goal 12
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed">
              SDG 12 aims to ensure responsible consumption and production patterns by halving global food waste, substantially reducing waste generation through prevention, reduction, recycling, and reuse.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-emerald-300">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Target 12.5: Substantially reduce waste generation</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> SDG 11: Sustainable Communities</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> SDG 13: Climate Action</span>
            </div>

            <div className="pt-4">
              <Link
                to="/sdg"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all"
              >
                <span>Explore Full SDG Mapping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
