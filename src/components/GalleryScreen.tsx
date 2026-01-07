import { useState, useEffect } from 'react';
import { ChevronLeft, Trash2, Download, X } from 'lucide-react';

interface GalleryScreenProps {
  onBack: () => void;
  darkMode?: boolean;
  onNavigateToFilters?: () => void;
}

interface Photo {
  id: string;
  imageData: string;
  timestamp: number;
}

export function GalleryScreen({ onBack, darkMode = false, onNavigateToFilters }: GalleryScreenProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = () => {
    const savedPhotos = localStorage.getItem('galleryPhotos');
    if (savedPhotos) {
      setPhotos(JSON.parse(savedPhotos));
    }
  };

  const handleDeletePhoto = (photoId: string) => {
    const updatedPhotos = photos.filter(p => p.id !== photoId);
    setPhotos(updatedPhotos);
    localStorage.setItem('galleryPhotos', JSON.stringify(updatedPhotos));
    setSelectedPhoto(null);
  };

  const downloadPhoto = (photo: Photo) => {
    const link = document.createElement('a');
    link.href = photo.imageData;
    link.download = `embaja-espol-${photo.timestamp}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-40 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="flex items-center gap-3 px-4 py-4">
          <button
            onClick={onBack}
            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <ChevronLeft size={24} className={darkMode ? 'text-gray-300' : 'text-gray-800'} />
          </button>
          <div>
            <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Galería de Fotos
            </h1>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {photos.length} {photos.length === 1 ? 'foto' : 'fotos'}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 pb-20">
        {photos.length === 0 ? (
          <div className="max-w-2xl mx-auto">
            <div className={`rounded-3xl p-12 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <svg className={`w-12 h-12 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                No hay fotos aún
              </h3>
              <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Las fotos que tomes con filtros y marcos aparecerán aquí
              </p>
              <button
                onClick={onNavigateToFilters}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Ir a Filtros y Marcos
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {photos.map((photo) => (
                <button
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className={`aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:scale-105 ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  <img
                    src={photo.imageData}
                    alt="Foto de galería"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Photo Detail Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => downloadPhoto(selectedPhoto)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <Download size={24} />
              </button>
              <button
                onClick={() => {
                  if (confirm('¿Estás seguro de que quieres eliminar esta foto?')) {
                    handleDeletePhoto(selectedPhoto.id);
                  }
                }}
                className="text-red-500 hover:bg-red-500/20 rounded-full p-2 transition-colors"
              >
                <Trash2 size={24} />
              </button>
            </div>
          </div>

          {/* Photo */}
          <div className="flex-1 flex items-center justify-center p-4">
            <img
              src={selectedPhoto.imageData}
              alt="Foto ampliada"
              className="max-w-full max-h-full object-contain rounded-2xl"
            />
          </div>

          {/* Footer */}
          <div className="p-4 text-center">
            <p className="text-white/60 text-sm">
              {new Date(selectedPhoto.timestamp).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}