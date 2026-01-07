import { useState, useEffect, useRef } from 'react';
import { Menu, Bell, Settings, User, LogOut, ChevronLeft, ChevronRight, X, Globe2, MapPin, Briefcase, Route, Camera, Gift, UserCircle, Mail, Phone, HelpCircle, Edit2, AlertCircle, MessageCircle, Plane, CheckCircle, ChevronRight as ChevronRightIcon, Moon, Map, Globe, Wrench, Award } from 'lucide-react';
import { CultureScreen } from './CultureScreen';
import { ContactScreen } from './ContactScreen';
import { DestinationsScreen } from './DestinationsScreen';
import { RouteScreen } from './RouteScreen';
import { ToolkitScreen } from './ToolkitScreen';
import { FiltersScreen } from './FiltersScreen';
import { RewardsScreen } from './RewardsScreen';
import { GalleryScreen } from './GalleryScreen';
import { NotificationsScreen } from './NotificationsScreen';

// Importar banderas
import colombiaFlag from 'figma:asset/f17c7a13fc05a450ce0a32fb5ec70e4a21959005.png';
import brasilFlag from 'figma:asset/1d2d25b38296ff6cf4a1923c0fa69ba8a5c198fb.png';
import spainFlag from 'figma:asset/9fae1dadfaada4186442b7d12daa3d89b69bcd62.png';

interface Review {
  id: number;
  name: string;
  country: string;
  flagUrl: string;
  text: string;
  rating: number;
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'María González',
    country: 'Colombia',
    flagUrl: colombiaFlag,
    text: '¡Increíble! Es una experiencia que no debes perderte',
    rating: 5,
  },
  {
    id: 2,
    name: 'Carlos Ramírez',
    country: 'España',
    flagUrl: spainFlag,
    text: 'Participa y vive la experiencia que te recomiendo',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ana Silva',
    country: 'Brasil',
    flagUrl: brasilFlag,
    text: 'Una oportunidad única para crecer profesionalmente',
    rating: 5,
  },
];

interface MainScreenProps {
  onLogout?: () => void;
  userEmail?: string;
  userRole?: string;
  isRouteUnlocked?: boolean;
  onUnlockRoute?: () => void;
  isToolkitUnlocked?: boolean;
  onUnlockToolkit?: () => void;
  selectedDestination?: string | null;
  setSelectedDestination?: (destination: string | null) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: any;
}

export function MainScreen({ onLogout, userEmail, userRole, isRouteUnlocked = false, onUnlockRoute, isToolkitUnlocked = false, onUnlockToolkit, selectedDestination, setSelectedDestination }: MainScreenProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [tempPhone, setTempPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [settingsView, setSettingsView] = useState<'menu' | 'personal' | 'contact' | 'support' | 'customize'>('menu');
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [matriculaNumber] = useState('202012345');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showCulture, setShowCulture] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showDestinations, setShowDestinations] = useState(false);
  const [showRoute, setShowRoute] = useState(false);
  const [showToolkit, setShowToolkit] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryPhotos, setGalleryPhotos] = useState<any[]>([]);
  const [currentPendingTask, setCurrentPendingTask] = useState<{id: number; title: string; deadline: string; obligatory: boolean} | null>(null);
  const [openTaskFromPending, setOpenTaskFromPending] = useState<number | null>(null);
  const [completedTrips, setCompletedTrips] = useState(0);

  // Cargar viajes completados desde localStorage
  useEffect(() => {
    const loadCompletedTrips = () => {
      const trips = parseInt(localStorage.getItem('completedTrips') || '0', 10);
      setCompletedTrips(trips);
    };
    
    loadCompletedTrips();
    
    // Actualizar cada segundo para capturar cambios en tiempo real
    const interval = setInterval(loadCompletedTrips, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cargar tarea pendiente desde localStorage
  useEffect(() => {
    const savedTask = localStorage.getItem('currentPendingTask');
    if (savedTask) {
      setCurrentPendingTask(JSON.parse(savedTask));
    } else {
      setCurrentPendingTask(null);
    }
    
    // Cargar fotos de galería
    loadGalleryPhotos();
    
    // Escuchar cambios en localStorage
    const handleStorageChange = () => {
      const updatedTask = localStorage.getItem('currentPendingTask');
      if (updatedTask) {
        setCurrentPendingTask(JSON.parse(updatedTask));
      } else {
        setCurrentPendingTask(null);
      }
      loadGalleryPhotos();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // También escuchar cambios personalizados desde el mismo tab
    const interval = setInterval(() => {
      const updatedTask = localStorage.getItem('currentPendingTask');
      const currentStr = currentPendingTask ? JSON.stringify(currentPendingTask) : null;
      if (updatedTask !== currentStr) {
        if (updatedTask) {
          setCurrentPendingTask(JSON.parse(updatedTask));
        } else {
          setCurrentPendingTask(null);
        }
      }
      loadGalleryPhotos();
    }, 1000); // Revisar cada segundo
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const loadGalleryPhotos = () => {
    const savedPhotos = localStorage.getItem('galleryPhotos');
    if (savedPhotos) {
      setGalleryPhotos(JSON.parse(savedPhotos));
    }
  };

  const menuItems: MenuItem[] = [
    { id: 'destinations', label: 'Guía de Destinos', icon: MapPin },
    { id: 'route', label: 'Ruta Embajador', icon: Route },
    { id: 'culture', label: 'Cultura', icon: Globe2 },
    { id: 'toolkit', label: 'Kit Herramientas', icon: Briefcase },
    { id: 'photofilters', label: 'Filtros y Marcos', icon: Camera },
    { id: 'rewards', label: 'Recompensas', icon: Gift },
  ];

  const handleLogout = () => {
    setIsMenuOpen(false);
    if (onLogout) {
      onLogout();
    }
  };

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleEditPhone = () => {
    setTempPhone(phoneNumber);
    setIsEditingPhone(true);
    setPhoneError('');
  };

  const handleSavePhone = () => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(tempPhone)) {
      setPhoneError('Ingresa un número válido de 10 dígitos');
      return;
    }
    setPhoneNumber(tempPhone);
    setIsEditingPhone(false);
    setPhoneError('');
  };

  const handleCancelEditPhone = () => {
    setIsEditingPhone(false);
    setTempPhone('');
    setPhoneError('');
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Show Culture Screen if active */}
      {showCulture && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <CultureScreen onBack={() => setShowCulture(false)} darkMode={darkMode} userRole={userRole} />
        </div>
      )}

      {/* Show Contact Screen if active */}
      {showContact && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <ContactScreen onBack={() => setShowContact(false)} darkMode={darkMode} userRole={userRole} />
        </div>
      )}

      {/* Show Destinations Screen if active */}
      {showDestinations && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <DestinationsScreen 
            onBack={() => setShowDestinations(false)} 
            darkMode={darkMode} 
            userRole={userRole}
            onUnlockRoute={onUnlockRoute}
            isRouteUnlocked={isRouteUnlocked}
            onUnlockToolkit={onUnlockToolkit}
            selectedDestination={selectedDestination}
            setSelectedDestination={setSelectedDestination}
          />
        </div>
      )}

      {/* Show Route Screen if active */}
      {showRoute && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <RouteScreen 
            onBack={() => {
              setShowRoute(false);
              setOpenTaskFromPending(null); // Limpiar cuando se cierra
            }} 
            onNavigateToGuide={() => {
              setShowRoute(false);
              setShowDestinations(true);
              setOpenTaskFromPending(null);
            }}
            darkMode={darkMode} 
            userRole={userRole}
            isUnlocked={isRouteUnlocked}
            selectedDestination={selectedDestination || undefined}
            openTaskId={openTaskFromPending}
          />
        </div>
      )}

      {/* Show Toolkit Screen if active */}
      {showToolkit && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <ToolkitScreen 
            onBack={() => setShowToolkit(false)} 
            darkMode={darkMode} 
            userRole={userRole}
            isUnlocked={isToolkitUnlocked}
            onUnlock={onUnlockToolkit}
          />
        </div>
      )}

      {/* Show Filters Screen if active */}
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <FiltersScreen 
            onBack={() => setShowFilters(false)} 
            darkMode={darkMode} 
            userRole={userRole}
            onNavigateToGallery={() => {
              setShowFilters(false);
              setShowGallery(true);
            }}
          />
        </div>
      )}

      {/* Show Rewards Screen if active */}
      {showRewards && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <RewardsScreen onBack={() => setShowRewards(false)} darkMode={darkMode} userRole={userRole} />
        </div>
      )}

      {/* Show Gallery Screen if active */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <GalleryScreen 
            onBack={() => setShowGallery(false)} 
            darkMode={darkMode}
            onNavigateToFilters={() => {
              setShowGallery(false);
              setShowFilters(true);
            }}
          />
        </div>
      )}

      {/* Show Notifications Screen if active */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <NotificationsScreen 
            onBack={() => setShowNotifications(false)} 
            darkMode={darkMode}
            userRole={userRole}
          />
        </div>
      )}

      {/* Header */}
      <header className={`px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowProfile(true)}
            className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
          >
            <User size={20} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
          </button>
          <div>
            <h1 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>EmbajaEspol</h1>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Todos los sistemas normales</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} relative`}
          >
            <Bell size={22} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <Settings size={22} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
          </button>
        </div>
      </header>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full">
            <div className="bg-gradient-to-br from-[#1e5a6d] to-[#2a7a91] p-6 rounded-t-3xl relative">
              <button
                onClick={() => setShowProfile(false)}
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="flex flex-col items-center text-white mt-4">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg overflow-hidden">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={48} className="text-[#1e5a6d]" />
                  )}
                </div>
                <h2 className="text-xl font-bold">Nombre y Apellido</h2>
                <p className="text-sm opacity-90 mt-1">
                  {userRole === 'estudiante' ? 'Estudiante' : 'Personal Administrativo'}
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Photo Gallery Section */}
              <div className="space-y-3">
                <label className="text-sm text-gray-500 flex items-center gap-2">
                  <Camera size={16} />
                  Galería de Fotos
                </label>
                {galleryPhotos.length > 0 ? (
                  <div>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {galleryPhotos.slice(0, 6).map((photo: any) => (
                        <div key={photo.id} className="aspect-square rounded-lg overflow-hidden shadow-sm">
                          <img 
                            src={photo.imageData} 
                            alt="Foto de galería" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        setShowProfile(false);
                        setShowGallery(true);
                      }}
                      className="w-full py-2 bg-[#1e5a6d] text-white rounded-xl hover:bg-[#2a7a91] transition-colors text-sm font-bold"
                    >
                      Ver más →
                    </button>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-8 text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Camera size={32} className="text-gray-400" />
                    </div>
                    <p className="text-gray-600 text-sm font-bold mb-1">
                      No hay fotos aún
                    </p>
                    <p className="text-gray-500 text-xs mb-3">
                      Las fotos que tomes con la aplicación aparecerán aquí
                    </p>
                    <button
                      onClick={() => {
                        setShowProfile(false);
                        setShowFilters(true);
                      }}
                      className="text-[#1e5a6d] text-sm font-bold hover:underline"
                    >
                      Ir a Filtros y Marcos
                    </button>
                  </div>
                )}
              </div>

              {/* Number of Trips Section */}
              <div className="space-y-3">
                <label className="text-sm text-gray-500 flex items-center gap-2">
                  <Plane size={16} />
                  Número de Viajes
                </label>
                <div className="bg-gradient-to-br from-[#1e5a6d] to-[#2a7a91] rounded-xl p-6 text-center">
                  <p className="text-4xl font-bold text-white mb-1">{completedTrips}</p>
                  <p className="text-sm text-white/80">viajes realizados</p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full bg-red-50 text-red-600 py-4 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut size={20} />
                <span className="font-bold">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {settingsView === 'menu' ? (
              <>
                {/* Settings Menu Header */}
                <div className="bg-gradient-to-br from-[#1e5a6d] to-[#2a7a91] p-6 rounded-t-3xl relative">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    <X size={24} />
                  </button>
                  <h2 className="text-xl font-bold text-white mt-4">Configuraciones</h2>
                </div>

                {/* Settings Menu Options */}
                <div className="p-4 space-y-2">
                  <button
                    onClick={() => setSettingsView('personal')}
                    className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#1e5a6d]/10 rounded-lg flex items-center justify-center">
                        <UserCircle size={20} className="text-[#1e5a6d]" />
                      </div>
                      <span className="font-semibold text-gray-800">Información Personal</span>
                    </div>
                    <ChevronRightIcon size={20} className="text-gray-400" />
                  </button>

                  <button
                    onClick={() => setSettingsView('contact')}
                    className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#1e5a6d]/10 rounded-lg flex items-center justify-center">
                        <Mail size={20} className="text-[#1e5a6d]" />
                      </div>
                      <span className="font-semibold text-gray-800">Contacto Relex</span>
                    </div>
                    <ChevronRightIcon size={20} className="text-gray-400" />
                  </button>

                  <button
                    onClick={() => setSettingsView('support')}
                    className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#1e5a6d]/10 rounded-lg flex items-center justify-center">
                        <HelpCircle size={20} className="text-[#1e5a6d]" />
                      </div>
                      <span className="font-semibold text-gray-800">Soporte de Aplicación</span>
                    </div>
                    <ChevronRightIcon size={20} className="text-gray-400" />
                  </button>

                  <button
                    onClick={() => setSettingsView('customize')}
                    className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#1e5a6d]/10 rounded-lg flex items-center justify-center">
                        <Settings size={20} className="text-[#1e5a6d]" />
                      </div>
                      <span className="font-semibold text-gray-800">Personalizar Cuenta</span>
                    </div>
                    <ChevronRightIcon size={20} className="text-gray-400" />
                  </button>
                </div>
              </>
            ) : settingsView === 'personal' ? (
              <>
                {/* Personal Information View */}
                <div className="bg-gradient-to-br from-[#1e5a6d] to-[#2a7a91] p-6 rounded-t-3xl relative">
                  <button
                    onClick={() => setSettingsView('menu')}
                    className="absolute top-4 left-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    <X size={24} />
                  </button>
                  <h2 className="text-xl font-bold text-white mt-4">Información Personal</h2>
                </div>

                <div className="p-6 space-y-6">
                  {/* Profile Photo */}
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User size={48} className="text-gray-600" />
                        )}
                      </div>
                      <button
                        className="absolute bottom-0 right-0 w-8 h-8 bg-[#1e5a6d] text-white rounded-full flex items-center justify-center hover:bg-[#2a7a91] transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Edit2 size={14} />
                      </button>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleProfileImageChange}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Toca para cambiar foto</p>
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500">Nombre Completo</label>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-gray-800">Nombre y Apellido</p>
                    </div>
                    <p className="text-xs text-gray-400">Este campo no se puede editar</p>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500">Correo Electrónico</label>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-gray-800">{userEmail || 'usuario@espol.edu.ec'}</p>
                    </div>
                    <p className="text-xs text-gray-400">Este campo no se puede editar</p>
                  </div>

                  {/* Matricula */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500">Número de Matrícula</label>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-gray-800">{matriculaNumber}</p>
                    </div>
                    <p className="text-xs text-gray-400">Este campo no se puede editar</p>
                  </div>

                  {/* Phone (editable) */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500">Número Celular</label>
                    {!isEditingPhone ? (
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-50 rounded-xl p-4 flex-1">
                          <p className="text-gray-800">
                            {phoneNumber || 'No registrado'}
                          </p>
                        </div>
                        <button
                          onClick={handleEditPhone}
                          className="bg-[#1e5a6d] text-white p-4 rounded-xl hover:bg-[#2a7a91] transition-colors"
                        >
                          <Edit2 size={20} />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <input
                          type="tel"
                          value={tempPhone}
                          onChange={(e) => setTempPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          placeholder="0987654321"
                          className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#1e5a6d] transition-colors"
                          maxLength={10}
                        />
                        {phoneError && (
                          <p className="text-red-500 text-xs flex items-center gap-1">
                            <AlertCircle size={14} />
                            {phoneError}
                          </p>
                        )}
                        <div className="flex gap-2">
                          <button
                            onClick={handleSavePhone}
                            className="flex-1 bg-[#1e5a6d] text-white py-3 rounded-xl hover:bg-[#2a7a91] transition-colors"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={handleCancelEditPhone}
                            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 transition-colors"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : settingsView === 'contact' ? (
              <>
                {/* Contact Relex View */}
                <div className="bg-gradient-to-br from-[#1e5a6d] to-[#2a7a91] p-6 rounded-t-3xl relative">
                  <button
                    onClick={() => setSettingsView('menu')}
                    className="absolute top-4 left-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    <X size={24} />
                  </button>
                  <h2 className="text-xl font-bold text-white mt-4">Contacto Relex</h2>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-gray-700">Contacta con Relaciones Internacionales ESPOL</p>
                  
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail size={20} className="text-[#1e5a6d]" />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-gray-800">relex@espol.edu.ec</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={20} className="text-[#1e5a6d]" />
                      <div>
                        <p className="text-xs text-gray-500">Teléfono</p>
                        <p className="text-gray-800">+593 4 226 9269</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-4">
                    Para temas académicos específicos, busca a tu coordinador por facultad.
                  </p>
                  
                  <button
                    onClick={() => {
                      setShowSettings(false);
                      setShowContact(true);
                    }}
                    className="w-full bg-gradient-to-r from-[#1e5a6d] to-[#2a7a91] text-white py-3 px-6 rounded-xl hover:opacity-90 transition-opacity font-bold"
                  >
                    Ver coordinadores por facultad →
                  </button>
                </div>
              </>
            ) : settingsView === 'support' ? (
              <>
                {/* Support View */}
                <div className="bg-gradient-to-br from-[#1e5a6d] to-[#2a7a91] p-6 rounded-t-3xl relative">
                  <button
                    onClick={() => setSettingsView('menu')}
                    className="absolute top-4 left-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    <X size={24} />
                  </button>
                  <h2 className="text-xl font-bold text-white mt-4">Soporte de Aplicación</h2>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-gray-700">¿Necesitas ayuda con la aplicación?</p>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-700 mb-3">
                      Envíanos tu consulta y te responderemos a la brevedad posible.
                    </p>
                    <div className="flex items-center gap-3">
                      <Mail size={20} className="text-[#1e5a6d]" />
                      <div>
                        <p className="text-xs text-gray-500">Email de soporte</p>
                        <p className="text-gray-800">appembaja@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : settingsView === 'customize' ? (
              <>
                {/* Customize Account View */}
                <div className="bg-gradient-to-br from-[#1e5a6d] to-[#2a7a91] p-6 rounded-t-3xl relative">
                  <button
                    onClick={() => setSettingsView('menu')}
                    className="absolute top-4 left-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    <X size={24} />
                  </button>
                  <h2 className="text-xl font-bold text-white mt-4">Personalizar Cuenta</h2>
                </div>

                <div className="p-6 space-y-4">
                  {/* Dark Mode Toggle */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Moon size={20} className="text-gray-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Modo Oscuro</p>
                        <p className="text-xs text-gray-500">Cambia el tema de la aplicación</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`w-14 h-8 rounded-full transition-colors ${
                        darkMode ? 'bg-[#1e5a6d]' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 bg-white rounded-full transition-transform ${
                          darkMode ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Notifications Toggle */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Bell size={20} className="text-gray-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Habilitar Notificaciones</p>
                        <p className="text-xs text-gray-500">Recibe alertas importantes</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                      className={`w-14 h-8 rounded-full transition-colors ${
                        notificationsEnabled ? 'bg-[#1e5a6d]' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 bg-white rounded-full transition-transform ${
                          notificationsEnabled ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pb-20 px-4 pt-6">
        {/* Menu Grid */}
        <section className="max-w-2xl mx-auto mb-8">
          <div className="grid grid-cols-3 gap-4">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'culture') {
                      setShowCulture(true);
                    } else if (item.id === 'destinations') {
                      setShowDestinations(true);
                    } else if (item.id === 'route') {
                      setOpenTaskFromPending(null); // Limpiar al abrir desde menú
                      setShowRoute(true);
                    } else if (item.id === 'toolkit') {
                      setShowToolkit(true);
                    } else if (item.id === 'photofilters') {
                      setShowFilters(true);
                    } else if (item.id === 'rewards') {
                      setShowRewards(true);
                    }
                  }}
                  className={`p-4 rounded-2xl transition-all hover:scale-105 ${
                    darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                  } shadow-sm hover:shadow-md`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-50'
                      }`}
                    >
                      <IconComponent
                        size={24}
                        className={darkMode ? 'text-gray-300' : 'text-gray-600'}
                      />
                    </div>
                    <span className={`text-xs text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Pending Tasks Section */}
        <section className="max-w-2xl mx-auto mb-8">
          <div className={`rounded-2xl shadow-sm border p-6 transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Tareas Pendientes</h2>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {isRouteUnlocked && currentPendingTask ? '1 tarea' : '0 tareas'}
              </span>
            </div>
            {isRouteUnlocked && currentPendingTask ? (
              <div>
                <button
                  onClick={() => {
                    setOpenTaskFromPending(currentPendingTask?.id || null);
                    setShowRoute(true);
                  }}
                  className={`w-full rounded-xl p-4 mb-3 transition-all cursor-pointer ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'}`}>
                      <AlertCircle size={20} className="text-yellow-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className={`font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        {currentPendingTask.title}
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Vence el {currentPendingTask.deadline}
                      </p>
                      {currentPendingTask.obligatory && (
                        <span className="inline-block bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-bold mt-2">
                          ⚠ Obligatorio
                        </span>
                      )}
                    </div>
                    <ChevronRightIcon size={20} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                  </div>
                </button>
                <button
                  onClick={() => {
                    setOpenTaskFromPending(null);
                    setShowRoute(true);
                  }}
                  className={`w-full py-3 rounded-xl font-bold transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                >
                  Ver más →
                </button>
              </div>
            ) : (
              <div className="py-6 text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <CheckCircle size={32} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                </div>
                <h3 className={`font-bold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isRouteUnlocked ? '¡Todo al día!' : 'Sin ruta activa'}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {isRouteUnlocked 
                    ? 'No tienes actividades pendientes en este momento'
                    : 'Elige un destino en "Guía de Destinos" para comenzar tu ruta'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="max-w-2xl mx-auto">
          <h2 className={`font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Reseñas de Estudiantes
          </h2>

          <div className={`rounded-2xl shadow-sm p-6 relative transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <img
                src={reviews[currentReview].flagUrl}
                alt={reviews[currentReview].country}
                className="w-12 h-12 object-cover rounded-lg shadow-sm border border-gray-200"
              />
              <div>
                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{reviews[currentReview].name}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{reviews[currentReview].country}</p>
              </div>
            </div>

            <p className={`text-center mb-4 min-h-[60px] ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {reviews[currentReview].text}
            </p>

            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: reviews[currentReview].rating }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">
                  ⭐
                </span>
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevReview}
                className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <ChevronLeft size={24} className={darkMode ? 'text-gray-300' : 'text-gray-800'} />
              </button>

              <div className="flex gap-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReview(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentReview ? 'bg-[#1e5a6d]' : darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextReview}
                className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <ChevronRight size={24} className={darkMode ? 'text-gray-300' : 'text-gray-800'} />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Chatbot */}
      <div className="fixed bottom-6 left-6 z-50">
        {isChatOpen && (
          <div className="mb-4 bg-white rounded-2xl shadow-2xl w-80 h-96 flex flex-col">
            <div className="bg-[#1e5a6d] text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <span className="font-bold">Asistente Virtual</span>
              </div>
              <button onClick={() => setIsChatOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              <div className="bg-gray-100 rounded-lg p-3 mb-3">
                <p className="text-sm">
                  ¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?
                </p>
              </div>

              {/* Quick Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setShowRoute(true);
                    setIsChatOpen(false);
                  }}
                  className="w-full bg-white border border-gray-300 rounded-full py-3 px-4 hover:bg-gray-50 transition-all text-left flex items-center gap-3"
                >
                  <Map className="text-gray-600" size={20} />
                  <span className="text-sm text-gray-700">Ruta del Embajador</span>
                </button>

                <button
                  onClick={() => {
                    setShowDestinations(true);
                    setIsChatOpen(false);
                  }}
                  className="w-full bg-white border border-gray-300 rounded-full py-3 px-4 hover:bg-gray-50 transition-all text-left flex items-center gap-3"
                >
                  <Globe className="text-gray-600" size={20} />
                  <span className="text-sm text-gray-700">Guía de Destinos</span>
                </button>

                <button
                  onClick={() => {
                    setShowToolkit(true);
                    setIsChatOpen(false);
                  }}
                  className="w-full bg-white border border-gray-300 rounded-full py-3 px-4 hover:bg-gray-50 transition-all text-left flex items-center gap-3"
                >
                  <Wrench className="text-gray-600" size={20} />
                  <span className="text-sm text-gray-700">Kit de Herramientas</span>
                </button>

                <button
                  onClick={() => {
                    setShowRewards(true);
                    setIsChatOpen(false);
                  }}
                  className="w-full bg-white border border-gray-300 rounded-full py-3 px-4 hover:bg-gray-50 transition-all text-left flex items-center gap-3"
                >
                  <Award className="text-gray-600" size={20} />
                  <span className="text-sm text-gray-700">Recompensas</span>
                </button>
              </div>
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 px-4 py-2 border rounded-full outline-none focus:border-[#1e5a6d]"
                />
                <button className="bg-[#1e5a6d] text-white px-4 py-2 rounded-full hover:bg-[#2a7a91] transition-colors">
                  Enviar
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 bg-[#1e5a6d] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#2a7a91] transition-all hover:scale-110"
        >
          {isChatOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>
    </div>
  );
}