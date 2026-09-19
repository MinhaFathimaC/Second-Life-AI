import React, { useState, useEffect } from 'react';
import { Heart, Building2, ExternalLink, Mail, MapPin, X, Phone, Clock, Search, Map, Send, CheckCircle2 } from 'lucide-react';
import { fetchNgos } from '../services/api';

export default function NgoConnectModal({ isOpen, onClose, category }) {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNgoForPickup, setSelectedNgoForPickup] = useState(null);
  const [pickupForm, setPickupForm] = useState({ name: '', phone: '', notes: '' });
  const [pickupSuccess, setPickupSuccess] = useState('');

  const loadPartners = (cat = category, search = searchQuery) => {
    setLoading(true);
    fetchNgos(cat, search)
      .then((res) => setNgos(res.ngos || []))
      .catch(() => setNgos([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (isOpen) {
      loadPartners(category, searchQuery);
    }
  }, [isOpen, category]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    loadPartners(category, val);
  };

  const handleSchedulePickup = (e) => {
    e.preventDefault();
    setPickupSuccess(`Pickup request sent to ${selectedNgoForPickup.name}! They will contact you shortly at ${pickupForm.phone}.`);
    setTimeout(() => {
      setSelectedNgoForPickup(null);
      setPickupSuccess('');
      setPickupForm({ name: '', phone: '', notes: '' });
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs shrink-0">
            <Heart className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">NGO & Recycling Center Locator</h3>
            <p className="text-xs text-emerald-700 font-semibold">
              Verified Partners & Drop-Off Locations for {category || 'All Items'}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search by city, neighborhood, or partner name..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>

        {/* Pickup Request Sub-View */}
        {selectedNgoForPickup ? (
          <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-slate-900 text-sm">
                Request Pick-Up / Drop-Off with {selectedNgoForPickup.name}
              </h4>
              <button
                type="button"
                onClick={() => setSelectedNgoForPickup(null)}
                className="text-xs text-slate-500 underline font-semibold"
              >
                Back to Partners
              </button>
            </div>

            {pickupSuccess ? (
              <div className="p-6 text-center bg-white rounded-xl border border-emerald-200 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <div className="text-xs font-bold text-emerald-900">{pickupSuccess}</div>
              </div>
            ) : (
              <form onSubmit={handleSchedulePickup} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={pickupForm.name}
                      onChange={(e) => setPickupForm({ ...pickupForm, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-white outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Contact Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={pickupForm.phone}
                      onChange={(e) => setPickupForm({ ...pickupForm, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-white outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Item Notes / Pickup Address</label>
                  <textarea
                    rows={2}
                    value={pickupForm.notes}
                    onChange={(e) => setPickupForm({ ...pickupForm, notes: e.target.value })}
                    placeholder="Address or preferred time window..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-white outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" /> Confirm Pickup Request
                </button>
              </form>
            )}
          </div>
        ) : (
          /* Partner List */
          <div className="space-y-4 mb-6">
            {loading ? (
              <div className="py-8 text-center text-slate-500 text-sm">Loading verified partners...</div>
            ) : ngos.length === 0 ? (
              <div className="p-6 rounded-2xl bg-slate-50 text-slate-600 text-center text-xs">
                No matching NGO or recycling center found for your search. Try resetting your search query.
              </div>
            ) : (
              ngos.map((ngo) => (
                <div key={ngo.id} className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-all shadow-xs space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-emerald-600" />
                        <h4 className="font-extrabold text-slate-900 text-base">{ngo.name}</h4>
                      </div>
                      <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">{ngo.type} • {ngo.verification}</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 shrink-0">
                      {ngo.category_focus} Focus
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{ngo.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{ngo.location} ({ngo.city})</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{ngo.hours}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{ngo.phone}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{ngo.contact_email}</span>
                    </span>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ngo.name + ' ' + ngo.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-emerald-700 bg-slate-100 px-3 py-1.5 rounded-lg"
                    >
                      <Map className="w-3.5 h-3.5 text-emerald-600" />
                      Get Directions
                    </a>

                    {ngo.pickup_available && (
                      <button
                        onClick={() => setSelectedNgoForPickup(ngo)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-1.5 rounded-lg transition-colors ml-auto"
                      >
                        Schedule Pickup
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}
