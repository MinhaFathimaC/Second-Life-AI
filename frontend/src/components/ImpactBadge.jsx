import React from 'react';

export default function ImpactBadge({ level, label }) {
  let colorStyle = 'bg-slate-100 text-slate-700 border-slate-200';
  
  if (level === 'High') {
    colorStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold';
  } else if (level === 'Medium') {
    colorStyle = 'bg-amber-50 text-amber-700 border-amber-200 font-semibold';
  } else if (level === 'Low') {
    colorStyle = 'bg-slate-50 text-slate-600 border-slate-200';
  }

  return (
    <div className="flex items-center justify-between p-3 rounded-xl border bg-white shadow-xs">
      <span className="text-xs font-medium text-slate-600">{label}</span>
      <span className={`px-2.5 py-1 rounded-full text-xs border ${colorStyle}`}>
        {level}
      </span>
    </div>
  );
}
