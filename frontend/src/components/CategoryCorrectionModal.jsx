import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { sendFeedbackCorrection } from '../services/api';

const CATEGORIES = [
  "Clothing", "Plastic", "Paper", "Glass", "Metal", "Furniture", "Electronics", "Other"
];

export default function CategoryCorrectionModal({ isOpen, onClose, originalCategory, confidence, onSelectCategory }) {
  const [selected, setSelected] = useState(originalCategory || 'Clothing');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (originalCategory) {
      setSelected(originalCategory);
    }
  }, [originalCategory, isOpen]);


  if (!isOpen) return null;

  const handleSubmit = async () => {
    onSelectCategory(selected);
    try {
      await sendFeedbackCorrection(originalCategory, selected, confidence);
    } catch (e) {
      console.warn('Feedback send error:', e);
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Correct Item Category</h3>
            <p className="text-xs text-slate-500">AI Confidence: {int(confidence * 100)}% ({originalCategory})</p>
          </div>
        </div>

        <p className="text-sm text-slate-600 mb-4">
          Please select the accurate item category to refine the recommendation and improve our model retraining telemetry:
        </p>

        {submitted ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center font-medium text-sm flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Category updated & telemetry logged!</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelected(cat)}
                  className={`px-3 py-2.5 rounded-xl border text-sm font-medium transition-all text-left flex items-center justify-between ${
                    selected === cat
                      ? 'border-emerald-500 bg-emerald-50/80 text-emerald-800 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <span>{cat}</span>
                  {selected === cat && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md"
              >
                Apply Category
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

function int(val) {
  return Math.round(val || 0);
}
