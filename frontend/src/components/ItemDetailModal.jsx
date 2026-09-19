import React from 'react';
import { Sparkles, Calendar, Tag, ShieldCheck, CheckCircle2, ArrowRight, X } from 'lucide-react';
import ImpactBadge from './ImpactBadge';

export default function ItemDetailModal({ item, isOpen, onClose, onOpenQrTag }) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{item.item_name}</h3>
            <p className="text-xs text-slate-500 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              Analyzed on {new Date(item.created_at).toLocaleDateString()}
              {item.is_sample && <span className="ml-2 text-amber-600 font-semibold">(Sample Item)</span>}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          
          {/* Left: Thumbnail & Details */}
          <div>
            <div className="aspect-video w-full rounded-xl bg-slate-100 overflow-hidden mb-4 border border-slate-200">
              {item.image_url ? (
                <img src={item.image_url} alt={item.item_name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                  No Image Available
                </div>
              )}
            </div>

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Category:</span>
                <span className="font-semibold text-slate-800">{item.category}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Condition:</span>
                <span className="font-semibold text-slate-800">{item.condition}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">AI Confidence:</span>
                <span className="font-semibold text-emerald-700">{item.confidence_percentage || `${int(item.confidence * 100)}%`}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Sustainability Score:</span>
                <span className="font-extrabold text-emerald-600">{item.sustainability_score} / 100</span>
              </div>
            </div>
          </div>

          {/* Right: Recommendation & Ideas */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <div className="text-xs uppercase tracking-wider font-semibold text-emerald-700 mb-1">Recommended Action</div>
              <div className="text-2xl font-extrabold text-emerald-900 tracking-tight mb-1">{item.primary_action}</div>
              <div className="text-xs text-emerald-800">Alternative: {item.alternative_action}</div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Second-Life Ideas</h4>
              <ul className="space-y-2">
                {Array.isArray(item.second_life_ideas) ? (
                  item.second_life_ideas.map((idea, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{idea}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-slate-600">{item.second_life_ideas}</li>
                )}
              </ul>
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Estimated Impact</h4>
              <div className="space-y-1.5">
                <ImpactBadge label="Waste Avoided" level={item.waste_avoided || 'High'} />
                <ImpactBadge label="Resource Saving" level={item.resource_saving || 'High'} />
                <ImpactBadge label="Environmental Benefit" level={item.environmental_benefit || 'High'} />
              </div>
            </div>

          </div>

        </div>

        <div className="flex gap-3">
          {onOpenQrTag && (
            <button
              onClick={() => {
                onClose();
                onOpenQrTag(item);
              }}
              className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2"
            >
              <Tag className="w-4 h-4" />
              <span>Print Item QR Tag</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md"
          >
            Close Detail View
          </button>
        </div>

      </div>
    </div>
  );
}

function int(val) {
  return Math.round(val || 0);
}
