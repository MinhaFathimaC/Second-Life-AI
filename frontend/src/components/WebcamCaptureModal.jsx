import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

export default function WebcamCaptureModal({ isOpen, onClose, onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraError, setCameraError] = useState('');
  const [facingMode, setFacingMode] = useState('user'); // 'user' or 'environment'

  const startCamera = async (mode = facingMode) => {
    setCameraError('');
    setCapturedImage(null);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraError('Could not access camera. Please check camera permissions or device settings.');
    }
  };

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleTakeSnapshot = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setCapturedImage(dataUrl);
  };

  const handleConfirmPhoto = () => {
    if (!capturedImage) return;
    // Convert base64 dataUrl to File object
    fetch(capturedImage)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], `live_scan_${Date.now()}.jpg`, { type: 'image/jpeg' });
        onCapture(file, capturedImage);
        onClose();
      });
  };

  const toggleCameraFacing = () => {
    const nextMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-400" />
            <h3 className="font-extrabold text-base">Live Camera AI Item Scan</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Camera Display Container */}
        <div className="p-6 space-y-4 flex-1">
          {cameraError ? (
            <div className="p-8 text-center bg-rose-50 border border-rose-200 rounded-2xl space-y-3">
              <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
              <div className="text-sm font-bold text-rose-900">{cameraError}</div>
              <p className="text-xs text-rose-600">
                You can still upload an image directly or select one of our demo sample items.
              </p>
            </div>
          ) : capturedImage ? (
            <div className="space-y-3">
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 relative">
                <img src={capturedImage} alt="Captured preview" className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-600/90 text-white font-bold text-xs backdrop-blur-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Photo Snapshot Ready
                </div>
              </div>
            </div>
          ) : (
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />

              {/* Viewfinder Overlay graphics */}
              <div className="absolute inset-8 border-2 border-emerald-400/40 border-dashed rounded-2xl pointer-events-none flex items-center justify-center">
                <span className="text-xs font-semibold text-emerald-200/80 bg-slate-900/60 px-3 py-1 rounded-full backdrop-blur-xs">
                  Center Item Here
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={toggleCameraFacing}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            Flip Camera
          </button>

          <div className="flex items-center gap-3">
            {capturedImage ? (
              <>
                <button
                  type="button"
                  onClick={() => setCapturedImage(null)}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100"
                >
                  Retake Photo
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPhoto}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/30"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Analyze Live Photo
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleTakeSnapshot}
                disabled={Boolean(cameraError)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-emerald-600/30"
              >
                <Camera className="w-4 h-4" />
                Capture Snapshot
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
