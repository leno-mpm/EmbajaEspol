import { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Music, Palette, Coffee, Mountain, Waves, TreePine, Fish, Award, BookOpen, Users, Calendar, Sparkles, GraduationCap, Flag, Building2, Trophy, Heart } from 'lucide-react';
import ecuadorFlag from "figma:asset/adb4bbe261489fcfeeac27ed3f3f2d8d20f61610.png";
import espolLogo from "figma:asset/00da882240008fd9dae1e14b641ba570f28366e1.png";

interface CultureScreenProps {
  onBack: () => void;
  darkMode?: boolean;
  userRole?: string;
}

export function CultureScreen({ onBack, darkMode = false, userRole = 'student' }: CultureScreenProps) {
  const [selectedCulture, setSelectedCulture] = useState<'espol' | 'ecuador' | null>(null);

  if (selectedCulture === null) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <header className={`px-4 py-3 flex items-center sticky top-0 z-40 shadow-sm transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <button
            onClick={onBack}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <ChevronLeft size={24} className={darkMode ? 'text-gray-300' : 'text-gray-800'} />
          </button>
          <h1 className={`ml-2 font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Cultura</h1>
        </header>

        <main className="px-4 py-8 max-w-2xl mx-auto overflow-y-auto">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Explora la Cultura
              </h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Selecciona una opción para conocer más
              </p>
            </div>

            {/* Cultura Ecuador Card */}
            <button
              onClick={() => setSelectedCulture('ecuador')}
              className={`w-full rounded-2xl overflow-hidden shadow-lg transition-all hover:scale-105 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className={`p-8 text-white flex items-center justify-center ${darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-slate-600 to-slate-700'}`}>
                <div className="flex items-center justify-center gap-3 mb-3">
                  <img src={ecuadorFlag} alt="Bandera de Ecuador" className="w-20 h-14 object-cover rounded-lg shadow-md" />
                </div>
              </div>
              <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className={`text-2xl font-bold text-center mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Cultura Ecuador</h3>
                <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Descubre las tradiciones, historia, geografía y arte del Ecuador
                </p>
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-blue-500" />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Geografía</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coffee size={18} className="text-amber-600" />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Gastronomía</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Music size={18} className="text-purple-500" />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Música</span>
                  </div>
                </div>
              </div>
            </button>

            {/* Cultura ESPOL Card */}
            <button
              onClick={() => setSelectedCulture('espol')}
              className={`w-full rounded-2xl overflow-hidden shadow-lg transition-all hover:scale-105 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className={`p-8 flex items-center justify-center ${darkMode ? 'bg-gradient-to-br from-gray-600 to-gray-700' : 'bg-gradient-to-br from-slate-500 to-slate-600'}`}>
                <div className="flex items-center justify-center gap-3 mb-3">
                  <img src={espolLogo} alt="Logo ESPOL" className="w-24 h-24 object-contain brightness-0 invert" />
                </div>
              </div>
              <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className={`text-2xl font-bold text-center mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Cultura ESPOL</h3>
                <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Conoce la historia, tradiciones y vida politécnica de ESPOL
                </p>
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <Building2 size={18} className="text-[#1e5a6d]" />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Historia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-[#1e5a6d]" />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Vida Estudiantil</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy size={18} className="text-[#1e5a6d]" />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tradiciones</span>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (selectedCulture === 'ecuador') {
    return <CulturaEcuador onBack={() => setSelectedCulture(null)} darkMode={darkMode} />;
  }

  return <CulturaEspol onBack={() => setSelectedCulture(null)} darkMode={darkMode} />;
}

// Cultura Ecuador Component
function CulturaEcuador({ onBack, darkMode }: { onBack: () => void; darkMode: boolean }) {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <header className={`px-4 py-3 flex items-center sticky top-0 z-40 shadow-sm transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <button
          onClick={onBack}
          className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <ChevronLeft size={24} className={darkMode ? 'text-gray-300' : 'text-gray-800'} />
        </button>
        <h1 className={`ml-2 font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>🇪🇨 Cultura Ecuador</h1>
      </header>

      <main className="px-4 py-6 max-w-3xl mx-auto space-y-4 pb-8">
        {/* Header Section */}
        <div className={`rounded-2xl p-6 text-center shadow-lg ${darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-slate-600 to-slate-700'}`}>
          <img src={ecuadorFlag} alt="Bandera de Ecuador" className="w-32 h-24 object-cover rounded-lg shadow-lg mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">República del Ecuador</h2>
          <p className="text-white/90 text-sm">País de las cuatro regiones y megadiverso</p>
        </div>

        {/* Geografía y Regiones - Collapsible */}
        <section className={`rounded-2xl shadow-sm overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <button
            onClick={() => toggleSection('geografia')}
            className={`w-full p-4 flex items-center justify-between hover:bg-opacity-80 transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
          >
            <h3 className={`font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <MapPin className="text-blue-500" size={20} />
              Geografía y Regiones
            </h3>
            <ChevronRight 
              size={20} 
              className={`transition-transform duration-300 ${expandedSections.includes('geografia') ? 'rotate-90' : ''} ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            />
          </button>
          {expandedSections.includes('geografia') && (
            <div className="px-4 pb-4 space-y-3">
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Waves size={20} className="text-blue-500" />
                  <h4 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>Costa</h4>
                </div>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Playas hermosas, clima cálido, cuna del banano y cacao. Ciudades: Guayaquil, Manta, Salinas.
                </p>
              </div>

              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Mountain size={20} className="text-green-600" />
                  <h4 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>Sierra</h4>
                </div>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Montañas andinas, volcanes, clima templado. Ciudades: Quito, Cuenca, Riobamba. Patrimonio cultural.
                </p>
              </div>

              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-emerald-50'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <TreePine size={20} className="text-emerald-600" />
                  <h4 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>Oriente (Amazonía)</h4>
                </div>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Selva amazónica, biodiversidad única, comunidades indígenas. Provincias: Pastaza, Morona Santiago.
                </p>
              </div>

              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-cyan-50'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Fish size={20} className="text-cyan-600" />
                  <h4 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>Galápagos</h4>
                </div>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Islas únicas, fauna endémica, laboratorio natural de la evolución. Patrimonio de la Humanidad.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Gastronomía - Collapsible */}
        <section className={`rounded-2xl shadow-sm overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <button
            onClick={() => toggleSection('gastronomia')}
            className={`w-full p-4 flex items-center justify-between hover:bg-opacity-80 transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
          >
            <h3 className={`font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Coffee className="text-amber-600" size={20} />
              Gastronomía Típica
            </h3>
            <ChevronRight 
              size={20} 
              className={`transition-transform duration-300 ${expandedSections.includes('gastronomia') ? 'rotate-90' : ''} ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            />
          </button>
          {expandedSections.includes('gastronomia') && (
            <div className="px-4 pb-4">
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-orange-50'}`}>
                  <span className="text-2xl mb-1 block">🍤</span>
                  <p className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-gray-800'}`}>Ceviche</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Costa</p>
                </div>
                <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
                  <span className="text-2xl mb-1 block">🍲</span>
                  <p className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-gray-800'}`}>Locro de Papa</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sierra</p>
                </div>
                <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-red-50'}`}>
                  <span className="text-2xl mb-1 block">🐷</span>
                  <p className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-gray-800'}`}>Hornado</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sierra</p>
                </div>
                <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                  <span className="text-2xl mb-1 block">🐟</span>
                  <p className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-gray-800'}`}>Maito</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Amazonía</p>
                </div>
                <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                  <span className="text-2xl mb-1 block">🍌</span>
                  <p className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-gray-800'}`}>Bolón de Verde</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Costa</p>
                </div>
                <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-pink-50'}`}>
                  <span className="text-2xl mb-1 block">🥔</span>
                  <p className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-gray-800'}`}>Llapingachos</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sierra</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Tradiciones y Fiestas - Collapsible */}
        <section className={`rounded-2xl shadow-sm overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <button
            onClick={() => toggleSection('tradiciones')}
            className={`w-full p-4 flex items-center justify-between hover:bg-opacity-80 transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
          >
            <h3 className={`font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Calendar className="text-purple-500" size={20} />
              Tradiciones y Fiestas
            </h3>
            <ChevronRight 
              size={20} 
              className={`transition-transform duration-300 ${expandedSections.includes('tradiciones') ? 'rotate-90' : ''} ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            />
          </button>
          {expandedSections.includes('tradiciones') && (
            <div className="px-4 pb-4 space-y-2">
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                <h4 className={`font-bold mb-1 text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>🌞 Inti Raymi (Junio)</h4>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Fiesta del Sol, celebración indígena del solsticio de verano con danzas y rituales.
                </p>
              </div>
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <h4 className={`font-bold mb-1 text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>🎭 Carnaval (Febrero/Marzo)</h4>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Juegos con agua, espuma y talco. Celebración alegre antes de la Cuaresma.
                </p>
              </div>
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-orange-50'}`}>
                <h4 className={`font-bold mb-1 text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>💀 Día de los Difuntos (2 Nov)</h4>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Se visita a los seres queridos fallecidos y se come la tradicional colada morada con guaguas de pan.
                </p>
              </div>
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
                <h4 className={`font-bold mb-1 text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>🎉 Fiestas de Quito (6 Dic)</h4>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Celebración de la fundación española de Quito con corridas de toros, conciertos y eventos culturales.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Arte y Música - Collapsible */}
        <section className={`rounded-2xl shadow-sm overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <button
            onClick={() => toggleSection('arte')}
            className={`w-full p-4 flex items-center justify-between hover:bg-opacity-80 transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
          >
            <h3 className={`font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Music className="text-pink-500" size={20} />
              Arte y Música
            </h3>
            <ChevronRight 
              size={20} 
              className={`transition-transform duration-300 ${expandedSections.includes('arte') ? 'rotate-90' : ''} ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            />
          </button>
          {expandedSections.includes('arte') && (
            <div className="px-4 pb-4 space-y-2">
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-pink-50'}`}>
                <h4 className={`font-bold mb-1 text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>🎵 Ritmos Tradicionales</h4>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <strong>Pasillo:</strong> música romántica de la Sierra • <strong>Bomba:</strong> ritmo afroecuatoriano del Valle del Chota • <strong>Marimba:</strong> música de Esmeraldas
                </p>
              </div>
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-indigo-50'}`}>
                <h4 className={`font-bold mb-1 text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>🎨 Artistas Destacados</h4>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Oswaldo Guayasamín (pintura), Julio Jaramillo (música), Paúl Granda (cantautor)
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Diversidad Cultural - Collapsible */}
        <section className={`rounded-2xl shadow-sm overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <button
            onClick={() => toggleSection('diversidad')}
            className={`w-full p-4 flex items-center justify-between hover:bg-opacity-80 transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
          >
            <h3 className={`font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Users className="text-green-500" size={20} />
              Diversidad Cultural
            </h3>
            <ChevronRight 
              size={20} 
              className={`transition-transform duration-300 ${expandedSections.includes('diversidad') ? 'rotate-90' : ''} ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            />
          </button>
          {expandedSections.includes('diversidad') && (
            <div className="px-4 pb-4">
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-amber-50'}`}>
                  <span className="text-xl mb-1 block">👥</span>
                  <p className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-gray-800'}`}>Mestizos</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Mayoría de población</p>
                </div>
                <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-orange-50'}`}>
                  <span className="text-xl mb-1 block">🪶</span>
                  <p className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-gray-800'}`}>Indígenas</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Quichuas, Shuar, etc</p>
                </div>
                <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
                  <span className="text-xl mb-1 block">🌾</span>
                  <p className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-gray-800'}`}>Montubios</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Costa rural</p>
                </div>
                <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-red-50'}`}>
                  <span className="text-xl mb-1 block">🎭</span>
                  <p className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-gray-800'}`}>Afroecuatorianos</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Esmeraldas, Valle del Chota</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Datos Curiosos - Collapsible */}
        <section className={`rounded-2xl shadow-sm overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <button
            onClick={() => toggleSection('curiosidades')}
            className={`w-full p-4 flex items-center justify-between hover:bg-opacity-80 transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
          >
            <h3 className={`font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Sparkles className="text-yellow-500" size={20} />
              ¿Sabías que...?
            </h3>
            <ChevronRight 
              size={20} 
              className={`transition-transform duration-300 ${expandedSections.includes('curiosidades') ? 'rotate-90' : ''} ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            />
          </button>
          {expandedSections.includes('curiosidades') && (
            <div className="px-4 pb-4 space-y-2">
              <div className={`p-3 rounded-xl flex gap-2 ${darkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
                <span className="text-xl">🌍</span>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Ecuador es el único país que lleva el nombre de una línea imaginaria: la Línea Ecuatorial.
                </p>
              </div>
              <div className={`p-3 rounded-xl flex gap-2 ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                <span className="text-xl">🐢</span>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Las Islas Galápagos inspiraron la teoría de la evolución de Charles Darwin.
                </p>
              </div>
              <div className={`p-3 rounded-xl flex gap-2 ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <span className="text-xl">🏔️</span>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  El Chimborazo es el punto más cercano al sol desde el centro de la Tierra (por el abultamiento ecuatorial).
                </p>
              </div>
              <div className={`p-3 rounded-xl flex gap-2 ${darkMode ? 'bg-gray-700' : 'bg-red-50'}`}>
                <span className="text-xl">🎩</span>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Los famosos &quot;Sombreros Panamá&quot; son en realidad ecuatorianos, originarios de Montecristi.
                </p>
              </div>
              <div className={`p-3 rounded-xl flex gap-2 ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                <span className="text-xl">🌿</span>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Ecuador es uno de los 17 países megadiversos del mundo, con más especies por km² que cualquier otro país.
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

// Cultura ESPOL Component
function CulturaEspol({ onBack, darkMode }: { onBack: () => void; darkMode: boolean }) {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <header className={`px-4 py-3 flex items-center sticky top-0 z-40 shadow-sm transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <button
          onClick={onBack}
          className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <ChevronLeft size={24} className={darkMode ? 'text-gray-300' : 'text-gray-800'} />
        </button>
        <h1 className={`ml-2 font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Cultura ESPOL</h1>
      </header>

      <main className="px-4 py-6 max-w-3xl mx-auto space-y-4 pb-8">
        {/* Header Section */}
        <div className={`rounded-2xl p-6 text-center shadow-lg ${darkMode ? 'bg-gradient-to-br from-gray-600 to-gray-700' : 'bg-gradient-to-br from-slate-500 to-slate-600'}`}>
          <img src={espolLogo} alt="Logo ESPOL" className="w-32 h-32 object-contain mx-auto mb-4 brightness-0 invert" />
          <h2 className="text-2xl font-bold text-white mb-2">ESPOL</h2>
          <p className="text-white/90 text-sm">Escuela Superior Politécnica del Litoral</p>
          <a 
            href="https://www.espol.edu.ec/es" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block mt-3 px-4 py-2 rounded-lg text-xs transition-colors bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
          >
            Visitar sitio web oficial
          </a>
        </div>

        {/* Historia - Collapsible */}
        <section className={`rounded-2xl shadow-sm overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <button
            onClick={() => toggleSection('historia')}
            className={`w-full p-4 flex items-center justify-between hover:bg-opacity-80 transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
          >
            <h3 className={`font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <BookOpen className="text-[#1e5a6d]" size={20} />
              Historia de ESPOL
            </h3>
            <ChevronRight 
              size={20} 
              className={`transition-transform duration-300 ${expandedSections.includes('historia') ? 'rotate-90' : ''} ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            />
          </button>
          {expandedSections.includes('historia') && (
            <div className="px-4 pb-4 space-y-3">
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <h4 className={`font-bold mb-1 text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>📅 Fundación</h4>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Se fundó el <strong>29 de octubre de 1958</strong> en Guayaquil, Ecuador.
                </p>
              </div>
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-teal-50'}`}>
                <h4 className={`font-bold mb-1 text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>🎯 Misión</h4>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Formar profesionales de excelencia, líderes, emprendedores con sólidos valores y compromiso social.
                </p>
              </div>
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-cyan-50'}`}>
                <h4 className={`font-bold mb-1 text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>🔭 Visión</h4>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Ser una comunidad educativa innovadora y un referente en la educación superior de América Latina.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Símbolos - Collapsible */}
        <section className={`rounded-2xl shadow-sm overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <button
            onClick={() => toggleSection('simbolos')}
            className={`w-full p-4 flex items-center justify-between hover:bg-opacity-80 transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
          >
            <h3 className={`font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Flag className="text-[#1e5a6d]" size={20} />
              Símbolos de ESPOL
            </h3>
            <ChevronRight 
              size={20} 
              className={`transition-transform duration-300 ${expandedSections.includes('simbolos') ? 'rotate-90' : ''} ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            />
          </button>
          {expandedSections.includes('simbolos') && (
            <div className="px-4 pb-4 space-y-3">
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <h4 className={`font-bold mb-1 text-sm flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  🎨 Logo y Colores
                </h4>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Azul y blanco representan el conocimiento, la verdad y la excelencia académica.
                </p>
              </div>
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                <h4 className={`font-bold mb-1 text-sm flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  🐢 Mascota
                </h4>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  La tortuga, símbolo de longevidad, sabiduría y perseverancia.
                </p>
              </div>
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                <h4 className={`font-bold mb-1 text-sm flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  🎵 Himno
                </h4>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  El himno politécnico exalta los valores de trabajo, honor y ciencia.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Vida Politécnica - Collapsible */}
        <section className={`rounded-2xl shadow-sm overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <button
            onClick={() => toggleSection('vida')}
            className={`w-full p-4 flex items-center justify-between hover:bg-opacity-80 transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
          >
            <h3 className={`font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Heart className="text-red-500" size={20} />
              Vida Politécnica
            </h3>
            <ChevronRight 
              size={20} 
              className={`transition-transform duration-300 ${expandedSections.includes('vida') ? 'rotate-90' : ''} ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            />
          </button>
          {expandedSections.includes('vida') && (
            <div className="px-4 pb-4 space-y-2">
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-red-50'}`}>
                <h4 className={`font-bold mb-1 text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>🔔 La Campanada</h4>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Tradición donde los estudiantes que se gradúan tocan la campana del campus como símbolo de culminación.
                </p>
              </div>
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-orange-50'}`}>
                <h4 className={`font-bold mb-1 text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>🎉 Bienvenida Politécnica</h4>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Evento de integración para estudiantes nuevos con actividades recreativas y culturales.
                </p>
              </div>
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
                <h4 className={`font-bold mb-1 text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>⭐ Politécnico Ejemplar</h4>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Reconocimiento a estudiantes destacados en valores, liderazgo y excelencia académica.
                </p>
              </div>
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                <h4 className={`font-bold mb-1 text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>💻 Hackathons y Ferias</h4>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Eventos de innovación, tecnología y emprendimiento organizados por facultades.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Facultades - Collapsible */}
        <section className={`rounded-2xl shadow-sm overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <button
            onClick={() => toggleSection('facultades')}
            className={`w-full p-4 flex items-center justify-between hover:bg-opacity-80 transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
          >
            <h3 className={`font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Building2 className="text-[#1e5a6d]" size={20} />
              Facultades
            </h3>
            <ChevronRight 
              size={20} 
              className={`transition-transform duration-300 ${expandedSections.includes('facultades') ? 'rotate-90' : ''} ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            />
          </button>
          {expandedSections.includes('facultades') && (
            <div className="px-4 pb-4 grid grid-cols-1 gap-2">
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <h4 className={`font-bold mb-1 text-xs ${darkMode ? 'text-white' : 'text-gray-800'}`}>💻 FIEC</h4>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Facultad de Ingeniería en Electricidad y Computación</p>
              </div>
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                <h4 className={`font-bold mb-1 text-xs ${darkMode ? 'text-white' : 'text-gray-800'}`}>⚙️ FIMCP</h4>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Facultad de Ingeniería en Mecánica y Ciencias de la Producción</p>
              </div>
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-amber-50'}`}>
                <h4 className={`font-bold mb-1 text-xs ${darkMode ? 'text-white' : 'text-gray-800'}`}>💼 FCSH</h4>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Facultad de Ciencias Sociales y Humanísticas</p>
              </div>
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-indigo-50'}`}>
                <h4 className={`font-bold mb-1 text-xs ${darkMode ? 'text-white' : 'text-gray-800'}`}>🔬 FCNM</h4>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Facultad de Ciencias Naturales y Matemáticas</p>
              </div>
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                <h4 className={`font-bold mb-1 text-xs ${darkMode ? 'text-white' : 'text-gray-800'}`}>🧬 FCV</h4>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Facultad de Ciencias de la Vida</p>
              </div>
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-orange-50'}`}>
                <h4 className={`font-bold mb-1 text-xs ${darkMode ? 'text-white' : 'text-gray-800'}`}>🏗️ FICT</h4>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Facultad de Ingeniería en Ciencias de la Tierra</p>
              </div>
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-teal-50'}`}>
                <h4 className={`font-bold mb-1 text-xs ${darkMode ? 'text-white' : 'text-gray-800'}`}>🌊 FIMCM</h4>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Facultad de Ingeniería Marítima y Ciencias del Mar</p>
              </div>
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-pink-50'}`}>
                <h4 className={`font-bold mb-1 text-xs ${darkMode ? 'text-white' : 'text-gray-800'}`}>🎨 FADCOM</h4>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Facultad de Arte, Diseño y Comunicación Audiovisual</p>
              </div>
            </div>
          )}
        </section>

        {/* Servicios - Collapsible */}
        <section className={`rounded-2xl shadow-sm overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <button
            onClick={() => toggleSection('servicios')}
            className={`w-full p-4 flex items-center justify-between hover:bg-opacity-80 transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
          >
            <h3 className={`font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Award className="text-yellow-500" size={20} />
              Programas y Servicios
            </h3>
            <ChevronRight 
              size={20} 
              className={`transition-transform duration-300 ${expandedSections.includes('servicios') ? 'rotate-90' : ''} ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            />
          </button>
          {expandedSections.includes('servicios') && (
            <div className="px-4 pb-4 space-y-2">
              <div className={`p-3 rounded-xl flex items-center gap-3 ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <BookOpen size={20} className="text-blue-500" />
                <div>
                  <h4 className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-gray-800'}`}>Bibliotecas</h4>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Recursos físicos y digitales</p>
                </div>
              </div>
              <div className={`p-3 rounded-xl flex items-center gap-3 ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                <Palette size={20} className="text-purple-500" />
                <div>
                  <h4 className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-gray-800'}`}>Laboratorios</h4>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tecnología de punta</p>
                </div>
              </div>
              <div className={`p-3 rounded-xl flex items-center gap-3 ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                <Trophy size={20} className="text-green-500" />
                <div>
                  <h4 className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-gray-800'}`}>Becas</h4>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Apoyo económico a estudiantes</p>
                </div>
              </div>
              <div className={`p-3 rounded-xl flex items-center gap-3 ${darkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
                <Heart size={20} className="text-red-500" />
                <div>
                  <h4 className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-gray-800'}`}>Bienestar Estudiantil</h4>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Apoyo psicológico y médico</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Fun Facts - Collapsible */}
        <section className={`rounded-2xl shadow-sm overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <button
            onClick={() => toggleSection('curiosidades')}
            className={`w-full p-4 flex items-center justify-between hover:bg-opacity-80 transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
          >
            <h3 className={`font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Sparkles className="text-yellow-500" size={20} />
              ¿Sabías que...?
            </h3>
            <ChevronRight 
              size={20} 
              className={`transition-transform duration-300 ${expandedSections.includes('curiosidades') ? 'rotate-90' : ''} ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            />
          </button>
          {expandedSections.includes('curiosidades') && (
            <div className="px-4 pb-4 space-y-2">
              <div className={`p-3 rounded-xl flex gap-2 ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <span className="text-xl">🏆</span>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  ESPOL es la primera universidad tecnológica del Ecuador y una de las mejores de Latinoamérica.
                </p>
              </div>
              <div className={`p-3 rounded-xl flex gap-2 ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                <span className="text-xl">🌳</span>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  El campus &quot;Gustavo Galindo Velasco&quot; tiene más de 700 hectáreas y es conocido como &quot;Prosperina&quot;.
                </p>
              </div>
              <div className={`p-3 rounded-xl flex gap-2 ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                <span className="text-xl">💡</span>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  ESPOL cuenta con su propio parque tecnológico y más de 80 centros de investigación e innovación.
                </p>
              </div>
              <div className={`p-3 rounded-xl flex gap-2 ${darkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
                <span className="text-xl">🎓</span>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Miles de politécnicos se han graduado y son líderes en empresas nacionales e internacionales.
                </p>
              </div>
              <div className={`p-3 rounded-xl flex gap-2 ${darkMode ? 'bg-gray-700' : 'bg-red-50'}`}>
                <span className="text-xl">🌎</span>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  La movilidad estudiantil permite a politécnicos estudiar en universidades de todo el mundo.
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}