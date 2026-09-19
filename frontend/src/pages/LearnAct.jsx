import React from 'react';
import { BookOpen, RefreshCw, Wrench, Heart, Sparkles, Recycle, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LearnAct() {
  const fiveRs = [
    {
      title: '1. Reuse',
      icon: RefreshCw,
      color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      tag: 'Highest Energy Conservation',
      description: 'Use an item again for its original purpose or repurpose it directly instead of buying a new replacement.',
      examples: [
        'Use glass jars for pantry storage or food prep containers.',
        'Repurpose plastic containers for organizing screws or art supplies.',
        'Use tote bags repeatedly for groceries.'
      ]
    },
    {
      title: '2. Repair',
      icon: Wrench,
      color: 'bg-amber-100 text-amber-700 border-amber-200',
      tag: 'Restores Lifespan',
      description: 'Fix minor damages, wear, or technical glitches to keep products functional rather than throwing them away.',
      examples: [
        'Sand down and re-varnish scratched wooden furniture.',
        'Replace broken zippers or sew torn seams in clothing.',
        'Install lightweight software updates or replace phone batteries.'
      ]
    },
    {
      title: '3. Donate',
      icon: Heart,
      color: 'bg-rose-100 text-rose-700 border-rose-200',
      tag: 'Community Support',
      description: 'Pass along usable clothes, electronics, or household goods to people, shelters, or charities in need.',
      examples: [
        'Give gently worn apparel to local shelters or charity drives.',
        'Donate functional laptops or phones to educational initiatives.',
        'Pass furniture down to college students or housing charities.'
      ]
    },
    {
      title: '4. Upcycle',
      icon: Sparkles,
      color: 'bg-purple-100 text-purple-700 border-purple-200',
      tag: 'Creative Value Addition',
      description: 'Creatively transform old, worn, or unwanted materials into new items of higher utility or aesthetic value.',
      examples: [
        'Turn worn denim jeans into trendy fabric tote bags.',
        'Convert scrap wood panels into vertical garden planters.',
        'Craft mosaic glass art from broken colored bottle glass.'
      ]
    },
    {
      title: '5. Recycle',
      icon: Recycle,
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      tag: 'Material Recovery',
      description: 'Send suitable materials (metals, glass, clean plastics, paper) to appropriate industrial recycling channels.',
      examples: [
        'Recycle aluminum cans to save 95% energy vs raw ore production.',
        'Flatten cardboard shipping boxes for curbside recycling.',
        'Deposit disused electronic waste at certified e-waste drop-offs.'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          Sustainability Action Guide
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          The 5 Rs of Sustainable Circularity
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Learn how choosing the right action for unwanted items minimizes municipal waste, conserves raw natural resources, and protects global ecosystems.
        </p>
      </div>

      {/* 5 Rs Detailed Cards */}
      <div className="space-y-6">
        {fiveRs.map((r) => {
          const Icon = r.icon;
          return (
            <div key={r.title} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-6 items-start">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${r.color}`}>
                <Icon className="w-7 h-7 stroke-[2.2]" />
              </div>

              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-bold text-slate-900">{r.title}</h3>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    {r.tag}
                  </span>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">{r.description}</p>

                <div className="pt-2">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Practical Examples:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {r.examples.map((ex, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-50 text-xs text-slate-600 border border-slate-100 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{ex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Why SDG 12 Matters Section */}
      <div className="p-8 sm:p-10 rounded-3xl bg-emerald-900 text-white space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
            <Globe className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Why SDG 12 Matters</h2>
        </div>

        <p className="text-slate-200 text-sm leading-relaxed max-w-3xl">
          Global consumption and production drive the earth's economy, but rely on an unsustainable use of the natural environment and resources. Sustainable Development Goal 12 encourages transforming linear "take-make-dispose" economies into circular systems where materials are preserved at their highest utility value for as long as possible.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 space-y-1">
            <div className="text-emerald-300 font-bold text-sm">Resource Conservation</div>
            <p className="text-xs text-slate-300">Reusing items cuts demand for fresh mining, logging, and raw petroleum extraction.</p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 space-y-1">
            <div className="text-emerald-300 font-bold text-sm">Landfill Reduction</div>
            <p className="text-xs text-slate-300">Diverting textiles, electronics, and plastics prevents toxic leachates and land clutter.</p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 space-y-1">
            <div className="text-emerald-300 font-bold text-sm">Emissions Avoidance</div>
            <p className="text-xs text-slate-300">Recycling and repairing reduce energy-intensive industrial manufacturing emissions.</p>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <Link
            to="/analyze"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-extrabold text-sm shadow-md transition-all"
          >
            <span>Analyze an Item Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
