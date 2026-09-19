import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, UploadCloud, RefreshCw, AlertTriangle, CheckCircle2, Heart, ArrowRight, Image as ImageIcon, Info, Layers, SlidersHorizontal, ShieldCheck, HelpCircle, Camera, Share2, Globe, MapPin, Tag } from 'lucide-react';
import ImpactBadge from '../components/ImpactBadge';
import CategoryCorrectionModal from '../components/CategoryCorrectionModal';
import NgoConnectModal from '../components/NgoConnectModal';
import WebcamCaptureModal from '../components/WebcamCaptureModal';
import PublishCommunityModal from '../components/PublishCommunityModal';
import ItemQrTagModal from '../components/ItemQrTagModal';
import { SAMPLE_TEST_ITEMS } from '../data/sampleItems';
import { analyzeItemImage, reevaluateRecommendation, saveItemAnalysis } from '../services/api';

const CONDITIONS = [
  { id: 'Excellent', label: 'Excellent', desc: 'Like new, no damage' },
  { id: 'Good', label: 'Good', desc: 'Functional, minor wear' },
  { id: 'Fair', label: 'Fair', desc: 'Works fine, visible wear' },
  { id: 'Damaged', label: 'Damaged', desc: 'Requires fix or repair' },
  { id: 'Not usable', label: 'Not usable', desc: 'Broken beyond repair' },
];

const GOAL_PREFERENCES = [
  { id: 'reduce_waste', label: '🌱 Reduce Waste', desc: 'Maximize circularity' },
  { id: 'help_someone', label: '💚 Help Someone', desc: 'Prioritize donation' },
  { id: 'save_money', label: '💰 Save Money', desc: 'Reuse or repair first' },
  { id: 'get_creative', label: '✨ Get Creative', desc: 'Focus on upcycling' },
  { id: 'recycle_responsibly', label: '🌀 Recycle Responsibly', desc: 'Proper waste stream' },
];

export default function Analyze() {
  const navigate = useNavigate();

  // State
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [itemName, setItemName] = useState('');
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const [selectedCondition, setSelectedCondition] = useState('Good');
  const [currentCategory, setCurrentCategory] = useState('');
  const [userPreference, setUserPreference] = useState('reduce_waste');

  // Modals
  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);
  const [isNgoModalOpen, setIsNgoModalOpen] = useState(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // Status message
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // File Selection
  const handleFileChange = (file) => {
    if (!file) return;
    if (!file.type.includes('image')) {
      setErrorMsg('Please upload a valid image file (JPEG, PNG, WEBP).');
      return;
    }
    setErrorMsg('');
    setSelectedFile(file);
    setItemName(file.name.split('.')[0].replace(/[-_]/g, ' '));
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
    setAnalysisResult(null);
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  // Preset Selection
  const handleSelectSample = async (sample) => {
    setErrorMsg('');
    setItemName(sample.name);
    setPreviewUrl(sample.imageUrl);
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const response = await fetch(sample.imageUrl);
      const blob = await response.blob();
      const file = new File([blob], `${sample.id}.jpg`, { type: 'image/jpeg' });
      setSelectedFile(file);

      const res = await analyzeItemImage(file, sample.category, sample.condition || 'Good', userPreference);
      setAnalysisResult(res);
      setCurrentCategory(res.ai_analysis.final_category);
      setSelectedCondition(res.selected_condition || 'Good');
    } catch (err) {
      console.error(err);
      setErrorMsg('Could not run AI analysis on sample image.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Run AI Analysis
  const handleRunAnalysis = async () => {
    if (!selectedFile) {
      setErrorMsg('Please upload an item image or select a demonstration scenario first.');
      return;
    }
    setIsAnalyzing(true);
    setErrorMsg('');
    try {
      const res = await analyzeItemImage(selectedFile, '', selectedCondition, userPreference);
      setAnalysisResult(res);
      setCurrentCategory(res.ai_analysis.final_category);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Error running AI analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Re-evaluate when Condition or Goal changes
  const handleReevaluate = async (newCond, newGoal) => {
    const cond = newCond !== undefined ? newCond : selectedCondition;
    const goal = newGoal !== undefined ? newGoal : userPreference;
    
    if (newCond !== undefined) setSelectedCondition(newCond);
    if (newGoal !== undefined) setUserPreference(newGoal);

    if (analysisResult) {
      try {
        const res = await reevaluateRecommendation(currentCategory, cond, goal);
        setAnalysisResult((prev) => ({
          ...prev,
          selected_condition: cond,
          user_preference: goal,
          recommendation: res.recommendation
        }));
      } catch (err) {
        console.warn('Re-evaluate error:', err);
      }
    }
  };

  const handleApplyCategoryCorrection = async (newCat) => {
    setCurrentCategory(newCat);
    if (analysisResult) {
      try {
        const res = await reevaluateRecommendation(newCat, selectedCondition, userPreference);
        setAnalysisResult((prev) => ({
          ...prev,
          ai_analysis: {
            ...prev.ai_analysis,
            final_category: newCat
          },
          recommendation: res.recommendation
        }));
      } catch (err) {
        console.warn('Category update error:', err);
      }
    }
  };

  const handleSaveResult = async () => {
    if (!analysisResult) return;
    setIsSaving(true);
    try {
      const rec = analysisResult.recommendation;
      const payload = {
        item_name: itemName || `${currentCategory} Item`,
        category: currentCategory,
        condition: selectedCondition,
        confidence: analysisResult.ai_analysis.confidence,
        primary_action: rec.primary_action,
        alternative_action: rec.alternative_action,
        second_life_ideas: rec.second_life_ideas,
        waste_avoided: rec.impact.waste_avoided,
        resource_saving: rec.impact.resource_saving,
        environmental_benefit: rec.impact.environmental_benefit,
        sustainability_score: rec.impact.sustainability_score,
        image_url: previewUrl
      };
      await saveItemAnalysis(payload);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save result to history.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setItemName('');
    setAnalysisResult(null);
    setErrorMsg('');
    setSaveSuccess(false);
  };

  const handleLiveCameraCapture = (file, dataUrl) => {
    setSelectedFile(file);
    setPreviewUrl(dataUrl);
    setItemName(`Live Scan Item (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`);
    setAnalysisResult(null);
    setErrorMsg('');
  };

  const currentStep = analysisResult ? 5 : (selectedFile || previewUrl ? 2 : 1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          AI Computer Vision & Circularity Engine
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Analyze an Item</h1>
        <p className="text-slate-600 text-sm mt-1">
          Upload a photo or use your live camera to discover material composition, suitability ratings, and optimal second life.
        </p>
      </div>

      {/* Visible 6-Step Progress Indicator ⭐ */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
        <div className="flex items-center justify-between min-w-[650px] text-xs font-bold">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${currentStep >= 1 ? 'bg-emerald-100 text-emerald-800' : 'text-slate-400'}`}>
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px]">1</span>
            <span>Upload Item</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300" />

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${analysisResult ? 'bg-emerald-100 text-emerald-800' : 'text-slate-400'}`}>
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px]">2</span>
            <span>AI Vision Analysis</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300" />

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${analysisResult ? 'bg-emerald-100 text-emerald-800' : 'text-slate-400'}`}>
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px]">3</span>
            <span>Confirm Condition</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300" />

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${analysisResult ? 'bg-emerald-100 text-emerald-800' : 'text-slate-400'}`}>
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px]">4</span>
            <span>Goal Preferences</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300" />

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${analysisResult ? 'bg-emerald-100 text-emerald-800' : 'text-slate-400'}`}>
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px]">5</span>
            <span>Circularity Analysis</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300" />

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${analysisResult ? 'bg-emerald-100 text-emerald-800' : 'text-slate-400'}`}>
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px]">6</span>
            <span>Take Action</span>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Upload & Demo Scenarios (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-emerald-600" />
              1. Upload Item Photo
            </h2>

            {/* Drag and Drop */}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer relative ${
                previewUrl ? 'border-emerald-400 bg-emerald-50/30' : 'border-slate-300 hover:border-emerald-500 bg-slate-50/50'
              }`}
            >
              {previewUrl ? (
                <div className="space-y-3">
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs relative group">
                    <img src={previewUrl} alt="Upload preview" className="w-full h-full object-cover" />
                    <button
                      onClick={(e) => { e.stopPropagation(); handleReset(); }}
                      className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-semibold backdrop-blur-xs transition-colors"
                    >
                      Change Photo
                    </button>
                  </div>
                  <div className="text-xs text-slate-500 font-medium truncate">{itemName || 'Uploaded item'}</div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                    <ImageIcon className="w-7 h-7 stroke-[1.8]" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-800 block">Drag & drop photo here</span>
                    <span className="text-xs text-slate-500 block mt-0.5">or choose an option below</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3 pt-1">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all">
                      <UploadCloud className="w-4 h-4" /> Browse File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => setIsCameraModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-all"
                    >
                      <Camera className="w-4 h-4 text-emerald-400" />
                      Live Camera
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Item Title / Description (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Cotton Denim Jacket"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            {!analysisResult && (
              <button
                onClick={handleRunAnalysis}
                disabled={!selectedFile || isAnalyzing}
                className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                  selectedFile && !isAnalyzing
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Running MobileNetV2 Analysis...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-200" />
                    <span>Get Sustainable Recommendation</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* 5 Demonstration Scenarios ⭐ */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">5 Demonstration Scenarios</h3>
              <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">College Demo</span>
            </div>
            <p className="text-xs text-slate-500">
              Select any scenario below to test real circular recommendations:
            </p>
            <div className="space-y-2">
              {SAMPLE_TEST_ITEMS.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 transition-all text-left flex items-center gap-3 group"
                >
                  <img src={sample.imageUrl} alt={sample.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                  <div className="overflow-hidden flex-1">
                    <div className="text-xs font-bold text-slate-800 truncate group-hover:text-emerald-700">{sample.name}</div>
                    <div className="text-[10px] text-slate-500 truncate">{sample.description}</div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-700 shrink-0">
                    {sample.condition}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Results & Recommendation Analysis (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {isAnalyzing && (
            <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-xs text-center space-y-4 animate-pulse">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <RefreshCw className="w-8 h-8 animate-spin" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Running AI Vision & Material Classifier...</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Extracting material properties, AI estimated condition, and evaluating multi-action circular suitabilities.
                </p>
              </div>
            </div>
          )}

          {!isAnalyzing && !analysisResult && (
            <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-xs text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="text-lg font-bold text-slate-800">Ready for Circular AI Analysis</h3>
                <p className="text-xs text-slate-500">
                  Upload an image on the left or select a Demonstration Scenario to trigger AI material identification and multi-action suitability scoring.
                </p>
              </div>
            </div>
          )}

          {analysisResult && !isAnalyzing && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Step 2: AI Vision Panel ⭐ */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <h3 className="font-bold text-slate-900 text-base">2. AI Vision Analysis</h3>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    Model: {analysisResult.ai_analysis.model_name}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-slate-500 mb-0.5">Detected Item</div>
                    <div className="font-extrabold text-slate-900">{itemName || analysisResult.ai_analysis.final_category}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-slate-500 mb-0.5">Category</div>
                    <div className="font-extrabold text-emerald-800 flex items-center gap-1">
                      <span>{currentCategory}</span>
                      <button onClick={() => setIsCorrectionModalOpen(true)} className="text-[10px] text-emerald-600 underline">Change</button>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-slate-500 mb-0.5">Material Identification</div>
                    <div className="font-extrabold text-teal-800">{analysisResult.ai_analysis.material}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-slate-500 mb-0.5">AI Confidence</div>
                    <div className="font-extrabold text-emerald-700">{analysisResult.ai_analysis.confidence_percentage}</div>
                  </div>
                </div>

                {/* AI Suitability Indicators & Preliminary Condition */}
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-emerald-900">
                    AI Estimated Condition: <strong className="font-extrabold">{analysisResult.ai_analysis.ai_estimated_condition}</strong>
                  </span>
                  <div className="flex items-center gap-3 text-slate-600 font-medium">
                    <span>Reuse: <strong className="text-emerald-700">{analysisResult.ai_analysis.suitability.reusability}</strong></span>
                    <span>Donation: <strong className="text-emerald-700">{analysisResult.ai_analysis.suitability.donation_suitability}</strong></span>
                    <span>Recycling: <strong className="text-emerald-700">{analysisResult.ai_analysis.suitability.recycling_suitability}</strong></span>
                  </div>
                </div>

                {analysisResult.ai_analysis.is_low_confidence && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
                    <span>The AI is not fully confident. Please confirm or correct category manually.</span>
                    <button onClick={() => setIsCorrectionModalOpen(true)} className="px-2.5 py-1 rounded bg-amber-600 text-white font-bold">
                      Correct Category
                    </button>
                  </div>
                )}
              </div>

              {/* Step 3 & 4: Confirm Condition & Goal Preferences ⭐ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Step 3: Condition */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    3. Confirm or Change Condition
                  </div>
                  <div className="space-y-1.5">
                    {CONDITIONS.map((cond) => (
                      <button
                        key={cond.id}
                        onClick={() => handleReevaluate(cond.id, undefined)}
                        className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                          selectedCondition === cond.id
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20'
                            : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                        }`}
                      >
                        <div>
                          <span className="font-bold block">{cond.label}</span>
                          <span className="text-[10px] text-slate-500">{cond.desc}</span>
                        </div>
                        {selectedCondition === cond.id && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 4: Goal Preference Selector */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    4. What is your preferred goal?
                  </div>
                  <div className="space-y-1.5">
                    {GOAL_PREFERENCES.map((goal) => (
                      <button
                        key={goal.id}
                        onClick={() => handleReevaluate(undefined, goal.id)}
                        className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                          userPreference === goal.id
                            ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold ring-2 ring-teal-500/20'
                            : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                        }`}
                      >
                        <div>
                          <span className="font-bold block">{goal.label}</span>
                          <span className="text-[10px] text-slate-500">{goal.desc}</span>
                        </div>
                        {userPreference === goal.id && <CheckCircle2 className="w-4 h-4 text-teal-600" />}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Step 5: Multi-Option Circularity Analysis & Results Card ⭐ */}
              <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-lg space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-bl-full pointer-events-none" />

                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-extrabold text-slate-900 text-lg">Circularity Analysis</h3>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                    {currentCategory} • {selectedCondition}
                  </span>
                </div>

                {/* Best Second Life Action Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-200">
                      Best Second-Life Action
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black">
                      Suitability: {analysisResult.recommendation.primary_score} / 100
                    </span>
                  </div>
                  <div className="text-3xl font-black tracking-tight">
                    {analysisResult.recommendation.primary_action}
                  </div>
                  <p className="text-sm text-emerald-50 leading-relaxed font-normal pt-1">
                    «"{analysisResult.recommendation.recommendation_reason}"»
                  </p>
                </div>

                {/* Multi-Option Suitability Breakdown Bar List ⭐ */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                    💡 All Suitability Scores
                  </h4>
                  <div className="space-y-2">
                    {analysisResult.recommendation.all_suitability_scores.map((item) => (
                      <div key={item.action} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span>{item.action}</span>
                          <span className="text-emerald-700">{item.score} / 100</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full bg-emerald-600 rounded-full transition-all"
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Second Life Practical Ideas */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                    ✨ Second-Life Practical Ideas
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {analysisResult.recommendation.second_life_ideas.map((idea, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{idea}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Circularity Score & Factor Breakdown ⭐ */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                      🌱 Circularity Score Breakdown
                    </h4>
                    <span className="text-xs font-black text-emerald-700">
                      Overall: {analysisResult.recommendation.impact.sustainability_score} / 100
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[10px] text-slate-500">Condition</div>
                      <div className="font-bold text-slate-800">{analysisResult.recommendation.impact.score_factors.condition_factor}</div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[10px] text-slate-500">Reuse</div>
                      <div className="font-bold text-slate-800">{analysisResult.recommendation.impact.score_factors.reuse_factor}</div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[10px] text-slate-500">Donation</div>
                      <div className="font-bold text-slate-800">{analysisResult.recommendation.impact.score_factors.donation_factor}</div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[10px] text-slate-500">Upcycle</div>
                      <div className="font-bold text-slate-800">{analysisResult.recommendation.impact.score_factors.upcycling_factor}</div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[10px] text-slate-500">Recycle</div>
                      <div className="font-bold text-slate-800">{analysisResult.recommendation.impact.score_factors.recycling_factor}</div>
                    </div>
                  </div>
                </div>

                {/* "What If I Throw It Away?" Section ⭐ */}
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1 text-xs">
                  <div className="font-bold flex items-center gap-1.5 text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    Why not throw it away?
                  </div>
                  <p className="text-amber-900 leading-relaxed">
                    «"{analysisResult.recommendation.disposal_warning}"»
                  </p>
                </div>

                {/* Step 6: Action Plan ⭐ */}
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-3">
                  <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                    🚀 Step-by-Step Action Plan
                  </h4>
                  <ul className="space-y-1.5 text-xs text-emerald-800">
                    {analysisResult.recommendation.action_plan.map((step, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Interactive Action Triggers */}
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsNgoModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all"
                    >
                      <Globe className="w-3.5 h-3.5 text-emerald-200" />
                      Find NGO / Drop-Off Locator
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsPublishModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-all"
                    >
                      <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                      Publish to Community Board
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsQrModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-all"
                    >
                      <Tag className="w-3.5 h-3.5 text-emerald-200" />
                      Print QR Tag & Certificate
                    </button>
                  </div>
                </div>

                {/* Save and Reset Buttons */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleSaveResult}
                    disabled={isSaving || saveSuccess}
                    className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                      saveSuccess
                        ? 'bg-emerald-700 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                    }`}
                  >
                    {isSaving ? (
                      <span>Saving...</span>
                    ) : saveSuccess ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                        <span>Saved to History!</span>
                      </>
                    ) : (
                      <span>Save Result to History</span>
                    )}
                  </button>

                  <button
                    onClick={handleReset}
                    className="py-3 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
                  >
                    Analyze Another Item
                  </button>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>

      <CategoryCorrectionModal
        isOpen={isCorrectionModalOpen}
        onClose={() => setIsCorrectionModalOpen(false)}
        originalCategory={currentCategory}
        confidence={analysisResult?.ai_analysis?.confidence || 0.8}
        onSelectCategory={handleApplyCategoryCorrection}
      />

      <NgoConnectModal
        isOpen={isNgoModalOpen}
        onClose={() => setIsNgoModalOpen(false)}
        category={currentCategory}
      />

      <WebcamCaptureModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        onCapture={handleLiveCameraCapture}
      />

      <PublishCommunityModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        item={analysisResult ? {
          item_name: itemName || `${currentCategory} Item`,
          category: currentCategory,
          condition: selectedCondition,
          primary_action: analysisResult.recommendation.primary_action,
          preview_image: previewUrl
        } : null}
      />

      <ItemQrTagModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        item={analysisResult ? {
          item_name: itemName || `${currentCategory} Item`,
          category: currentCategory,
          condition: selectedCondition,
          primary_action: analysisResult.recommendation.primary_action,
          sustainability_score: analysisResult.recommendation.impact.sustainability_score,
          preview_image: previewUrl
        } : null}
      />

    </div>
  );
}
