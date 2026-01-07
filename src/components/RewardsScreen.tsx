import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Star, CheckCircle2, ChevronRight, Upload, X, Image as ImageIcon, FileText, Check, FileCheck, Award, Users, BarChart3, Trophy, GraduationCap, Mic2, Globe, Calendar, Handshake, Coins } from 'lucide-react';

interface RewardsScreenProps {
  onBack: () => void;
  darkMode?: boolean;
  userRole?: string;
}

// Tipos de datos
interface Mission {
  id: string;
  title: string;
  description: string;
  coins: number;
  icon: string;
  iconBg: string;
  progress?: number;
  maxProgress?: number;
  status: 'active' | 'available' | 'completed';
  requirements?: string[];
  requirementStatus?: ('pending' | 'completed' | 'rejected')[]; // Estado de cada requisito
  evidence?: {
    type: 'image' | 'document';
    data: string;
    name: string;
  } | null;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  coins: number;
  image: string;
}

interface NewMission {
  id: string;
  title: string;
  description: string;
  coins: number;
  icon: string;
  iconBg: string;
  requirements: string[];
}

export function RewardsScreen({ onBack, darkMode = false, userRole = 'estudiante' }: RewardsScreenProps) {
  const [currentView, setCurrentView] = useState<'main' | 'rewards' | 'newMissions'>('main');
  const [userCoins, setUserCoins] = useState(1250);
  const [activeMissions, setActiveMissions] = useState<Mission[]>([]);
  const [availableMissions, setAvailableMissions] = useState<NewMission[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [showMissionDetail, setShowMissionDetail] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingEvidence, setUploadingEvidence] = useState(false);
  const [completedRewards, setCompletedRewards] = useState<string[]>([]);

  // Cargar datos iniciales
  useEffect(() => {
    loadCoinsFromStorage();
    loadMissionsData();
    loadRewardsData();
    loadCompletedRewards();
  }, [userRole]);

  const loadCoinsFromStorage = () => {
    const savedCoins = localStorage.getItem('userCoins');
    if (savedCoins) {
      setUserCoins(parseInt(savedCoins, 10));
    }
  };

  const loadMissionsData = () => {
    // Misiones activas (en progreso)
    if (userRole === 'estudiante') {
      setActiveMissions([
        {
          id: '1',
          title: 'Participa en conferencia internacional',
          description: 'Asiste y participa activamente en una conferencia académica internacional relacionada con tu campo de estudio',
          coins: 150,
          icon: 'FileCheck',
          iconBg: 'bg-gray-100',
          progress: 0,
          maxProgress: 100,
          status: 'active',
          requirements: [
            'Registrarte oficialmente en la conferencia',
            'Asistir al menos a 3 ponencias diferentes',
            'Hacer networking con mínimo 5 profesionales del área',
            'Subir certificado de asistencia y fotos del evento'
          ],
          requirementStatus: ['pending', 'pending', 'pending', 'pending'],
          evidence: null
        },
        {
          id: '2',
          title: 'Completa memorando académico',
          description: 'Trabaja con el plan de embajador y completa tu memorando de entendimiento académico con la universidad destino',
          coins: 150,
          icon: 'FileText',
          iconBg: 'bg-gray-100',
          progress: 75,
          maxProgress: 100,
          status: 'active',
          requirements: [
            'Contactar con el coordinador académico',
            'Seleccionar materias equivalentes',
            'Obtener aprobación del plan de estudios',
            'Firmar el memorando de entendimiento'
          ],
          requirementStatus: ['completed', 'completed', 'completed', 'pending'],
          evidence: null
        },
        {
          id: '3',
          title: 'Publica investigación internacional',
          description: 'Colabora en una publicación científica con investigadores de la universidad de destino',
          coins: 200,
          icon: 'BarChart3',
          iconBg: 'bg-gray-100',
          status: 'active',
          progress: 30,
          maxProgress: 100,
          requirements: [
            'Unirte a un grupo de investigación',
            'Contribuir con datos o análisis',
            'Co-escribir artículo científico',
            'Someter paper a revista indexada'
          ],
          requirementStatus: ['completed', 'rejected', 'pending', 'pending'],
          evidence: null
        },
        {
          id: '4',
          title: 'Competencia internacional durante movilidad',
          description: 'Participa en una competencia académica, deportiva o cultural representando a EmbajaEspol',
          coins: 250,
          icon: 'Trophy',
          iconBg: 'bg-gray-100',
          status: 'active',
          progress: 0,
          maxProgress: 100,
          requirements: [
            'Inscribirte en la competencia',
            'Entrenar o prepararte adecuadamente',
            'Representar a ESPOL dignamente',
            'Documentar tu participación con fotos y certificados'
          ],
          requirementStatus: ['pending', 'pending', 'pending', 'pending'],
          evidence: null
        }
      ]);

      // Misiones disponibles (nuevas)
      setAvailableMissions([
        {
          id: 'new1',
          title: 'Programa embajador EmbajaEspol',
          description: 'Conviértete en embajador oficial de EmbajaEspol en tu universidad de destino y representa activamente los valores de nuestra institución',
          coins: 200,
          icon: 'GraduationCap',
          iconBg: 'bg-gray-100',
          requirements: [
            'Asistir a capacitaciones de embajadores',
            'Representar a EmbajaEspol en al menos 3 eventos internacionales',
            'Crear contenido sobre tu experiencia en redes sociales',
            'Publicar un informe mensual de actividades'
          ]
        },
        {
          id: 'new2',
          title: 'Expositor en congreso extranjero',
          description: 'Presenta tu investigación o proyecto en un congreso académico internacional y comparte tus avances en un contexto multicultural',
          coins: 300,
          icon: 'Mic2',
          iconBg: 'bg-gray-100',
          requirements: [
            'Preparar ponencia internacional',
            'Publicar abstract en congreso internacional',
            'Presentar investigación ante audiencia extranjera',
            'Documentar experiencia con fotos y certificado'
          ]
        }
      ]);
    } else {
      // Misiones para personal administrativo
      setActiveMissions([
        {
          id: '1',
          title: 'Coordinar programa de intercambio',
          description: 'Gestionar acuerdos con universidades internacionales',
          coins: 200,
          icon: 'Handshake',
          iconBg: 'bg-gray-100',
          status: 'active',
          progress: 50,
          maxProgress: 100,
          requirements: [
            'Identificar universidades potenciales',
            'Establecer contacto con instituciones',
            'Negociar términos del convenio',
            'Firmar acuerdo de cooperación'
          ],
          requirementStatus: ['completed', 'completed', 'pending', 'pending'],
          evidence: null
        },
        {
          id: '2',
          title: 'Organizar conferencia internacional',
          description: 'Planificar evento con instituciones internacionales',
          coins: 300,
          icon: 'Calendar',
          iconBg: 'bg-gray-100',
          status: 'active',
          progress: 20,
          maxProgress: 100,
          requirements: [
            'Definir temática y objetivos',
            'Invitar ponentes internacionales',
            'Coordinar logística del evento',
            'Ejecutar conferencia exitosamente'
          ],
          requirementStatus: ['pending', 'pending', 'pending', 'pending'],
          evidence: null
        }
      ]);

      setAvailableMissions([
        {
          id: 'new1',
          title: 'Establecer convenios internacionales',
          description: 'Crear alianzas estratégicas con universidades de prestigio internacional',
          coins: 350,
          icon: 'Globe',
          iconBg: 'bg-gray-100',
          requirements: [
            'Identificar universidades objetivo',
            'Preparar propuestas de convenio',
            'Realizar reuniones con instituciones',
            'Firmar acuerdos de cooperación'
          ]
        }
      ]);
    }
  };

  const loadRewardsData = () => {
    if (userRole === 'estudiante') {
      setRewards([
        {
          id: 'r1',
          title: 'Beca Parcial Intercambio',
          description: 'Accede a beca para tu próximo programa de intercambio',
          coins: 500,
          image: 'https://images.unsplash.com/photo-1564113922537-3c393a0e55fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2VydGlmaWNhdGUlMjBhd2FyZHxlbnwxfHx8fDE3NjU1NjgxOTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          id: 'r2',
          title: 'Certificación Internacional',
          description: 'Accede a certificados en plataformas educativas globales',
          coins: 400,
          image: 'https://images.unsplash.com/photo-1564113922537-3c393a0e55fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2VydGlmaWNhdGUlMjBhd2FyZHxlbnwxfHx8fDE3NjU1NjgxOTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          id: 'r3',
          title: 'Boleto a Conferencia Global',
          description: 'Boleto gratuito para asistir a conferencia internacional',
          coins: 1000,
          image: 'https://images.unsplash.com/photo-1743064259462-7232c1fb9dc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwZXZlbnQlMjB0aWNrZXR8ZW58MXx8fHwxNzY1NTY4MTk4fDA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          id: 'r4',
          title: 'Pasantía Internacional',
          description: 'Accede a programa de pasantías en empresa extranjera',
          coins: 1500,
          image: 'https://images.unsplash.com/photo-1706920102507-3f6a8ce88acb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJsaW5lJTIwcGxhbmUlMjB0aWNrZXR8ZW58MXx8fHwxNzY1NTY4MjA4fDA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          id: 'r5',
          title: 'Kit de Viaje EmbajaEspol',
          description: 'Maleta, adaptadores y accesorios de viaje oficiales',
          coins: 800,
          image: 'https://images.unsplash.com/photo-1764909262009-3dcd5691185c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBraXQlMjBlc3NlbnRpYWxzfGVufDF8fHx8MTc2NTU2ODIwNXww&ixlib=rb-4.1.0&q=80&w=1080'
        }
      ]);
    } else {
      setRewards([
        {
          id: 'r1',
          title: 'Viaje a Conferencia Académica',
          description: 'Viaje todo incluido a conferencia internacional',
          coins: 2000,
          image: 'https://images.unsplash.com/photo-1706920102507-3f6a8ce88acb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJsaW5lJTIwcGxhbmUlMjB0aWNrZXR8ZW58MXx8fHwxNzY1NTY4MjA4fDA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          id: 'r2',
          title: 'Capacitación Internacional',
          description: 'Accede a programa de capacitación en el extranjero',
          coins: 1500,
          image: 'https://images.unsplash.com/photo-1564113922537-3c393a0e55fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2VydGlmaWNhdGUlMjBhd2FyZHxlbnwxfHx8fDE3NjU1NjgxOTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
        }
      ]);
    }
  };

  const loadCompletedRewards = () => {
    const savedRewards = localStorage.getItem('completedRewards');
    if (savedRewards) {
      setCompletedRewards(JSON.parse(savedRewards));
    }
  };

  const handleRedeemReward = (reward: Reward) => {
    if (userCoins >= reward.coins) {
      const newCoins = userCoins - reward.coins;
      setUserCoins(newCoins);
      localStorage.setItem('userCoins', String(newCoins));
      setCompletedRewards([...completedRewards, reward.id]);
      localStorage.setItem('completedRewards', JSON.stringify([...completedRewards, reward.id]));
      alert(`¡Has canjeado: ${reward.title}!`);
    } else {
      alert('No tienes suficientes coins para este premio');
    }
  };

  const handleAcceptMission = (mission: NewMission) => {
    // Agregar a misiones activas
    const newActiveMission: Mission = {
      id: mission.id,
      title: mission.title,
      description: mission.description,
      coins: mission.coins,
      icon: mission.icon,
      iconBg: mission.iconBg,
      status: 'active',
      progress: 0,
      maxProgress: 100,
      requirements: mission.requirements,
      requirementStatus: mission.requirements.map(() => 'pending'),
      evidence: null
    };
    
    setActiveMissions([...activeMissions, newActiveMission]);
    setAvailableMissions(availableMissions.filter(m => m.id !== mission.id));
    alert('¡Misión aceptada! Ahora aparecerá en tus misiones activas');
  };

  const handleMissionClick = (mission: Mission) => {
    setSelectedMission(mission);
    setShowMissionDetail(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedMission) {
      setUploadingEvidence(true);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const evidence = {
          type: file.type.startsWith('image/') ? 'image' as const : 'document' as const,
          data: reader.result as string,
          name: file.name
        };

        // Actualizar la misión con la evidencia
        const updatedMissions = activeMissions.map(m => 
          m.id === selectedMission.id 
            ? { ...m, evidence, progress: Math.min((m.progress || 0) + 20, m.maxProgress || 100) }
            : m
        );
        
        setActiveMissions(updatedMissions);
        setSelectedMission({ ...selectedMission, evidence });
        setUploadingEvidence(false);
        alert('¡Evidencia subida exitosamente!');
      };
      
      reader.readAsDataURL(file);
    }
  };

  // Helper function para renderizar iconos
  const renderMissionIcon = (iconName: string, darkMode: boolean = false) => {
    const iconClass = darkMode ? 'text-gray-400' : 'text-gray-600';
    const size = 24;
    
    switch(iconName) {
      case 'FileCheck':
        return <FileCheck size={size} className={iconClass} />;
      case 'FileText':
        return <FileText size={size} className={iconClass} />;
      case 'BarChart3':
        return <BarChart3 size={size} className={iconClass} />;
      case 'Trophy':
        return <Trophy size={size} className={iconClass} />;
      case 'GraduationCap':
        return <GraduationCap size={size} className={iconClass} />;
      case 'Mic2':
        return <Mic2 size={size} className={iconClass} />;
      case 'Handshake':
        return <Handshake size={size} className={iconClass} />;
      case 'Calendar':
        return <Calendar size={size} className={iconClass} />;
      case 'Globe':
        return <Globe size={size} className={iconClass} />;
      case 'Award':
        return <Award size={size} className={iconClass} />;
      default:
        return <FileCheck size={size} className={iconClass} />;
    }
  };

  // Vista principal
  const renderMainView = () => (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} px-4 py-3 flex items-center shadow-sm`}>
        <button
          onClick={onBack}
          className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <ChevronLeft size={24} className={darkMode ? 'text-gray-300' : 'text-gray-800'} />
        </button>
        <h1 className={`ml-2 font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Premios</h1>
      </header>

      <div className="p-4 space-y-4">
        {/* Coins Card */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100'} ${darkMode ? 'border-2' : ''} rounded-2xl p-5`}>
          <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tus Puntos</p>
          <div className="flex items-center gap-2 mb-1">
            <Coins className="text-orange-500" size={24} />
            <span className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{userCoins}</span>
          </div>
          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>Completa misiones para ganar más puntos</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setCurrentView('newMissions')}
            className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl p-3 hover:shadow-md transition-all`}
          >
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <FileText size={22} className="text-gray-600" />
              </div>
              <span className={`text-sm text-center font-bold ${darkMode ? 'text-white' : 'text-gray-700'}`}>Misiones</span>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Ver nuevas</p>
            </div>
          </button>
          
          <button
            onClick={() => setCurrentView('rewards')}
            className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl p-3 hover:shadow-md transition-all`}
          >
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <Award size={22} className="text-gray-600" />
              </div>
              <span className={`text-sm text-center font-bold ${darkMode ? 'text-white' : 'text-gray-700'}`}>Recompensas</span>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Ver recompensas</p>
            </div>
          </button>
        </div>

        {/* Active Missions Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Mis Misiones</h2>
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle2 size={16} />
              <span className="text-sm font-bold">{activeMissions.filter(m => m.status === 'active').length}</span>
            </div>
          </div>

          <div className="space-y-3">
            {activeMissions.map((mission) => (
              <button
                key={mission.id}
                onClick={() => handleMissionClick(mission)}
                className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl p-4 hover:shadow-md transition-all w-full text-left`}
              >
                <div className="flex items-start gap-3">
                  <div className={`${mission.iconBg} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    {renderMissionIcon(mission.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold mb-1 line-clamp-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {mission.title}
                    </h3>
                    {mission.description && (
                      <p className={`text-sm mb-2 line-clamp-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {mission.description}
                      </p>
                    )}
                    {mission.progress !== undefined && mission.maxProgress && (
                      <div className="mt-3">
                        <div className="bg-gray-200 rounded-full h-2 overflow-hidden mb-2">
                          <div 
                            className="bg-green-500 h-full rounded-full transition-all"
                            style={{ width: `${(mission.progress / mission.maxProgress) * 100}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">
                            {mission.requirements && mission.requirementStatus
                              ? (() => {
                                  const completed = mission.requirementStatus.filter(s => s === 'completed').length;
                                  const totalValid = mission.requirementStatus.filter(s => s !== 'rejected').length;
                                  return `${completed} de ${totalValid} requisitos completados`;
                                })()
                              : `${Math.round((mission.progress / mission.maxProgress) * 100)}% completado`
                            }
                          </p>
                          <p className="text-xs font-bold text-gray-600">
                            {mission.requirements && mission.requirementStatus
                              ? (() => {
                                  const completed = mission.requirementStatus.filter(s => s === 'completed').length;
                                  const totalValid = mission.requirementStatus.filter(s => s !== 'rejected').length;
                                  return `${Math.round((completed / totalValid) * 100)}%`;
                                })()
                              : `${Math.round((mission.progress / mission.maxProgress) * 100)}%`
                            }
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <div className="flex items-center gap-1 bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                      <span className="text-sm">🪙</span>
                      <span className="font-bold text-sm">{mission.coins}</span>
                    </div>
                    <ChevronRight size={20} className={darkMode ? 'text-gray-400' : 'text-gray-400'} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Detail Modal */}
      {showMissionDetail && selectedMission && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-3xl max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col`}>
            {/* Modal Header */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex-shrink-0`}>
              <div className="flex items-center justify-between">
                <h2 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Detalle de Misión</h2>
                <button
                  onClick={() => setShowMissionDetail(false)}
                  className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <X size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                </button>
              </div>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto">
              {/* Mission Icon and Title */}
              <div className="flex items-start gap-3">
                <div className={`${selectedMission.iconBg} w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  {renderMissionIcon(selectedMission.icon)}
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {selectedMission.title}
                  </h3>
                  <div className="flex items-center gap-1 bg-orange-100 text-orange-600 px-3 py-1 rounded-full w-fit">
                    <Coins size={16} className="text-orange-600" />
                    <span className="font-bold">{selectedMission.coins}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className={`font-bold mb-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Descripción</h4>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {selectedMission.description}
                </p>
              </div>

              {/* Progress Bar */}
              {selectedMission.progress !== undefined && selectedMission.maxProgress && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-bold text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Progreso</h4>
                    <span className={`text-sm font-bold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {selectedMission.progress}%
                    </span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all"
                      style={{ width: `${(selectedMission.progress / selectedMission.maxProgress) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Requirements */}
              {selectedMission.requirements && selectedMission.requirements.length > 0 && (
                <div>
                  <h4 className={`font-bold mb-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Requisitos</h4>
                  <ul className={`space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {selectedMission.requirements.map((req, index) => {
                      const status = selectedMission.requirementStatus?.[index] || 'pending';
                      return (
                        <li key={index} className="flex items-start gap-2.5 text-sm">
                          {status === 'completed' && (
                            <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                          )}
                          {status === 'pending' && (
                            <span className={`mt-0.5 flex-shrink-0 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>○</span>
                          )}
                          {status === 'rejected' && (
                            <span className="text-red-500 mt-0.5 flex-shrink-0">✕</span>
                          )}
                          <span>{req}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Evidence Upload */}
              <div>
                <h4 className={`font-bold mb-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Subir Evidencia</h4>
                
                {selectedMission.evidence ? (
                  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border rounded-xl p-4`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Check size={20} className="text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>Evidencia subida</p>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{selectedMission.evidence.name}</p>
                      </div>
                    </div>
                    {selectedMission.evidence.type === 'image' && (
                      <img 
                        src={selectedMission.evidence.data} 
                        alt="Evidencia" 
                        className="w-full rounded-lg"
                      />
                    )}
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*,.pdf,.doc,.docx"
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingEvidence}
                      className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'} border-2 border-dashed rounded-xl p-6 hover:bg-gray-100 transition-colors flex flex-col items-center gap-2`}
                    >
                      <Upload size={32} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                      <p className={`font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {uploadingEvidence ? 'Subiendo...' : 'Subir archivo'}
                      </p>
                      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        Imágenes, PDF o documentos
                      </p>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Vista de recompensas
  const renderRewardsView = () => (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} px-4 py-3 flex items-center shadow-sm`}>
        <button
          onClick={() => setCurrentView('main')}
          className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <ChevronLeft size={24} className={darkMode ? 'text-gray-300' : 'text-gray-800'} />
        </button>
        <h1 className={`ml-2 font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Recompensas</h1>
      </header>

      <div className="p-4 space-y-4">
        {/* Available Points */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-2xl p-4`}>
          <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tus Puntos Disponibles</p>
          <div className="flex items-center gap-2">
            <Coins className="text-orange-500" size={20} />
            <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{userCoins}</span>
          </div>
        </div>

        {/* Rewards List */}
        <div className="space-y-3">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl p-4 hover:shadow-md transition-all`}
            >
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                  <img 
                    src={reward.image} 
                    alt={reward.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {reward.title}
                  </h3>
                  <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {reward.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                      <Coins size={14} className="text-orange-600" />
                      <span className="font-bold text-sm">{reward.coins}</span>
                    </div>
                    <button
                      onClick={() => handleRedeemReward(reward)}
                      disabled={userCoins < reward.coins || completedRewards.includes(reward.id)}
                      className={`${
                        userCoins >= reward.coins && !completedRewards.includes(reward.id)
                          ? darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'
                          : 'bg-gray-300'
                      } ${userCoins >= reward.coins && !completedRewards.includes(reward.id) ? 'text-white' : 'text-gray-500 cursor-not-allowed'} px-4 py-1.5 rounded-xl transition-all text-sm`}
                    >
                      Canjear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Vista de nuevas misiones
  const renderNewMissionsView = () => (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} px-4 py-3 flex items-center shadow-sm`}>
        <button
          onClick={() => setCurrentView('main')}
          className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <ChevronLeft size={24} className={darkMode ? 'text-gray-300' : 'text-gray-800'} />
        </button>
        <h1 className={`ml-2 font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Nuevas Misiones</h1>
      </header>

      <div className="p-4 space-y-4">
        {/* Header Info */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-2xl p-4`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {availableMissions.length} {availableMissions.length === 1 ? 'misión disponible' : 'misiones disponibles'}
          </p>
        </div>

        {/* Available Missions */}
        <div className="space-y-3">
          {availableMissions.map((mission) => (
            <div
              key={mission.id}
              className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl p-4 hover:shadow-md transition-all`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`${mission.iconBg} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  {renderMissionIcon(mission.icon)}
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {mission.title}
                  </h3>
                  <div className="flex items-center gap-1 bg-orange-100 text-orange-600 px-3 py-1 rounded-full w-fit">
                    <Coins size={16} className="text-orange-600" />
                    <span className="font-bold text-sm">{mission.coins}</span>
                  </div>
                </div>
              </div>

              <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {mission.description}
              </p>

              <div className="mb-3">
                <p className={`text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Requisitos:
                </p>
                <ul className={`text-sm space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {mission.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleAcceptMission(mission)}
                className={`w-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'} text-white py-2.5 rounded-xl transition-all`}
              >
                Aceptar Misión
              </button>
            </div>
          ))}
        </div>

        {availableMissions.length === 0 && (
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 text-center`}>
            <div className="text-6xl mb-4">🎯</div>
            <h3 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              No hay nuevas misiones
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Completa tus misiones activas para desbloquear más
            </p>
          </div>
        )}
      </div>
    </div>
  );

  // Render condicional basado en la vista actual
  if (currentView === 'rewards') {
    return renderRewardsView();
  } else if (currentView === 'newMissions') {
    return renderNewMissionsView();
  } else {
    return renderMainView();
  }
}