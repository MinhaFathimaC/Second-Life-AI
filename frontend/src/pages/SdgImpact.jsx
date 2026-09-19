import React from 'react';
import { Globe, Target, CheckCircle2, ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SdgImpact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <Globe className="w-4 h-4 text-emerald-600" />
          UN Sustainable Development Goals Framework
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          SDG Alignment & Environmental Impact
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Detailed mapping of how SecondLife AI connects artificial intelligence with United Nations Sustainable Development Goal 12, SDG 11, and SDG 13.
        </p>
      </div>

      {/* Primary Goal: SDG 12 Hero Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-xl space-y-6 relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-white font-extrabold text-xs tracking-wider uppercase backdrop-blur-xs">
            Primary Focus • Goal 12
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            SDG 12: Responsible Consumption and Production
          </h2>
          <p className="text-amber-50 text-sm leading-relaxed">
            SecondLife AI directly addresses UN SDG Target 12.5 by giving users immediate, actionable guidance on what to do with unwanted items instead of throwing them into landfills.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-black/15 backdrop-blur-xs border border-white/20 text-center">
            <div className="text-xs text-amber-200">Waste Reduction</div>
            <div className="text-lg font-bold">Prevented at Source</div>
          </div>
          <div className="p-3 rounded-xl bg-black/15 backdrop-blur-xs border border-white/20 text-center">
            <div className="text-xs text-amber-200">Product Lifetime</div>
            <div className="text-lg font-bold">Extended via Repair</div>
          </div>
          <div className="p-3 rounded-xl bg-black/15 backdrop-blur-xs border border-white/20 text-center">
            <div className="text-xs text-amber-200">Charity Donation</div>
            <div className="text-lg font-bold">Community Sharing</div>
          </div>
          <div className="p-3 rounded-xl bg-black/15 backdrop-blur-xs border border-white/20 text-center">
            <div className="text-xs text-amber-200">Material Loop</div>
            <div className="text-lg font-bold">Closed via Recycling</div>
          </div>
        </div>
      </div>

      {/* Supporting Goals Grid (SDG 11 & SDG 13) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Supporting SDG 11 */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center">
            <Globe className="w-6 h-6 stroke-[2.2]" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-extrabold text-orange-700 uppercase tracking-wider">Supporting Goal 11</span>
            <h3 className="text-2xl font-bold text-slate-900">SDG 11: Sustainable Cities & Communities</h3>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Responsible household waste segregation and item reuse contribute directly to cleaner municipal environments, reduced municipal solid waste management burdens, and healthier urban spaces.
          </p>

          <ul className="space-y-2 pt-2 border-t border-slate-100">
            <li className="flex items-center gap-2 text-xs text-slate-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Reduces municipal waste collection burdens</span>
            </li>
            <li className="flex items-center gap-2 text-xs text-slate-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Promotes community donation & local circular hubs</span>
            </li>
          </ul>
        </div>

        {/* Supporting SDG 13 */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Sparkles className="w-6 h-6 stroke-[2.2]" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">Supporting Goal 13</span>
            <h3 className="text-2xl font-bold text-slate-900">SDG 13: Climate Action</h3>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Manufacturing new goods consumes significant fossil fuel energy. Extending the life of existing items and recycling scrap materials mitigates upstream industrial carbon emissions.
          </p>

          <ul className="space-y-2 pt-2 border-t border-slate-100">
            <li className="flex items-center gap-2 text-xs text-slate-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Recycling aluminum saves 95% energy vs virgin mining</span>
            </li>
            <li className="flex items-center gap-2 text-xs text-slate-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Diverting organic paper prevents methane generation</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Balanced Impact Measurement Statement */}
      <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 space-y-2 text-xs leading-relaxed">
        <div className="font-bold text-slate-900 flex items-center gap-2 text-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Academic Integrity & Impact Metric Guidance
        </div>
        <p>
          SecondLife AI uses qualitative impact scoring levels (Low, Medium, High) and an app-generated sustainability circularity score (0–100) derived from material circularity heuristics. We do not claim exact real-world carbon tonnage savings without empirical LCA laboratory sensors, ensuring transparent academic reporting.
        </p>
      </div>

    </div>
  );
}
