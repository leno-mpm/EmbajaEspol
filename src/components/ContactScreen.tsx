import { ChevronLeft, Mail, Globe, Instagram, User } from 'lucide-react';

interface ContactScreenProps {
  onBack: () => void;
  darkMode?: boolean;
  userRole?: string;
}

export function ContactScreen({ onBack, darkMode = false, userRole = 'student' }: ContactScreenProps) {
  const coordinators = [
    {
      faculty: 'FIEC',
      fullName: 'Facultad de Ingeniería en Electricidad y Computación',
      coordinator: 'Msig. Rayner Durango E.',
      email: 'rdurango@espol.edu.ec',
      color: 'blue'
    },
    {
      faculty: 'FIMCP',
      fullName: 'Facultad de Ingeniería en Mecánica y Ciencias de la Producción',
      coordinator: 'PhD. María Elena Murrieta',
      email: 'mmurriet@espol.edu.ec',
      color: 'purple'
    },
    {
      faculty: 'FCSH',
      fullName: 'Facultad de Ciencias Sociales y Humanísticas',
      coordinator: 'MSc. Claudia Márquez',
      email: 'memarquez@espol.edu.ec',
      color: 'amber'
    },
    {
      faculty: 'FCNM',
      fullName: 'Facultad de Ciencias Naturales y Matemáticas',
      coordinator: 'MSc. Alejandro Carrión Torres',
      email: 'icarrion@espol.edu.ec',
      color: 'indigo'
    },
    {
      faculty: 'FCV',
      fullName: 'Facultad de Ciencias de la Vida',
      coordinator: 'MSc. Carolina Herrera Burneo',
      email: 'caroherr@espol.edu.ec',
      color: 'green'
    },
    {
      faculty: 'FICT',
      fullName: 'Facultad de Ingeniería en Ciencias de la Tierra',
      coordinator: 'MSc. Freddy Carrión Maldonado',
      email: 'fpcarrio@espol.edu.ec',
      color: 'orange'
    },
    {
      faculty: 'FIMCM',
      fullName: 'Facultad de Ingeniería Marítima y Ciencias del Mar',
      coordinator: 'Ing. Rafael Gonzalez Muñoz',
      email: 'rafdgonz@espol.edu.ec',
      color: 'teal'
    },
    {
      faculty: 'FADCOM',
      fullName: 'Facultad de Arte, Diseño y Comunicación Audiovisual',
      coordinator: 'MSc. Ronald William Villafuerte',
      email: 'rvillafu@espol.edu.ec',
      color: 'pink'
    },
    {
      faculty: 'ESPAE',
      fullName: 'Graduate School of Management',
      coordinator: 'Ing., MAE. Javier Burgos Yambay',
      email: 'jmburgos@espol.edu.ec',
      color: 'cyan'
    }
  ];

  const getColorClass = (color: string, type: 'bg' | 'text') => {
    const colors: Record<string, { bg: string; text: string }> = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600' },
      amber: { bg: 'bg-amber-50', text: 'text-amber-600' },
      indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600' },
      green: { bg: 'bg-green-50', text: 'text-green-600' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-600' },
      teal: { bg: 'bg-teal-50', text: 'text-teal-600' },
      pink: { bg: 'bg-pink-50', text: 'text-pink-600' },
      cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600' }
    };

    return type === 'bg' ? colors[color].bg : colors[color].text;
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
        <h1 className={`ml-2 font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Contacto Relex</h1>
      </header>

      <main className="px-4 py-6 max-w-3xl mx-auto space-y-6 pb-8">
        {/* Header Section */}
        <div className={`rounded-2xl p-6 text-center shadow-lg ${darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-[#1e5a6d] to-[#2a7a91]'}`}>
          <Mail size={48} className="mx-auto mb-4 text-white" />
          <h2 className="text-2xl font-bold text-white mb-2">Relaciones Externas ESPOL</h2>
          <p className="text-white/90 text-sm mb-4">Coordinación de Movilidad Estudiantil</p>
          
          {/* Social Links */}
          <div className="flex justify-center gap-4 mt-4">
            <a
              href="https://www.relacionesexternas.espol.edu.ec/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors backdrop-blur-sm"
            >
              <Globe size={18} />
              <span className="text-sm">Sitio Web</span>
            </a>
            <a
              href="https://www.instagram.com/relexespol/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors backdrop-blur-sm"
            >
              <Instagram size={18} />
              <span className="text-sm">Instagram</span>
            </a>
          </div>
        </div>

        {/* Description */}
        <div className={`rounded-xl p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <p className={`text-sm text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Cada facultad cuenta con un coordinador de movilidad dedicado a apoyarte en tu proceso de intercambio académico internacional.
          </p>
        </div>

        {/* Coordinators List */}
        <div className="space-y-3">
          <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
            Coordinadores por Facultad
          </h3>
          
          {coordinators.map((coord, index) => (
            <div
              key={index}
              className={`rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className={`p-4 ${darkMode ? 'bg-gray-700/50' : getColorClass(coord.color, 'bg')}`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-white'} shadow-sm`}>
                    <User size={20} className={darkMode ? 'text-gray-300' : getColorClass(coord.color, 'text')} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {coord.faculty}
                      </span>
                    </div>
                    <p className={`text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {coord.fullName}
                    </p>
                    <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} mb-2`}>
                      <p className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Coordinador:
                      </p>
                      <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {coord.coordinator}
                      </p>
                    </div>
                    <a
                      href={`mailto:${coord.email}`}
                      className={`flex items-center gap-2 text-xs transition-colors ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                    >
                      <Mail size={14} />
                      {coord.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className={`rounded-xl p-4 ${darkMode ? 'bg-gray-800 border-2 border-gray-700' : 'bg-blue-50 border-2 border-blue-200'}`}>
          <p className={`text-xs text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            💡 <strong>Tip:</strong> Contacta al coordinador de tu facultad para recibir orientación personalizada sobre programas de movilidad estudiantil.
          </p>
        </div>
      </main>
    </div>
  );
}