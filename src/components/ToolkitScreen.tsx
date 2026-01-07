import { useState } from 'react';
import { 
  ChevronLeft, 
  Languages, 
  Globe2, 
  Users, 
  BookOpen,
  Volume2,
  CheckCircle,
  AlertTriangle,
  Info,
  Lightbulb,
  MessageCircle,
  Handshake,
  Brain,
  Target,
  Award,
  DollarSign,
  Plane,
  Home,
  Utensils,
  CreditCard
} from 'lucide-react';
import { costOfLivingDestinations, CostOfLivingDestination } from './costOfLivingData';

interface ToolkitScreenProps {
  onBack: () => void;
  darkMode?: boolean;
  userRole?: string;
  isUnlocked?: boolean;
  onUnlock?: () => void;
}

interface Language {
  id: string;
  name: string;
  flag: string;
  level: string;
  lessons: {
    id: string;
    title: string;
    description: string;
    duration: string;
    completed: boolean;
  }[];
}

interface Country {
  id: string;
  name: string;
  flag: string;
  sections: {
    laws: string[];
    customs: string[];
    emergency: {
      police: string;
      ambulance: string;
      embassy: string;
    };
    tips: string[];
  };
}

interface SoftSkill {
  id: string;
  title: string;
  icon: any;
  description: string;
  tips: string[];
  exercises: string[];
}

const languages: Language[] = [
  {
    id: 'english',
    name: 'Inglés',
    flag: '🇺🇸',
    level: 'Intermedio',
    lessons: [
      {
        id: 'en1',
        title: 'Saludos y Presentaciones',
        description: 'Aprende a presentarte y saludar en inglés',
        duration: '15 min',
        completed: false
      },
      {
        id: 'en2',
        title: 'Conversación Básica',
        description: 'Frases comunes para el día a día',
        duration: '20 min',
        completed: false
      },
      {
        id: 'en3',
        title: 'En el Campus',
        description: 'Vocabulario académico esencial',
        duration: '25 min',
        completed: false
      },
      {
        id: 'en4',
        title: 'Situaciones de Emergencia',
        description: 'Cómo pedir ayuda y comunicar problemas',
        duration: '15 min',
        completed: false
      }
    ]
  },
  {
    id: 'portuguese',
    name: 'Portugués',
    flag: '🇧🇷',
    level: 'Básico',
    lessons: [
      {
        id: 'pt1',
        title: 'Primeras Palabras',
        description: 'Vocabulario básico y pronunciación',
        duration: '15 min',
        completed: false
      },
      {
        id: 'pt2',
        title: 'Vida Cotidiana',
        description: 'Expresiones para el día a día',
        duration: '20 min',
        completed: false
      },
      {
        id: 'pt3',
        title: 'En la Universidad',
        description: 'Términos académicos importantes',
        duration: '25 min',
        completed: false
      }
    ]
  },
  {
    id: 'french',
    name: 'Francés',
    flag: '🇫🇷',
    level: 'Básico',
    lessons: [
      {
        id: 'fr1',
        title: 'Introducción al Francés',
        description: 'Fundamentos del idioma francés',
        duration: '20 min',
        completed: false
      },
      {
        id: 'fr2',
        title: 'Frases Útiles',
        description: 'Comunicación básica en francés',
        duration: '20 min',
        completed: false
      },
      {
        id: 'fr3',
        title: 'Cultura Francesa',
        description: 'Costumbres y etiqueta social',
        duration: '15 min',
        completed: false
      }
    ]
  },
  {
    id: 'german',
    name: 'Alemán',
    flag: '🇩🇪',
    level: 'Básico',
    lessons: [
      {
        id: 'de1',
        title: 'Primeros Pasos',
        description: 'Introducción al alemán',
        duration: '20 min',
        completed: false
      },
      {
        id: 'de2',
        title: 'Conversaciones Simples',
        description: 'Diálogos básicos en alemán',
        duration: '25 min',
        completed: false
      }
    ]
  }
];

const countries: Country[] = [
  {
    id: 'usa',
    name: 'Estados Unidos',
    flag: '🇺🇸',
    sections: {
      laws: [
        'Edad legal para consumir alcohol: 21 años',
        'Prohibido fumar en lugares públicos cerrados',
        'Uso obligatorio de cinturón de seguridad',
        'Respeta las señales de tránsito y límites de velocidad',
        'No cruces la calle fuera de los pasos peatonales'
      ],
      customs: [
        'Es común dar propina (15-20% en restaurantes)',
        'Puntualidad es muy valorada',
        'El espacio personal es importante',
        'Saluda con un apretón de manos firme',
        'Evita hablar de política o religión con desconocidos'
      ],
      emergency: {
        police: '911',
        ambulance: '911',
        embassy: '+1 (202) 234-5678'
      },
      tips: [
        'Lleva siempre tu pasaporte o ID',
        'Familiarízate con el transporte público local',
        'Abre una cuenta bancaria local si es posible',
        'Obtén un número de teléfono local',
        'Aprende sobre el sistema de salud y seguro médico'
      ]
    }
  },
  {
    id: 'brazil',
    name: 'Brasil',
    flag: '🇧🇷',
    sections: {
      laws: [
        'Prohibido consumir drogas (leyes muy estrictas)',
        'Edad legal para beber: 18 años',
        'No fotografíes instalaciones militares o policiales',
        'Respeta las áreas protegidas ambientalmente',
        'Lleva siempre identificación oficial'
      ],
      customs: [
        'Los brasileños son muy cálidos y expresivos',
        'El saludo incluye beso en la mejilla (entre conocidos)',
        'La puntualidad es más flexible que en otros países',
        'Disfruta de la música y el fútbol',
        'Aprende algunas palabras en portugués'
      ],
      emergency: {
        police: '190',
        ambulance: '192',
        embassy: '+55 (21) 2555-3000'
      },
      tips: [
        'Ten precaución en zonas turísticas (carteristas)',
        'Usa apps de transporte confiables (Uber, 99)',
        'Aprende sobre las diferentes regiones y culturas',
        'Prueba la gastronomía local con precaución',
        'Mantén copias de documentos importantes'
      ]
    }
  },
  {
    id: 'spain',
    name: 'España',
    flag: '🇪🇸',
    sections: {
      laws: [
        'Edad legal para beber: 18 años',
        'Prohibido fumar en espacios públicos cerrados',
        'Respeta los horarios de descanso (siesta)',
        'No está permitido el consumo de alcohol en la calle en algunas ciudades',
        'Lleva siempre tu pasaporte o NIE'
      ],
      customs: [
        'Horarios de comida diferentes (almuerzo 14:00-16:00, cena 21:00-23:00)',
        'La siesta es una tradición importante',
        'Saludo con dos besos en las mejillas',
        'Es común socializar hasta tarde',
        'Disfruta de las tapas y la vida social'
      ],
      emergency: {
        police: '112',
        ambulance: '112',
        embassy: '+34 91 123 4567'
      },
      tips: [
        'Aprende sobre las diferentes regiones y lenguas',
        'Usa el transporte público (muy eficiente)',
        'Explora las diferentes ciudades y pueblos',
        'Participa en festivales locales',
        'Abre una cuenta bancaria si vas a estar más de 3 meses'
      ]
    }
  },
  {
    id: 'france',
    name: 'Francia',
    flag: '🇫🇷',
    sections: {
      laws: [
        'Edad legal para beber: 18 años',
        'Prohibido usar el teléfono mientras conduces',
        'Respeta las normas de comportamiento en lugares públicos',
        'No está permitido cubrir completamente el rostro en público',
        'Lleva siempre tu carte de séjour o pasaporte'
      ],
      customs: [
        'Saluda con "Bonjour" al entrar a tiendas',
        'Los franceses valoran la formalidad inicial',
        'Usa "vous" (usted) hasta que te indiquen usar "tu"',
        'Disfruta de la gastronomía y el vino',
        'Respeta los horarios de comida tradicionales'
      ],
      emergency: {
        police: '17',
        ambulance: '15',
        embassy: '+33 1 43 17 53 00'
      },
      tips: [
        'Aprende francés básico (muy apreciado)',
        'Familiarízate con el metro de París',
        'Visita museos y sitios culturales',
        'Prueba diferentes quesos y panes',
        'Respeta las normas de etiqueta en restaurantes'
      ]
    }
  },
  {
    id: 'germany',
    name: 'Alemania',
    flag: '🇩🇪',
    sections: {
      laws: [
        'Edad legal para beber cerveza/vino: 16 años, licores: 18 años',
        'Prohibido cruzar la calle en rojo (multas)',
        'Reciclaje obligatorio (separación de basura)',
        'Respeta los horarios de silencio (22:00-06:00)',
        'Lleva siempre tu Aufenthaltstitel o pasaporte'
      ],
      customs: [
        'Puntualidad extremadamente importante',
        'Directo y eficiente en la comunicación',
        'Respeta las reglas y el orden',
        'Saludo con apretón de manos formal',
        'Privacidad y espacio personal valorados'
      ],
      emergency: {
        police: '110',
        ambulance: '112',
        embassy: '+49 30 254 007 0'
      },
      tips: [
        'Registra tu domicilio en Bürgeramt al llegar',
        'Abre una cuenta bancaria alemana',
        'Aprende sobre el sistema de transporte público',
        'Familiarízate con el reciclaje correcto',
        'Aprovecha los descuentos estudiantiles'
      ]
    }
  }
];

const softSkills: SoftSkill[] = [
  {
    id: 'communication',
    title: 'Comunicación Efectiva',
    icon: MessageCircle,
    description: 'Aprende a expresarte claramente y escuchar activamente en entornos multiculturales',
    tips: [
      'Practica la escucha activa: presta atención completa a tu interlocutor',
      'Sé claro y conciso en tus mensajes',
      'Adapta tu comunicación al contexto cultural',
      'Usa lenguaje corporal apropiado',
      'Haz preguntas para clarificar dudas',
      'Respeta los turnos de habla'
    ],
    exercises: [
      'Presenta tu proyecto de investigación en 2 minutos',
      'Practica explicar conceptos complejos de forma simple',
      'Participa en debates sobre temas actuales',
      'Grábate hablando y analiza tu comunicación'
    ]
  },
  {
    id: 'teamwork',
    title: 'Trabajo en Equipo',
    icon: Users,
    description: 'Desarrolla habilidades para colaborar efectivamente en equipos diversos',
    tips: [
      'Reconoce y valora las fortalezas de cada miembro',
      'Contribuye activamente a los objetivos del equipo',
      'Sé flexible y adaptable a diferentes estilos de trabajo',
      'Resuelve conflictos de manera constructiva',
      'Comparte conocimientos y recursos',
      'Celebra los logros colectivos'
    ],
    exercises: [
      'Organiza un proyecto grupal multicultural',
      'Practica dar y recibir feedback constructivo',
      'Asume diferentes roles en proyectos de equipo',
      'Facilita una sesión de brainstorming grupal'
    ]
  },
  {
    id: 'adaptation',
    title: 'Adaptabilidad Cultural',
    icon: Globe2,
    description: 'Aprende a adaptarte a nuevos entornos culturales y académicos',
    tips: [
      'Mantén una mente abierta ante nuevas costumbres',
      'Aprende sobre la cultura local antes de viajar',
      'Sé paciente contigo mismo durante la adaptación',
      'Busca experiencias que te saquen de tu zona de confort',
      'Reflexiona sobre tus experiencias interculturales',
      'Construye relaciones con personas locales'
    ],
    exercises: [
      'Lleva un diario de experiencias culturales',
      'Participa en eventos culturales locales',
      'Aprende frases básicas del idioma local',
      'Prueba comidas típicas de diferentes países'
    ]
  },
  {
    id: 'leadership',
    title: 'Liderazgo',
    icon: Target,
    description: 'Desarrolla habilidades de liderazgo en contextos internacionales',
    tips: [
      'Inspira a otros con tu ejemplo',
      'Toma decisiones informadas y oportunas',
      'Delega responsabilidades efectivamente',
      'Motiva y apoya a tu equipo',
      'Comunica una visión clara',
      'Asume responsabilidad por los resultados'
    ],
    exercises: [
      'Lidera un proyecto de grupo',
      'Organiza un evento estudiantil',
      'Mentorea a un estudiante nuevo',
      'Presenta una iniciativa a autoridades'
    ]
  },
  {
    id: 'problem-solving',
    title: 'Resolución de Problemas',
    icon: Lightbulb,
    description: 'Desarrolla pensamiento crítico y creatividad para resolver desafíos',
    tips: [
      'Define claramente el problema antes de buscar soluciones',
      'Considera múltiples perspectivas',
      'Usa técnicas de pensamiento creativo',
      'Evalúa pros y contras de cada solución',
      'Implementa y evalúa los resultados',
      'Aprende de los errores'
    ],
    exercises: [
      'Resuelve casos de estudio reales',
      'Practica design thinking',
      'Participa en hackathons o competencias',
      'Analiza problemas desde diferentes ángulos culturales'
    ]
  },
  {
    id: 'emotional-intelligence',
    title: 'Inteligencia Emocional',
    icon: Brain,
    description: 'Gestiona tus emociones y comprende las de los demás',
    tips: [
      'Reconoce y nombra tus emociones',
      'Practica la autorregulación emocional',
      'Desarrolla empatía hacia los demás',
      'Maneja el estrés de forma saludable',
      'Construye relaciones positivas',
      'Mantén una actitud optimista ante desafíos'
    ],
    exercises: [
      'Lleva un registro de tus emociones diarias',
      'Practica técnicas de mindfulness',
      'Reflexiona sobre situaciones emocionalmente intensas',
      'Busca apoyo cuando lo necesites'
    ]
  }
];

export function ToolkitScreen({ onBack, darkMode = false, userRole = 'estudiante', isUnlocked = false, onUnlock }: ToolkitScreenProps) {
  const [currentSection, setCurrentSection] = useState<'main' | 'languages' | 'countries' | 'skills' | 'costOfLiving'>('main');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<SoftSkill | null>(null);
  const [selectedCostDestination, setSelectedCostDestination] = useState<CostOfLivingDestination | null>(null);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  const handleBack = () => {
    if (selectedLanguage) {
      setSelectedLanguage(null);
    } else if (selectedCountry) {
      setSelectedCountry(null);
    } else if (selectedSkill) {
      setSelectedSkill(null);
    } else if (selectedCostDestination) {
      setSelectedCostDestination(null);
    } else if (currentSection !== 'main') {
      setCurrentSection('main');
    } else {
      onBack();
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-40 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="flex items-center gap-3 px-4 py-4">
          <button
            onClick={handleBack}
            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <ChevronLeft size={24} className={darkMode ? 'text-gray-300' : 'text-gray-800'} />
          </button>
          <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {currentSection === 'main' && 'Kit de Herramientas'}
            {currentSection === 'languages' && (selectedLanguage ? selectedLanguage.name : 'Aprendizaje de Idiomas')}
            {currentSection === 'countries' && (selectedCountry ? selectedCountry.name : 'Guía del País de Destino')}
            {currentSection === 'skills' && (selectedSkill ? selectedSkill.title : 'Habilidades Blandas')}
            {currentSection === 'costOfLiving' && (selectedCostDestination ? selectedCostDestination.name : 'Costo de Vida')}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 pb-20">
        {/* Locked Screen */}
        {!isUnlocked ? (
          <div className="max-w-2xl mx-auto">
            <div className={`rounded-3xl p-8 text-center shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="text-5xl">🔒</div>
              </div>
              <h2 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Kit de Herramientas Bloqueado
              </h2>
              <p className={`text-base mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Para desbloquear el Kit de Herramientas, primero debes seleccionar un destino en la sección "Guía de Destinos"
              </p>

              <div className={`rounded-2xl p-6 mb-6 ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <div className="flex items-start gap-3">
                  <Info size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <h3 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      ¿Qué incluye el Kit de Herramientas?
                    </h3>
                    <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <li className="flex items-center gap-2">
                        <Languages size={16} className="text-blue-600" />
                        <span>Aprendizaje del idioma de tu destino</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Globe2 size={16} className="text-green-600" />
                        <span>Guía específica del país seleccionado</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Users size={16} className="text-purple-600" />
                        <span>Desarrollo de habilidades blandas</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-xl ${darkMode ? 'bg-yellow-900/30 border border-yellow-700' : 'bg-yellow-50 border border-yellow-300'}`}>
                <p className={`text-sm ${darkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
                  <strong>💡 Tip:</strong> Una vez que apliques a una universidad o conferencia en "Guía de Destinos", este kit se desbloqueará automáticamente.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
        {currentSection === 'main' && (
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Languages Card */}
            <button
              onClick={() => setCurrentSection('languages')}
              className={`w-full text-left rounded-2xl p-6 shadow-sm transition-all hover:scale-[1.02] ${
                darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Languages size={32} className="text-white" />
                </div>
                <div className="flex-1">
                  <h2 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Aprendizaje de Idiomas
                  </h2>
                  <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Aprende el idioma del país de destino con lecciones interactivas
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">
                      4 idiomas disponibles
                    </span>
                  </div>
                </div>
                <ChevronLeft size={24} className={`transform rotate-180 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
            </button>

            {/* Countries Card */}
            <button
              onClick={() => setCurrentSection('countries')}
              className={`w-full text-left rounded-2xl p-6 shadow-sm transition-all hover:scale-[1.02] ${
                darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe2 size={32} className="text-white" />
                </div>
                <div className="flex-1">
                  <h2 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Guía del País de Destino
                  </h2>
                  <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Información importante sobre leyes, costumbres y consejos de seguridad
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                      5 países disponibles
                    </span>
                  </div>
                </div>
                <ChevronLeft size={24} className={`transform rotate-180 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
            </button>

            {/* Soft Skills Card */}
            <button
              onClick={() => setCurrentSection('skills')}
              className={`w-full text-left rounded-2xl p-6 shadow-sm transition-all hover:scale-[1.02] ${
                darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users size={32} className="text-white" />
                </div>
                <div className="flex-1">
                  <h2 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Habilidades Blandas
                  </h2>
                  <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Desarrolla skills de comunicación, trabajo en equipo y liderazgo
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-bold">
                      6 habilidades
                    </span>
                  </div>
                </div>
                <ChevronLeft size={24} className={`transform rotate-180 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
            </button>

            {/* Cost of Living Card */}
            <button
              onClick={() => setCurrentSection('costOfLiving')}
              className={`w-full text-left rounded-2xl p-6 shadow-sm transition-all hover:scale-[1.02] ${
                darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <DollarSign size={32} className="text-white" />
                </div>
                <div className="flex-1">
                  <h2 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Costo de Vida
                  </h2>
                  <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Información sobre el costo de vida en diferentes destinos
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-bold">
                      19 destinos disponibles
                    </span>
                  </div>
                </div>
                <ChevronLeft size={24} className={`transform rotate-180 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
            </button>
          </div>
        )}

        {/* Languages Section */}
        {currentSection === 'languages' && !selectedLanguage && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className={`rounded-2xl p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
              <div className="flex items-start gap-3">
                <Info size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Selecciona el idioma que deseas aprender para tu destino de movilidad. Cada curso incluye lecciones prácticas y ejercicios interactivos.
                </p>
              </div>
            </div>

            {languages.map((language) => (
              <button
                key={language.id}
                onClick={() => setSelectedLanguage(language)}
                className={`w-full text-left rounded-2xl p-5 shadow-sm transition-all hover:scale-[1.02] ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{language.flag}</div>
                  <div className="flex-1">
                    <h3 className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {language.name}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {language.lessons.length} lecciones • Nivel {language.level}
                    </p>
                  </div>
                  <ChevronLeft size={20} className={`transform rotate-180 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Language Details */}
        {currentSection === 'languages' && selectedLanguage && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{selectedLanguage.flag}</div>
                <div>
                  <h2 className={`text-xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Curso de {selectedLanguage.name}
                  </h2>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Nivel: {selectedLanguage.level}
                  </p>
                </div>
              </div>

              <div className={`flex items-center gap-2 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <BookOpen size={20} className="text-blue-600" />
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {selectedLanguage.lessons.length} lecciones interactivas
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'} px-2`}>
                Lecciones
              </h3>
              {selectedLanguage.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className={`rounded-2xl overflow-hidden shadow-sm ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  <button
                    onClick={() => setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)}
                    className="w-full text-left p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        lesson.completed ? 'bg-green-100' : darkMode ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        {lesson.completed ? (
                          <CheckCircle size={20} className="text-green-600" />
                        ) : (
                          <span className={`font-bold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {lesson.title}
                        </h4>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {lesson.description}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            ⏱️ {lesson.duration}
                          </span>
                          {lesson.completed && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">
                              ✓ Completada
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>

                  {expandedLesson === lesson.id && (
                    <div className={`border-t px-5 pb-5 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <div className="flex items-center gap-2 mt-4 mb-3">
                        <Volume2 size={18} className="text-blue-600" />
                        <p className={`text-sm font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Contenido de la lección:
                        </p>
                      </div>
                      <ul className={`text-sm space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'} ml-6`}>
                        <li>• Vocabulario esencial</li>
                        <li>• Ejercicios de pronunciación</li>
                        <li>• Práctica conversacional</li>
                        <li>• Quiz de evaluación</li>
                      </ul>
                      <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-bold">
                        {lesson.completed ? 'Repasar lección' : 'Comenzar lección'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Countries Section */}
        {currentSection === 'countries' && !selectedCountry && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className={`rounded-2xl p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-green-50'}`}>
              <div className="flex items-start gap-3">
                <Info size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Selecciona tu país de destino para conocer información importante sobre leyes, costumbres, números de emergencia y consejos útiles.
                </p>
              </div>
            </div>

            {countries.map((country) => (
              <button
                key={country.id}
                onClick={() => setSelectedCountry(country)}
                className={`w-full text-left rounded-2xl p-5 shadow-sm transition-all hover:scale-[1.02] ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{country.flag}</div>
                  <div className="flex-1">
                    <h3 className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {country.name}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Leyes, costumbres y consejos importantes
                    </p>
                  </div>
                  <ChevronLeft size={20} className={`transform rotate-180 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Country Details */}
        {currentSection === 'countries' && selectedCountry && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="flex items-center gap-4">
                <div className="text-5xl">{selectedCountry.flag}</div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {selectedCountry.name}
                </h2>
              </div>
            </div>

            {/* Laws Section */}
            <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle size={20} className="text-red-600" />
                </div>
                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Leyes Importantes
                </h3>
              </div>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {selectedCountry.sections.laws.map((law, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-red-600 flex-shrink-0 mt-0.5">⚠️</span>
                    <span>{law}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customs Section */}
            <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Handshake size={20} className="text-blue-600" />
                </div>
                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Costumbres y Etiqueta
                </h3>
              </div>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {selectedCountry.sections.customs.map((custom, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-blue-600 flex-shrink-0 mt-0.5">🤝</span>
                    <span>{custom}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Emergency Section */}
            <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle size={20} className="text-orange-600" />
                </div>
                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Números de Emergencia
                </h3>
              </div>
              <div className="space-y-3">
                <div className={`flex justify-between items-center p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>🚓 Policía</span>
                  <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {selectedCountry.sections.emergency.police}
                  </span>
                </div>
                <div className={`flex justify-between items-center p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>🚑 Ambulancia</span>
                  <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {selectedCountry.sections.emergency.ambulance}
                  </span>
                </div>
                <div className={`flex justify-between items-center p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>🏛️ Embajada</span>
                  <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {selectedCountry.sections.emergency.embassy}
                  </span>
                </div>
              </div>
            </div>

            {/* Tips Section */}
            <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Lightbulb size={20} className="text-green-600" />
                </div>
                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Consejos Útiles
                </h3>
              </div>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {selectedCountry.sections.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 flex-shrink-0 mt-0.5">💡</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Soft Skills Section */}
        {currentSection === 'skills' && !selectedSkill && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className={`rounded-2xl p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-purple-50'}`}>
              <div className="flex items-start gap-3">
                <Info size={20} className="text-purple-600 flex-shrink-0 mt-1" />
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Desarrolla habilidades esenciales para tu éxito académico y profesional en un entorno internacional.
                </p>
              </div>
            </div>

            {softSkills.map((skill) => {
              const IconComponent = skill.icon;
              return (
                <button
                  key={skill.id}
                  onClick={() => setSelectedSkill(skill)}
                  className={`w-full text-left rounded-2xl p-5 shadow-sm transition-all hover:scale-[1.02] ${
                    darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {skill.title}
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {skill.description}
                      </p>
                    </div>
                    <ChevronLeft size={20} className={`transform rotate-180 flex-shrink-0 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Soft Skill Details */}
        {currentSection === 'skills' && selectedSkill && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  {(() => {
                    const IconComponent = selectedSkill.icon;
                    return <IconComponent size={32} className="text-white" />;
                  })()}
                </div>
                <div className="flex-1">
                  <h2 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {selectedSkill.title}
                  </h2>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {selectedSkill.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Tips Section */}
            <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Lightbulb size={20} className="text-purple-600" />
                </div>
                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Consejos Clave
                </h3>
              </div>
              <ul className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {selectedSkill.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-purple-600">{index + 1}</span>
                    </div>
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exercises Section */}
            <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Award size={20} className="text-green-600" />
                </div>
                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Ejercicios Prácticos
                </h3>
              </div>
              <ul className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {selectedSkill.exercises.map((exercise, index) => (
                  <li key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{exercise}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Button */}
            <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gradient-to-br from-purple-900 to-purple-800' : 'bg-gradient-to-br from-purple-500 to-purple-600'} shadow-sm`}>
              <div className="text-center text-white">
                <h3 className="font-bold mb-2">¿Listo para practicar?</h3>
                <p className="text-sm mb-4 opacity-90">
                  Aplica estos consejos en tu vida diaria y verás mejoras graduales
                </p>
                <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                  Comenzar ejercicios
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cost of Living Section */}
        {currentSection === 'costOfLiving' && !selectedCostDestination && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className={`rounded-2xl p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-yellow-50'}`}>
              <div className="flex items-start gap-3">
                <Info size={20} className="text-yellow-600 flex-shrink-0 mt-1" />
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Selecciona tu destino para obtener información detallada sobre el costo de vida, incluyendo alquiler, comida, transporte y más.
                </p>
              </div>
            </div>

            {costOfLivingDestinations.map((destination) => (
              <button
                key={destination.id}
                onClick={() => setSelectedCostDestination(destination)}
                className={`w-full text-left rounded-2xl p-5 shadow-sm transition-all hover:scale-[1.02] ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{destination.flag}</div>
                  <div className="flex-1">
                    <h3 className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {destination.name}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Información detallada sobre el costo de vida
                    </p>
                  </div>
                  <ChevronLeft size={20} className={`transform rotate-180 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Cost of Living Details */}
        {currentSection === 'costOfLiving' && selectedCostDestination && (
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Header */}
            <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{selectedCostDestination.flag}</div>
                <div>
                  <h2 className={`text-xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {selectedCostDestination.name}
                  </h2>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Idioma: {selectedCostDestination.language} • {selectedCostDestination.currency}
                  </p>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  💱 Tasa de cambio: {selectedCostDestination.exchangeRate}
                </p>
              </div>
            </div>

            {/* Costs Section */}
            <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <DollarSign size={20} className="text-yellow-600" />
                </div>
                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Costos Promedio
                </h3>
              </div>
              <div className="space-y-3">
                <div className={`flex justify-between items-center p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>🍽️ Restaurante económico</span>
                  <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {selectedCostDestination.costs.cheapRestaurant}
                  </span>
                </div>
                <div className={`flex justify-between items-center p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>🍴 Comida para 2 personas</span>
                  <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {selectedCostDestination.costs.mealFor2}
                  </span>
                </div>
                <div className={`flex justify-between items-center p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>🏠 Apartamento 1 dormitorio</span>
                  <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {selectedCostDestination.costs.apt1Bedroom}
                  </span>
                </div>
                <div className={`flex justify-between items-center p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>🏡 Apartamento 3 dormitorios</span>
                  <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {selectedCostDestination.costs.apt3Bedroom}
                  </span>
                </div>
              </div>
            </div>

            {/* Visa Section */}
            <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CreditCard size={20} className="text-blue-600" />
                </div>
                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Visa de Estudiante
                </h3>
              </div>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {selectedCostDestination.visa.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-blue-600 flex-shrink-0 mt-0.5">📋</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Transport Section */}
            <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Plane size={20} className="text-green-600" />
                </div>
                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Transporte
                </h3>
              </div>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {selectedCostDestination.transport.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 flex-shrink-0 mt-0.5">🚌</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Culture Section */}
            <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Globe2 size={20} className="text-purple-600" />
                </div>
                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Cultura y Características
                </h3>
              </div>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {selectedCostDestination.culture.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-purple-600 flex-shrink-0 mt-0.5">🌟</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
          </>
        )}
      </main>
    </div>
  );
}