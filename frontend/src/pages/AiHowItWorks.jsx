import React from 'react';
import { Sparkles, Cpu, Layers, ShieldCheck, CheckCircle2, ArrowRight, ArrowDown, Info, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AiHowItWorks() {
  const stages = [
    {
      num: 'Stage 1',
      title: 'Computer Vision Item Identification',
      icon: Cpu,
      color: 'bg-emerald-100 text-emerald-700',
      description: 'The uploaded image is resized to a 224x224 RGB tensor. MobileNetV2 transfer learning model extracts deep feature vectors and matches synset activations against 8 core waste categories.'
    },
    {
      num: 'Stage 2',
      title: 'Material & Synset Extraction',
      icon: Layers,
      color: 'bg-teal-100 text-teal-700',
      description: 'Identifies the underlying material composition (e.g., Cotton Textiles, Polypropylene Plastic, Silica Glass, Aluminum Alloy, Solid Wood) to determine physical recycling & upcycling properties.'
    },
    {
      num: 'Stage 3',
      title: 'Condition Assessment & Goal Weighting',
      icon: SlidersHorizontal,
      color: 'bg-amber-100 text-amber-700',
      description: 'Combines user-confirmed item condition (Excellent, Good, Fair, Damaged, Not usable) with personal sustainability goals (Help someone, Save money, Get creative, Reduce waste).'
    },
    {
      num: 'Stage 4',
      title: 'Multi-Option Circularity Engine',
      icon: Sparkles,
      color: 'bg-purple-100 text-purple-700',
      description: 'Evaluates suitabilities for ALL 5 circular pathways (DONATE, REUSE, REPAIR, UPCYCLE, RECYCLE) and generates a transparent score out of 100 based on circularity factor rules.'
    },
    {
      num: 'Stage 5',
      title: 'Action Plan & Impact Generation',
      icon: CheckCircle2,
      color: 'bg-blue-100 text-blue-700',
      description: 'Produces tailored second-life ideas, step-by-step next steps action plan, disposal warnings, and optional verified NGO charity matches.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <Cpu className="w-4 h-4 text-emerald-600" />
          AI Transparency & System Architecture
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How Our AI Engine Works
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Detailed 5-stage architecture pipeline explaining how SecondLife AI connects computer vision with circular economy recommendation logic.
        </p>
      </div>

      {/* Architecture Visual Diagram */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs uppercase font-extrabold text-emerald-400 tracking-widest">End-to-End Intelligence Pipeline</span>
          <h2 className="text-2xl font-bold tracking-tight">System Architecture Diagram</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-4 text-center">
          <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-xs font-bold">1</div>
            <div className="font-bold text-sm text-white">Image Upload</div>
            <p className="text-[11px] text-slate-400">User photo or sample preset</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center mx-auto text-xs font-bold">2</div>
            <div className="font-bold text-sm text-white">AI Vision Model</div>
            <p className="text-[11px] text-slate-400">MobileNetV2 feature extractor</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto text-xs font-bold">3</div>
            <div className="font-bold text-sm text-white">Item Info & Material</div>
            <p className="text-[11px] text-slate-400">Category & material type</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto text-xs font-bold">4</div>
            <div className="font-bold text-sm text-white">Recommendation Engine</div>
            <p className="text-[11px] text-slate-400">Multi-action suitability rules</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-600 text-white space-y-2 shadow-md">
            <div className="w-8 h-8 rounded-lg bg-white/20 text-white flex items-center justify-center mx-auto text-xs font-bold">5</div>
            <div className="font-bold text-sm">Sustainability Action</div>
            <p className="text-[11px] text-emerald-100">Donate, Reuse, Upcycle, Recycle</p>
          </div>
        </div>
      </div>

      {/* 5 Detailed Stage Cards */}
      <div className="space-y-6">
        {stages.map((stage) => {
          const Icon = stage.icon;
          return (
            <div key={stage.num} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-6 items-start">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${stage.color}`}>
                <Icon className="w-7 h-7 stroke-[2.2]" />
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                    {stage.num}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">{stage.title}</h3>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed pt-1">{stage.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Ethics & Transparency Statement */}
      <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 text-xs leading-relaxed">
        <div className="font-bold text-emerald-950 flex items-center gap-2 text-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Academic AI Transparency Policy
        </div>
        <p>
          SecondLife AI operates in full compliance with academic transparency. Confidence values and classification outputs reflect actual tensor inference from our MobileNetV2 architecture. If initialized in offline/fallback mode, the system clearly displays active model status rather than presenting simulated predictions as real.
        </p>
      </div>

    </div>
  );
}
