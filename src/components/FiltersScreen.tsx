import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Camera, Download, RotateCw, Share2, X, Upload, AlertCircle } from 'lucide-react';

interface FiltersScreenProps {
  onBack: () => void;
  darkMode?: boolean;
  userRole?: string;
  onNavigateToGallery?: () => void;
}

interface FilterOption {
  id: string;
  name: string;
  cssFilter: string;
}

interface FrameOption {
  id: string;
  name: string;
  image: string;
  emoji: string;
}

const filters: FilterOption[] = [
  { id: 'none', name: 'Original', cssFilter: 'none' },
  { id: 'grayscale', name: 'Clásico B&N', cssFilter: 'grayscale(100%)' },
  { id: 'sepia', name: 'Nostalgia', cssFilter: 'sepia(100%)' },
  { id: 'vintage', name: 'Retro', cssFilter: 'sepia(50%) contrast(110%) brightness(110%)' },
  { id: 'cool', name: 'Atardecer Azul', cssFilter: 'hue-rotate(180deg) saturate(120%)' },
  { id: 'warm', name: 'Amanecer Dorado', cssFilter: 'hue-rotate(-20deg) saturate(130%)' },
  { id: 'vibrant', name: 'Colores Intensos', cssFilter: 'saturate(200%) contrast(120%)' },
  { id: 'dramatic', name: 'Contraste Alto', cssFilter: 'contrast(150%) brightness(90%)' },
  { id: 'fade', name: 'Suave Pastel', cssFilter: 'contrast(90%) brightness(110%) saturate(80%)' },
  { id: 'bright', name: 'Luz Natural', cssFilter: 'brightness(130%) saturate(110%)' }
];

const frames: FrameOption[] = [
  { id: 'none', name: 'Sin Marco', emoji: '⭕', image: '' },
  { id: 'embaja-blue', name: 'ESPOL Azul', emoji: '🔵', image: 'border-gradient-blue' },
  { id: 'embaja-green', name: 'ESPOL Verde', emoji: '🟢', image: 'border-gradient-green' },
  { id: 'embaja-purple', name: 'ESPOL Morado', emoji: '🟣', image: 'border-gradient-purple' },
  { id: 'world-traveler', name: 'Aventura Mundial', emoji: '🌍', image: 'frame-world' },
  { id: 'academic', name: 'Intercambio', emoji: '🎓', image: 'frame-academic' },
  { id: 'passport', name: 'Recuerdo de Viaje', emoji: '🛂', image: 'frame-passport' },
  { id: 'celebration', name: 'Momento Especial', emoji: '🎉', image: 'frame-celebration' }
];

export function FiltersScreen({ onBack, darkMode = false, userRole, onNavigateToGallery }: FiltersScreenProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('none');
  const [selectedFrame, setSelectedFrame] = useState<string>('none');
  const [cameraActive, setCameraActive] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showFrameMenu, setShowFrameMenu] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null); // Guardar imagen original
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      // Cleanup: detener la cámara al desmontar el componente
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    // Procesar imagen subida
    if (uploadedImage) {
      processUploadedImage(uploadedImage);
    }
  }, [uploadedImage, selectedFilter, selectedFrame]);

  // Re-procesar imagen cuando cambian filtros o marcos
  useEffect(() => {
    if (originalImage && capturedImage) {
      processUploadedImage(originalImage);
    }
  }, [selectedFilter, selectedFrame]);

  const startCamera = async () => {
    try {
      setCameraError(null); // Limpiar errores previos
      
      // Detener stream anterior si existe
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
        setCameraError(null);
      }
    } catch (error: any) {
      // Manejo silencioso del error - mostrar mensaje en UI sin console.error
      let errorMessage = 'No se pudo acceder a la cámara.';
      
      if (error.name === 'NotAllowedError') {
        errorMessage = 'Permiso de cámara denegado. Puedes subir una foto desde tu galería.';
      } else if (error.name === 'NotFoundError') {
        errorMessage = 'No se encontró ninguna cámara en este dispositivo.';
      } else if (error.name === 'NotReadableError') {
        errorMessage = 'La cámara está siendo usada por otra aplicación.';
      }
      
      setCameraError(errorMessage);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const switchCamera = async () => {
    const newFacingMode = 'environment';
    setFacingMode(newFacingMode);
    
    if (cameraActive) {
      stopCamera();
      // Pequeño delay antes de reiniciar con la nueva cámara
      setTimeout(() => {
        startCamera();
      }, 100);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Configurar el tamaño del canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Primero, guardar la imagen original sin filtros ni marcos
    context.filter = 'none';
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const originalImageData = canvas.toDataURL('image/png');
    setOriginalImage(originalImageData);

    // Limpiar el canvas para aplicar filtros
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Aplicar filtro
    const currentFilter = filters.find(f => f.id === selectedFilter);
    if (currentFilter) {
      context.filter = currentFilter.cssFilter;
    }

    // Dibujar el video en el canvas con filtro
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Aplicar marco si está seleccionado
    if (selectedFrame !== 'none') {
      applyFrame(context, canvas.width, canvas.height);
    }

    // Convertir a imagen
    const imageData = canvas.toDataURL('image/png');
    setCapturedImage(imageData);
    stopCamera();
  };

  const applyFrame = (context: CanvasRenderingContext2D, width: number, height: number) => {
    const frame = frames.find(f => f.id === selectedFrame);
    if (!frame || frame.id === 'none') return;

    context.filter = 'none'; // Reset filter para el marco

    const borderWidth = Math.min(width, height) * 0.05; // Reducido de 8% a 5% del tamaño

    // Diferentes estilos de marco según el ID
    if (frame.id.startsWith('embaja-')) {
      // Marcos de EmbajaESPOL con gradientes
      const gradient = context.createLinearGradient(0, 0, width, height);
      
      if (frame.id === 'embaja-blue') {
        gradient.addColorStop(0, '#3b82f6');
        gradient.addColorStop(1, '#1d4ed8');
      } else if (frame.id === 'embaja-green') {
        gradient.addColorStop(0, '#10b981');
        gradient.addColorStop(1, '#059669');
      } else if (frame.id === 'embaja-purple') {
        gradient.addColorStop(0, '#8b5cf6');
        gradient.addColorStop(1, '#6d28d9');
      }

      context.strokeStyle = gradient;
      context.lineWidth = borderWidth;
      context.strokeRect(borderWidth / 2, borderWidth / 2, width - borderWidth, height - borderWidth);

      // Agregar texto EmbajaESPOL
      context.fillStyle = '#ffffff';
      context.font = `bold ${borderWidth * 0.5}px Arial`;
      context.textAlign = 'center';
      context.fillText('EmbajaESPOL', width / 2, height - borderWidth * 0.3);
    } else if (frame.id === 'frame-world') {
      // Marco de viajero mundial
      context.strokeStyle = '#3b82f6';
      context.lineWidth = borderWidth;
      context.strokeRect(borderWidth / 2, borderWidth / 2, width - borderWidth, height - borderWidth);

      // Emojis de viaje en las esquinas
      context.font = `${borderWidth * 0.6}px Arial`;
      context.fillText('✈️', borderWidth * 0.6, borderWidth * 0.8);
      context.fillText('🌍', width - borderWidth * 0.6, borderWidth * 0.8);
      context.fillText('🎒', borderWidth * 0.6, height - borderWidth * 0.3);
      context.fillText('📸', width - borderWidth * 0.6, height - borderWidth * 0.3);
    } else if (frame.id === 'frame-academic') {
      // Marco académico
      context.strokeStyle = '#7c3aed';
      context.lineWidth = borderWidth;
      context.strokeRect(borderWidth / 2, borderWidth / 2, width - borderWidth, height - borderWidth);

      context.font = `${borderWidth * 0.6}px Arial`;
      context.fillText('🎓', width / 2, borderWidth * 0.7);
      context.fillStyle = '#ffffff';
      context.font = `bold ${borderWidth * 0.4}px Arial`;
      context.textAlign = 'center';
      context.fillText('Intercambio Académico', width / 2, height - borderWidth * 0.3);
    } else if (frame.id === 'frame-passport') {
      // Marco estilo pasaporte
      context.fillStyle = '#1e40af';
      context.fillRect(0, 0, width, borderWidth);
      context.fillRect(0, height - borderWidth, width, borderWidth);

      context.fillStyle = '#ffffff';
      context.font = `bold ${borderWidth * 0.5}px Arial`;
      context.textAlign = 'center';
      context.fillText('🛂 PASSPORT', width / 2, borderWidth * 0.7);
      context.fillText('ESPOL', width / 2, height - borderWidth * 0.4);
    } else if (frame.id === 'frame-celebration') {
      // Marco de celebración
      context.strokeStyle = '#f59e0b';
      context.lineWidth = borderWidth;
      context.strokeRect(borderWidth / 2, borderWidth / 2, width - borderWidth, height - borderWidth);

      context.font = `${borderWidth * 0.5}px Arial`;
      const confetti = ['🎉', '🎊', '⭐', '✨'];
      for (let i = 0; i < 8; i++) {
        const emoji = confetti[i % confetti.length];
        const angle = (i / 8) * Math.PI * 2;
        const x = width / 2 + Math.cos(angle) * (width * 0.45);
        const y = height / 2 + Math.sin(angle) * (height * 0.45);
        context.fillText(emoji, x, y);
      }
    }
  };

  const downloadImage = () => {
    if (!capturedImage) return;

    // Guardar en galería
    saveToGallery(capturedImage);

    const link = document.createElement('a');
    link.href = capturedImage;
    link.download = `EmbajaESPOL-${Date.now()}.png`;
    link.click();
  };

  const saveToGallery = (imageData: string) => {
    const savedPhotos = localStorage.getItem('galleryPhotos');
    const photos = savedPhotos ? JSON.parse(savedPhotos) : [];
    
    const newPhoto = {
      id: Date.now().toString(),
      imageData: imageData, // Cambiar de 'image' a 'imageData'
      timestamp: Date.now(), // Cambiar de 'date' a 'timestamp'
      location: 'Filtros y Marcos'
    };
    
    photos.unshift(newPhoto); // Agregar al inicio
    localStorage.setItem('galleryPhotos', JSON.stringify(photos));
    
    // También actualizar el progreso del usuario si está logueado
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    if (currentUserEmail) {
      const userDataKey = `user_${currentUserEmail}`;
      const userData = localStorage.getItem(userDataKey);
      if (userData) {
        const userProgress = JSON.parse(userData);
        userProgress.galleryPhotos = photos;
        localStorage.setItem(userDataKey, JSON.stringify(userProgress));
      }
    }
  };

  const shareImage = async () => {
    if (!capturedImage) return;

    // Guardar en galería antes de compartir
    saveToGallery(capturedImage);

    try {
      // Convertir data URL a blob
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      const file = new File([blob], `EmbajaESPOL-${Date.now()}.png`, { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Mi foto de EmbajaESPOL',
          text: '¡Mira mi foto con filtros de EmbajaESPOL! 📸🌍'
        });
      } else {
        // Fallback: descargar si no se puede compartir
        downloadImage();
        alert('Se descargó la imagen. Puedes compartirla desde tu galería.');
      }
    } catch (error) {
      console.error('Error al compartir:', error);
      // Fallback: descargar
      downloadImage();
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setOriginalImage(null);
    startCamera();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        setOriginalImage(imageDataUrl); // Guardar original
        setUploadedImage(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const processUploadedImage = (imageData: string) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Configurar el tamaño del canvas
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Aplicar filtro
      const currentFilter = filters.find(f => f.id === selectedFilter);
      if (currentFilter) {
        context.filter = currentFilter.cssFilter;
      }

      // Dibujar la imagen en el canvas
      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Aplicar marco si está seleccionado
      if (selectedFrame !== 'none') {
        applyFrame(context, canvas.width, canvas.height);
      }

      // Convertir a imagen
      const processedImageData = canvas.toDataURL('image/png');
      setCapturedImage(processedImageData);
    };
    img.src = imageData;
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Success Message Toast */}
      {showSuccessMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">✓</span>
            </div>
            <div>
              <p className="font-bold">¡Foto guardada con éxito!</p>
              <p className="text-sm opacity-90">Ya puedes verla en tu galería</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`sticky top-0 z-40 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="flex items-center justify-between gap-3 px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <ChevronLeft size={24} className={darkMode ? 'text-gray-300' : 'text-gray-800'} />
            </button>
            <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Filtros y Marcos
            </h1>
          </div>
          {onNavigateToGallery && (
            <button
              onClick={onNavigateToGallery}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                darkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              📸 Galería
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 pb-20">
        <div className="max-w-2xl mx-auto">
          {/* Camera/Preview Area */}
          <div className="relative mb-6">
            <div className={`relative rounded-3xl overflow-hidden shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              {!cameraActive && !capturedImage && (
                <div className="aspect-[3/4] flex flex-col items-center justify-center p-8">
                  {cameraError && (
                    <div className={`mb-6 p-4 rounded-2xl ${darkMode ? 'bg-red-900/30 border border-red-700' : 'bg-red-50 border border-red-200'} w-full`}>
                      <div className="flex items-start gap-3">
                        <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className={`text-sm ${darkMode ? 'text-red-200' : 'text-red-800'}`}>
                            {cameraError}
                          </p>
                          <button
                            onClick={() => setCameraError(null)}
                            className={`text-xs mt-2 ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'} font-bold`}
                          >
                            Cerrar
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                    <Camera size={64} className="text-white" />
                  </div>
                  <h2 className={`text-2xl font-bold mb-3 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    ¡Toma una foto increíble!
                  </h2>
                  <p className={`text-center mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Aplica filtros y marcos personalizados de EmbajaESPOL
                  </p>
                  
                  <div className="flex flex-col gap-3 w-full max-w-xs">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all hover:scale-105 w-full flex items-center justify-center gap-2"
                    >
                      <Upload size={24} />
                      📸 Subir Foto
                    </button>
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              )}

              {cameraActive && (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full aspect-[3/4] object-cover"
                    style={{ 
                      filter: filters.find(f => f.id === selectedFilter)?.cssFilter || 'none',
                      transform: 'scaleX(-1)'
                    }}
                  />
                  
                  {/* Frame Overlay Preview */}
                  {selectedFrame !== 'none' && (
                    <div className="absolute inset-0 pointer-events-none">
                      {selectedFrame.startsWith('embaja-') && (
                        <div className={`absolute inset-0 border-8 ${
                          selectedFrame === 'embaja-blue' ? 'border-blue-600' :
                          selectedFrame === 'embaja-green' ? 'border-green-600' :
                          'border-purple-600'
                        }`}>
                          <div className="absolute bottom-2 left-0 right-0 text-center">
                            <span className="text-white font-bold text-xl bg-black/50 px-4 py-1 rounded-full">
                              EmbajaESPOL
                            </span>
                          </div>
                        </div>
                      )}
                      {selectedFrame === 'frame-world' && (
                        <div className="absolute inset-0 border-8 border-blue-600">
                          <div className="absolute top-2 left-2 text-3xl">✈️</div>
                          <div className="absolute top-2 right-2 text-3xl">🌍</div>
                          <div className="absolute bottom-2 left-2 text-3xl">🎒</div>
                          <div className="absolute bottom-2 right-2 text-3xl">📸</div>
                        </div>
                      )}
                      {selectedFrame === 'frame-academic' && (
                        <div className="absolute inset-0 border-8 border-purple-600">
                          <div className="absolute top-2 left-0 right-0 text-center text-4xl">🎓</div>
                          <div className="absolute bottom-2 left-0 right-0 text-center">
                            <span className="text-white font-bold text-lg bg-black/50 px-4 py-1 rounded-full">
                              Intercambio Académico
                            </span>
                          </div>
                        </div>
                      )}
                      {selectedFrame === 'frame-passport' && (
                        <div className="absolute inset-0">
                          <div className="absolute top-0 left-0 right-0 bg-blue-900 py-3 text-center">
                            <span className="text-white font-bold text-xl">🛂 PASSPORT</span>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-blue-900 py-3 text-center">
                            <span className="text-white font-bold text-xl">ESPOL</span>
                          </div>
                        </div>
                      )}
                      {selectedFrame === 'frame-celebration' && (
                        <div className="absolute inset-0 border-8 border-yellow-500">
                          <div className="absolute top-4 left-1/4 text-3xl">🎉</div>
                          <div className="absolute top-4 right-1/4 text-3xl">🎊</div>
                          <div className="absolute top-1/3 left-4 text-3xl">⭐</div>
                          <div className="absolute top-1/3 right-4 text-3xl">✨</div>
                          <div className="absolute bottom-1/3 left-4 text-3xl">🎉</div>
                          <div className="absolute bottom-1/3 right-4 text-3xl">🎊</div>
                          <div className="absolute bottom-4 left-1/4 text-3xl">⭐</div>
                          <div className="absolute bottom-4 right-1/4 text-3xl">✨</div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              {capturedImage && (
                <img
                  src={capturedImage}
                  alt="Foto capturada"
                  className="w-full aspect-[3/4] object-cover"
                />
              )}
            </div>

            {/* Camera Controls */}
            {cameraActive && (
              <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-4 px-4">
                {/* Capture Button */}
                <button
                  onClick={capturePhoto}
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl border-4 border-white/50"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full"></div>
                </button>

                {/* Close Camera */}
                <button
                  onClick={stopCamera}
                  className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors ml-4"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>
            )}

            {/* Captured Image Controls - Below the image */}
            {capturedImage && (
              <div className={`rounded-2xl p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <h3 className={`font-bold mb-4 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  ¡Foto lista! 📸
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={downloadImage}
                    className="bg-blue-600 text-white py-4 px-6 rounded-2xl hover:bg-blue-700 transition-all font-bold flex items-center justify-center gap-2"
                  >
                    <Download size={20} />
                    Descargar
                  </button>
                  <button
                    onClick={shareImage}
                    className="bg-purple-600 text-white py-4 px-6 rounded-2xl hover:bg-purple-700 transition-all font-bold flex items-center justify-center gap-2"
                  >
                    <Share2 size={20} />
                    Compartir
                  </button>
                  <button
                    onClick={() => {
                      saveToGallery(capturedImage);
                      // Mostrar mensaje de éxito
                      setShowSuccessMessage(true);
                      setTimeout(() => {
                        setShowSuccessMessage(false);
                      }, 3000);
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-2xl hover:opacity-90 transition-all font-bold flex items-center justify-center gap-2"
                  >
                    📸 Guardar en Galería
                  </button>
                  <button
                    onClick={retakePhoto}
                    className="bg-gray-600 text-white py-4 px-6 rounded-2xl hover:bg-gray-700 transition-all font-bold flex items-center justify-center gap-2"
                  >
                    <RotateCw size={20} />
                    Retomar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Filters Section */}
          {!cameraActive && (
            <>
              <div className={`rounded-2xl p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {capturedImage ? 'Aplicar Filtros' : 'Filtros'}
                  </h3>
                  <button
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                    className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'} font-bold`}
                  >
                    {showFilterMenu ? 'Ocultar' : 'Ver todos'}
                  </button>
                </div>
                
                <div className={`grid grid-cols-5 gap-3 ${!showFilterMenu && 'max-h-20 overflow-hidden'}`}>
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        selectedFilter === filter.id
                          ? 'border-blue-600 scale-105'
                          : darkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div
                        className="w-full h-full bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400"
                        style={{ filter: filter.cssFilter }}
                      />
                    </button>
                  ))}
                </div>
                
                <p className={`text-sm mt-3 text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {filters.find(f => f.id === selectedFilter)?.name}
                </p>
              </div>

              {/* Frames Section */}
              <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {capturedImage ? 'Aplicar Marcos' : 'Marcos'}
                  </h3>
                  <button
                    onClick={() => setShowFrameMenu(!showFrameMenu)}
                    className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'} font-bold`}
                  >
                    {showFrameMenu ? 'Ocultar' : 'Ver todos'}
                  </button>
                </div>
                
                <div className={`grid grid-cols-4 gap-3 ${!showFrameMenu && 'max-h-24 overflow-hidden'}`}>
                  {frames.map((frame) => (
                    <button
                      key={frame.id}
                      onClick={() => setSelectedFrame(frame.id)}
                      className={`aspect-square rounded-xl flex flex-col items-center justify-center border-2 transition-all ${
                        selectedFrame === frame.id
                          ? 'border-purple-600 scale-105 bg-purple-50'
                          : darkMode ? 'border-gray-700 hover:border-gray-600 bg-gray-700' : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                      }`}
                    >
                      <div className="text-3xl">{frame.emoji}</div>
                    </button>
                  ))}
                </div>
                
                <p className={`text-sm mt-3 text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {frames.find(f => f.id === selectedFrame)?.name}
                </p>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}