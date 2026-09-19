import React, { useState } from 'react';
import { Share2, X, CheckCircle2, Sparkles } from 'lucide-react';
import { publishCommunityListing } from '../services/api';

export default function PublishCommunityModal({ isOpen, onClose, item, onPublished }) {
  const [description, setDescription] = useState(
    item ? `Available for free community donation or reuse pickup! Recommended action: ${item.primary_action}.` : ''
  );
  const [location, setLocation] = useState('Metro Community Hub');
  const [contactInfo, setContactInfo] = useState('community.member@secondlife.org');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !item) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const payload = {
        item_name: item.item_name || item.name || 'Reusable Household Item',
        category: item.category || 'Other',
        condition: item.condition || 'Good',
        primary_action: item.primary_action || 'DONATE',
        description: description,
        location: location,
        contact_info: contactInfo,
        image_url: item.image_url || item.preview_image || null
      };

      const res = await publishCommunityListing(payload);
      setSuccessMsg(res.message || 'Item published successfully!');
      if (onPublished) onPublished(res);
      setTimeout(() => {
        onClose();
        setSuccessMsg('');
      }, 1500);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to publish to community board.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-extrabold text-base">Publish to Community Swap Board</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {successMsg ? (
            <div className="p-6 text-center bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <div className="text-sm font-bold text-emerald-900">{successMsg}</div>
            </div>
          ) : (
            <>
              {errorMsg && (
                <div className="p-3 bg-rose-50 text-rose-700 text-xs font-semibold rounded-xl border border-rose-200">
                  {errorMsg}
                </div>
              )}

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-4">
                {item.image_url || item.preview_image ? (
                  <img
                    src={item.image_url || item.preview_image}
                    alt={item.item_name}
                    className="w-14 h-14 object-cover rounded-lg border border-slate-300 shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                    {item.category}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.item_name || 'Item'}</h4>
                  <p className="text-xs text-slate-500">
                    Category: <span className="font-semibold text-slate-700">{item.category}</span> • Condition: <span className="font-semibold text-slate-700">{item.condition}</span>
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Action: {item.primary_action}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Item Description & Notes</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="Describe pickup details or specifics for neighbors..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Pickup Neighborhood</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Contact Email / Info</label>
                  <input
                    type="text"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
                >
                  {isSubmitting ? 'Publishing...' : 'Publish to Board'}
                </button>
              </div>
            </>
          )}
        </form>

      </div>
    </div>
  );
}
