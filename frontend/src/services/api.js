/**
 * SecondLife AI - Frontend API Service Client
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error('Backend health check failed');
    return await res.json();
  } catch (err) {
    console.error('API health check error:', err);
    return { status: 'offline', error: err.message };
  }
}

export async function analyzeItemImage(file, manualCategory = '', condition = 'Good', userPreference = 'reduce_waste') {
  const formData = new FormData();
  formData.append('file', file);
  if (manualCategory) {
    formData.append('manual_category', manualCategory);
  }
  formData.append('condition', condition);
  formData.append('user_preference', userPreference);

  const res = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to analyze item image');
  }

  return await res.json();
}

export async function reevaluateRecommendation(category, condition, userPreference = 'reduce_waste') {
  const res = await fetch(`${API_BASE}/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category, condition, user_preference: userPreference }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to reevaluate recommendation');
  }

  return await res.json();
}

export async function saveItemAnalysis(itemData) {
  const res = await fetch(`${API_BASE}/history`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(itemData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to save analysis result');
  }

  return await res.json();
}

export async function fetchHistory(category = 'All', action = 'All', search = '') {
  const params = new URLSearchParams();
  if (category && category !== 'All') params.append('category', category);
  if (action && action !== 'All') params.append('action', action);
  if (search) params.append('search', search);

  const res = await fetch(`${API_BASE}/history?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch history');
  return await res.json();
}

export async function fetchDashboardStats() {
  const res = await fetch(`${API_BASE}/dashboard`);
  if (!res.ok) throw new Error('Failed to fetch dashboard metrics');
  return await res.json();
}

export async function fetchCommunityImpact() {
  const res = await fetch(`${API_BASE}/community`);
  if (!res.ok) throw new Error('Failed to fetch community impact data');
  return await res.json();
}

export async function sendFeedbackCorrection(originalCategory, correctedCategory, confidence) {
  const res = await fetch(`${API_BASE}/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      original_category: originalCategory,
      corrected_category: correctedCategory,
      confidence: confidence
    }),
  });
  if (!res.ok) console.warn('Failed to submit correction feedback');
  return await res.json();
}

export async function fetchNgos(category = '', search = '') {
  const params = new URLSearchParams();
  if (category && category !== 'All') params.append('category', category);
  if (search) params.append('search', search);
  const res = await fetch(`${API_BASE}/ngos?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch NGO directory');
  return await res.json();
}

// Community Swap & Sharing Board APIs
export async function fetchCommunityListings(category = 'All', status = 'available', search = '') {
  const params = new URLSearchParams();
  if (category && category !== 'All') params.append('category', category);
  if (status && status !== 'All') params.append('status', status);
  if (search) params.append('search', search);

  const res = await fetch(`${API_BASE}/community/board?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch community board listings');
  return await res.json();
}

export async function publishCommunityListing(listingData) {
  const res = await fetch(`${API_BASE}/community/board`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(listingData),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Failed to publish to community board');
  }
  return await res.json();
}

export async function claimCommunityItem(listingId) {
  const res = await fetch(`${API_BASE}/community/board/${listingId}/claim`, {
    method: 'POST'
  });
  if (!res.ok) throw new Error('Failed to request item from community board');
  return await res.json();
}
