import React from 'react';
import { QrCode, Printer, X, ShieldCheck, Sparkles, Tag, CheckCircle2, Leaf, HeartHandshake } from 'lucide-react';

export default function ItemQrTagModal({ isOpen, onClose, item }) {
  if (!isOpen || !item) return null;

  const handlePrint = () => {
    window.print();
  };

  const itemId = item.id || `SL-${Math.floor(100000 + Math.random() * 900000)}`;
  const itemName = item.item_name || item.name || `${item.category || 'Item'}`;
  const category = item.category || 'Other';
  const condition = item.condition || 'Good';
  const action = item.primary_action || item.action || 'REUSE';
  const score = item.sustainability_score || item.score || 88;
  const imageUrl = item.image_url || item.preview_image || 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&q=80';
  const dateStr = item.created_at ? new Date(item.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  // Generate QR Code URL with item verification details
  const qrData = encodeURIComponent(`SecondLife AI Verified Tag | Item: ${itemName} | ID: ${itemId} | Category: ${category} | Condition: ${condition} | Action: ${action} | Score: ${score}/100`);
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${qrData}&size=200x200&color=059669&margin=10`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col my-6">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-emerald-400" />
            <h3 className="font-extrabold text-base">Printable Item QR Tag & Certificate</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
            >
              <Printer className="w-4 h-4" /> Print Item Tag
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Tag Container */}
        <div className="p-6 bg-slate-100 flex-1 flex flex-col items-center justify-center print:bg-white print:p-0">
          
          {/* Physical Tag Outer Border */}
          <div className="bg-white w-full rounded-2xl border-2 border-dashed border-emerald-600/80 p-6 shadow-xl relative space-y-4 print:shadow-none print:border-2 print:border-black print:rounded-none">
            
            {/* Top Cut/Punch Hole Indicator */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 text-emerald-700">
                <Leaf className="w-5 h-5 text-emerald-600" />
                <span className="font-black text-sm uppercase tracking-wider">SecondLife AI • Item Tag</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                <span>ID:</span>
                <span className="font-bold text-slate-900">{itemId}</span>
              </div>
            </div>

            {/* Main Item Content Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              
              {/* Item Thumbnail */}
              <div className="relative rounded-xl overflow-hidden aspect-square border border-slate-200 bg-slate-50 shadow-inner shrink-0">
                <img src={imageUrl} alt={itemName} className="w-full h-full object-cover" />
                <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-md bg-slate-900/80 text-white text-[10px] font-bold backdrop-blur-xs">
                  {score}/100
                </div>
              </div>

              {/* Item Info Summary */}
              <div className="sm:col-span-2 space-y-2 text-left">
                <h4 className="text-base font-extrabold text-slate-900 leading-snug">{itemName}</h4>
                
                <div className="flex flex-wrap gap-1.5 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-bold border border-emerald-300">
                    📂 {category}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-medium border border-slate-200">
                    ✨ Condition: {condition}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between gap-2">
                  <div className="text-xs">
                    <span className="text-slate-500 font-semibold block text-[10px] uppercase tracking-wider">Recommended Action</span>
                    <span className="font-black text-emerald-800 text-sm tracking-wide">{action}</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                </div>
              </div>

            </div>

            {/* QR Code & Scan Instructions Footer */}
            <div className="pt-3 border-t border-slate-200 grid grid-cols-3 gap-3 items-center bg-slate-50 p-3 rounded-xl print:bg-white">
              
              {/* Live Rendered QR Code */}
              <div className="flex flex-col items-center justify-center">
                <img
                  src={qrCodeUrl}
                  alt="Item Verification QR Code"
                  className="w-24 h-24 rounded-lg border border-slate-300 bg-white p-1 shadow-xs"
                />
              </div>

              {/* QR Scanner Text */}
              <div className="col-span-2 text-left space-y-1">
                <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-xs">
                  <QrCode className="w-4 h-4 text-emerald-600" />
                  <span>Scan Tag to Verify Provenance</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Attach this tag to your item box or donation bag. Anyone scanning this QR code can view its circularity evaluation, care tips, and origin.
                </p>
                <div className="text-[10px] text-slate-400 font-mono pt-1">
                  Verified: {dateStr} | SecondLife SDG 12
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
