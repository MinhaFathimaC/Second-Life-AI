import React, { useRef } from 'react';
import { Award, ShieldCheck, Printer, X, Sparkles, CheckCircle2, Globe, Heart } from 'lucide-react';

export default function CertificateModal({ isOpen, onClose, userName = "Sustainable Citizen", metrics = {} }) {
  const certRef = useRef(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const totalAnalyzed = metrics.total_analyzed || 12;
  const divertCount = (metrics.items_reused || 4) + (metrics.items_donated || 3) + (metrics.items_upcycled || 1) + (metrics.items_repaired || 1) + (metrics.items_recycled || 3);
  const avgScore = metrics.average_sustainability_score || 85.4;
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col my-8">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-base">UN SDG 12 Circularity Achievement Certificate</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> Print Certificate
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Paper Body */}
        <div className="p-8 bg-gradient-to-b from-amber-50/40 via-white to-emerald-50/30 flex-1 relative print:p-12 print:bg-white" ref={certRef}>
          
          {/* Certificate Border */}
          <div className="border-4 border-double border-emerald-700/60 p-8 rounded-2xl relative space-y-6 text-center">
            
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-2 left-2 text-emerald-600 text-xs font-serif">✦</div>
            <div className="absolute top-2 right-2 text-emerald-600 text-xs font-serif">✦</div>
            <div className="absolute bottom-2 left-2 text-emerald-600 text-xs font-serif">✦</div>
            <div className="absolute bottom-2 right-2 text-emerald-600 text-xs font-serif">✦</div>

            {/* SDG Seal Badge Header */}
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-extrabold uppercase tracking-wider mx-auto">
              <Globe className="w-4 h-4 text-emerald-700" /> UN SDG 12 Circularity Champion
            </div>

            {/* Title */}
            <div className="space-y-1">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight font-serif">
                Certificate of Sustainable Consumption
              </h1>
              <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
                Presented for Outstanding Environmental Leadership
              </p>
            </div>

            {/* Recipient Name */}
            <div className="py-2 border-b border-emerald-200/80 max-w-md mx-auto">
              <span className="text-2xl font-black text-emerald-900 italic font-serif">
                {userName}
              </span>
            </div>

            {/* Body Description */}
            <p className="text-xs text-slate-600 leading-relaxed max-w-lg mx-auto">
              This certificate verifies active participation in circular resource stewardship, applying AI recommendation models to divert usable products from solid waste landfill streams.
            </p>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-3 gap-4 bg-white/80 p-4 rounded-xl border border-emerald-200 shadow-xs max-w-md mx-auto">
              <div>
                <div className="text-xl font-black text-emerald-800">{totalAnalyzed}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Items Scanned</div>
              </div>
              <div className="border-x border-emerald-200">
                <div className="text-xl font-black text-emerald-800">{divertCount}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Items Diverted</div>
              </div>
              <div>
                <div className="text-xl font-black text-emerald-800">{avgScore}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Avg Rating</div>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="pt-6 flex items-end justify-between text-left border-t border-slate-200/80">
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-900">SecondLife AI Verification</div>
                <div className="text-[10px] text-slate-500">Date Issued: {currentDate}</div>
                <div className="text-[10px] font-mono text-slate-400">ID: SL-{Math.floor(100000 + Math.random() * 900000)}</div>
              </div>

              {/* Gold Ribbon Graphic */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 border-2 border-white shrink-0">
                <ShieldCheck className="w-9 h-9 text-slate-900" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
