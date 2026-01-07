import { ChevronLeft, Globe, Calendar, CheckCircle, GraduationCap, ExternalLink, Send, Search, X, Presentation, BookOpen, Eye, Filter, Clock, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DestinationsScreenProps {
  onBack: () => void;
  darkMode?: boolean;
  userRole?: string;
  onUnlockRoute?: () => void;
  isRouteUnlocked?: boolean;
  onUnlockToolkit?: () => void;
  selectedDestination?: string | null;
  setSelectedDestination?: (destination: string | null) => void;
}

interface University {
  id: number;
  name: string;
  country: string;
  countryFlag: string;
  website: string;
  applicationDeadline: string;
  requirements: string[];
  acceptedMajors: string[];
  city: string;
  imageUrl: string;
}

interface Conference {
  id: number;
  name: string;
  country: string;
  countryFlag: string;
  website: string;
  eventDate: string;
  submissionDeadline: string;
  topics: string[];
  researchAreas: string[];
  city: string;
  type: string;
  imageUrl: string;
}

export function DestinationsScreen({ onBack, darkMode = false, userRole = 'student', onUnlockRoute, isRouteUnlocked, onUnlockToolkit, selectedDestination, setSelectedDestination }: DestinationsScreenProps) {
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [selectedConference, setSelectedConference] = useState<Conference | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Estados para filtros avanzados (solo para administrativo)
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  // Si no es estudiante ni administrativo, no mostrar esta sección
  if (userRole !== 'estudiante' && userRole !== 'administrativo') {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <header className={`px-4 py-3 flex items-center sticky top-0 z-40 shadow-sm transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <button
            onClick={onBack}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <ChevronLeft size={24} className={darkMode ? 'text-gray-300' : 'text-gray-800'} />
          </button>
          <h1 className={`ml-2 font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Guía de Destinos</h1>
        </header>
        <main className="px-4 py-6 max-w-3xl mx-auto">
          <div className={`rounded-xl p-8 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              Esta sección no está disponible para tu rol.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const universities: University[] = [
    {
      id: 1,
      name: 'Universidad Politécnica de Madrid',
      country: 'España',
      countryFlag: '🇪🇸',
      city: 'Madrid',
      website: 'https://www.upm.es',
      applicationDeadline: '15 de Marzo, 2024',
      imageUrl: 'https://images.unsplash.com/photo-1696843285491-6a62112c0424?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWRyaWQlMjB1bml2ZXJzaXR5JTIwY2FtcHVzfGVufDF8fHx8MTc2NTUwOTkxNnww&ixlib=rb-4.1.0&q=80&w=1080',
      requirements: [
        'Promedio mínimo de 8.0',
        'Nivel B2 de español',
        'Carta de motivación',
        'Certificado de matrícula vigente'
      ],
      acceptedMajors: [
        'Ingeniería en Computación',
        'Ingeniería Industrial',
        'Ingeniería Mecánica',
        'Ingeniería Civil'
      ]
    },
    {
      id: 2,
      name: 'University of California, Berkeley',
      country: 'Estados Unidos',
      countryFlag: '🇺🇸',
      city: 'Berkeley, California',
      website: 'https://www.berkeley.edu',
      applicationDeadline: '1 de Febrero, 2024',
      imageUrl: 'https://images.unsplash.com/photo-1711615397077-78ad339130ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZXJrZWxleSUyMGNhbXB1cyUyMGNhbGlmb3JuaWF8ZW58MXx8fHwxNzY1NTA5OTE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      requirements: [
        'GPA mínimo de 3.5',
        'TOEFL 100+ o IELTS 7.0+',
        'Dos cartas de recomendación',
        'Statement of Purpose'
      ],
      acceptedMajors: [
        'Computer Science',
        'Electrical Engineering',
        'Business Administration',
        'Environmental Science'
      ]
    },
    {
      id: 3,
      name: 'Technische Universität München',
      country: 'Alemania',
      countryFlag: '🇩🇪',
      city: 'Múnich',
      website: 'https://www.tum.de',
      applicationDeadline: '30 de Abril, 2024',
      imageUrl: 'https://images.unsplash.com/photo-1671383750582-d6ff7b4adcac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdW5pY2glMjB1bml2ZXJzaXR5JTIwZ2VybWFueXxlbnwxfHx8fDE3NjU1MDk5MTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      requirements: [
        'Promedio mínimo de 8.5',
        'Alemán B1 o Inglés B2',
        'CV actualizado',
        'Certificado de inscripción'
      ],
      acceptedMajors: [
        'Ingeniería Mecánica',
        'Ingeniería Eléctrica',
        'Ciencias de la Computación',
        'Matemáticas Aplicadas'
      ]
    },
    {
      id: 4,
      name: 'Universidade de São Paulo',
      country: 'Brasil',
      countryFlag: '🇧🇷',
      city: 'São Paulo',
      website: 'https://www5.usp.br',
      applicationDeadline: '20 de Mayo, 2024',
      imageUrl: 'https://images.unsplash.com/photo-1700826952602-19bb5aa4ab70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW8lMjBwYXVsbyUyMHVuaXZlcnNpdHklMjBicmF6aWx8ZW58MXx8fHwxNzY1NTA5OTE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      requirements: [
        'Promedio mínimo de 7.5',
        'Portugués intermedio',
        'Pasaporte vigente',
        'Seguro médico internacional'
      ],
      acceptedMajors: [
        'Ingeniería de Producción',
        'Administración de Empresas',
        'Biología',
        'Arquitectura'
      ]
    },
    {
      id: 5,
      name: 'National University of Singapore',
      country: 'Singapur',
      countryFlag: '🇸🇬',
      city: 'Singapur',
      website: 'https://www.nus.edu.sg',
      applicationDeadline: '10 de Junio, 2024',
      imageUrl: 'https://images.unsplash.com/photo-1633111126270-f50f378fde68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5nYXBvcmUlMjB1bml2ZXJzaXR5JTIwY2FtcHVzfGVufDF8fHx8MTc2NTUwOTkxOHww&ixlib=rb-4.1.0&q=80&w=1080',
      requirements: [
        'GPA mínimo de 3.0',
        'TOEFL 85+ o IELTS 6.5+',
        'Personal statement',
        'Transcript oficial'
      ],
      acceptedMajors: [
        'Computer Engineering',
        'Data Science',
        'Business Analytics',
        'Chemical Engineering'
      ]
    },
    {
      id: 6,
      name: 'Universidad de Buenos Aires',
      country: 'Argentina',
      countryFlag: '🇦🇷',
      city: 'Buenos Aires',
      website: 'https://www.uba.ar',
      applicationDeadline: '5 de Abril, 2024',
      imageUrl: 'https://images.unsplash.com/photo-1638154642415-aaa83f5bf5e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWVub3MlMjBhaXJlcyUyMHVuaXZlcnNpdHklMjBhcmdlbnRpbmF8ZW58MXx8fHwxNzY1NTA5OTE4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      requirements: [
        'Promedio mínimo de 7.0',
        'Nivel intermedio de español',
        'Certificado de buena conducta',
        'Foto tipo carnet'
      ],
      acceptedMajors: [
        'Medicina',
        'Derecho',
        'Economía',
        'Ingeniería Industrial'
      ]
    },
    {
      id: 7,
      name: 'Seoul National University',
      country: 'Corea del Sur',
      countryFlag: '🇰🇷',
      city: 'Seúl',
      website: 'https://www.snu.ac.kr',
      applicationDeadline: '25 de Marzo, 2024',
      imageUrl: 'https://images.unsplash.com/photo-1702737832079-ed5864397f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW91bCUyMHVuaXZlcnNpdHklMjBrb3JlYXxlbnwxfHx8fDE3NjU1MDk5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      requirements: [
        'GPA mínimo de 3.2',
        'TOPIK Level 3 o TOEFL 80+',
        'Health certificate',
        'Recommendation letter'
      ],
      acceptedMajors: [
        'Computer Science',
        'Mechanical Engineering',
        'International Relations',
        'Economics'
      ]
    },
    {
      id: 8,
      name: 'École Polytechnique',
      country: 'Francia',
      countryFlag: '🇫🇷',
      city: 'Palaiseau, París',
      website: 'https://www.polytechnique.edu',
      applicationDeadline: '15 de Febrero, 2024',
      imageUrl: 'https://images.unsplash.com/photo-1673921948536-40c9d42289c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMHBvbHl0ZWNobmlxdWUlMjBmcmFuY2V8ZW58MXx8fHwxNzY1NTA5OTE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      requirements: [
        'Promedio mínimo de 8.8',
        'Francés B1 o Inglés C1',
        'Examen de admisión',
        'Portfolio académico'
      ],
      acceptedMajors: [
        'Matemáticas',
        'Física',
        'Ingeniería',
        'Ciencias Aplicadas'
      ]
    },
    {
      id: 9,
      name: 'University of Melbourne',
      country: 'Australia',
      countryFlag: '🇦🇺',
      city: 'Melbourne',
      website: 'https://www.unimelb.edu.au',
      applicationDeadline: '30 de Enero, 2024',
      imageUrl: 'https://images.unsplash.com/photo-1633296452834-0669c7669a34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWxib3VybmUlMjB1bml2ZXJzaXR5JTIwYXVzdHJhbGlhfGVufDF8fHx8MTc2NTUwOTkxOXww&ixlib=rb-4.1.0&q=80&w=1080',
      requirements: [
        'GPA mínimo de 3.3',
        'IELTS 6.5+ o TOEFL 90+',
        'Academic transcript',
        'Visa de estudiante'
      ],
      acceptedMajors: [
        'Engineering',
        'Commerce',
        'Arts',
        'Science'
      ]
    },
    {
      id: 10,
      name: 'Universidad Nacional Autónoma de México',
      country: 'México',
      countryFlag: '🇲🇽',
      city: 'Ciudad de México',
      website: 'https://www.unam.mx',
      applicationDeadline: '10 de Mayo, 2024',
      imageUrl: 'https://images.unsplash.com/photo-1626117898378-bc861db0f68a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY28lMjBjaXR5JTIwdW5pdmVyc2l0eSUyMHVuYW18ZW58MXx8fHwxNzY1NTA5OTE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      requirements: [
        'Promedio mínimo de 8.0',
        'Español nativo o certificado',
        'Carta de aceptación',
        'Comprobante de domicilio'
      ],
      acceptedMajors: [
        'Ingeniería',
        'Arquitectura',
        'Ciencias Políticas',
        'Filosofía'
      ]
    }
  ];

  const conferences: Conference[] = [
    {
      id: 1,
      name: 'IEEE International Conference on Data Science',
      country: 'Estados Unidos',
      countryFlag: '🇺🇸',
      city: 'San Francisco, California',
      website: 'https://www.ieee-ds.org',
      eventDate: '15-18 de Junio, 2024',
      submissionDeadline: '10 de Marzo, 2024',
      type: 'Conferencia Internacional',
      imageUrl: 'https://images.unsplash.com/photo-1590245561972-73fd22def7cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW4lMjBmcmFuY2lzY28lMjBjb25mZXJlbmNlJTIwY2VudGVyfGVufDF8fHx8MTc2NTUwOTkyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      topics: [
        'Machine Learning',
        'Big Data Analytics',
        'Data Mining',
        'Cloud Computing'
      ],
      researchAreas: [
        'Ciencias de la Computación',
        'Inteligencia Artificial',
        'Estadística',
        'Ingeniería de Datos'
      ]
    },
    {
      id: 2,
      name: 'European Conference on Renewable Energy',
      country: 'Alemania',
      countryFlag: '🇩🇪',
      city: 'Berlín',
      website: 'https://www.ecre-conference.eu',
      eventDate: '5-8 de Julio, 2024',
      submissionDeadline: '20 de Marzo, 2024',
      type: 'Conferencia Europea',
      imageUrl: 'https://images.unsplash.com/photo-1625685312782-3c2dbc537199?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZXJsaW4lMjBjb25mZXJlbmNlJTIwaGFsbCUyMGdlcm1hbnl8ZW58MXx8fHwxNzY1NTA5OTIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      topics: [
        'Energía Solar',
        'Energía Eólica',
        'Sostenibilidad',
        'Tecnologías Verdes'
      ],
      researchAreas: [
        'Ingeniería Ambiental',
        'Energías Renovables',
        'Cambio Climático',
        'Desarrollo Sostenible'
      ]
    },
    {
      id: 3,
      name: 'Latin American Symposium on Biotechnology',
      country: 'Brasil',
      countryFlag: '🇧🇷',
      city: 'Río de Janeiro',
      website: 'https://www.labiotech.com',
      eventDate: '20-23 de Agosto, 2024',
      submissionDeadline: '5 de Abril, 2024',
      type: 'Simposio Regional',
      imageUrl: 'https://images.unsplash.com/photo-1759968589247-6c21ddb85ffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaW8lMjBqYW5laXJvJTIwY29udmVudGlvbiUyMGNlbnRlcnxlbnwxfHx8fDE3NjU1MDk5MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      topics: [
        'Biotecnología Aplicada',
        'Genómica',
        'Bioinformática',
        'Medicina Molecular'
      ],
      researchAreas: [
        'Biotecnología',
        'Biología Molecular',
        'Medicina',
        'Farmacología'
      ]
    },
    {
      id: 4,
      name: 'Asia-Pacific Forum on Marine Sciences',
      country: 'Japón',
      countryFlag: '🇯🇵',
      city: 'Tokio',
      website: 'https://www.apmarine-forum.jp',
      eventDate: '10-14 de Septiembre, 2024',
      submissionDeadline: '15 de Abril, 2024',
      type: 'Foro Internacional',
      imageUrl: 'https://images.unsplash.com/photo-1698852797488-70667d0c36df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGNvbnZlbnRpb24lMjBjZW50ZXIlMjBqYXBhbnxlbnwxfHx8fDE3NjU1MDk5MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      topics: [
        'Oceanografía',
        'Conservación Marina',
        'Cambio Climático',
        'Biodiversidad Acuática'
      ],
      researchAreas: [
        'Ciencias del Mar',
        'Biología Marina',
        'Ecología',
        'Ciencias Ambientales'
      ]
    },
    {
      id: 5,
      name: 'Global Summit on Artificial Intelligence',
      country: 'Singapur',
      countryFlag: '🇸🇬',
      city: 'Singapur',
      website: 'https://www.ai-summit-global.sg',
      eventDate: '25-28 de Octubre, 2024',
      submissionDeadline: '30 de Mayo, 2024',
      type: 'Cumbre Mundial',
      imageUrl: 'https://images.unsplash.com/photo-1640436237186-d9da1979d224?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5nYXBvcmUlMjBjb25mZXJlbmNlJTIwdmVudWV8ZW58MXx8fHwxNzY1NTA5OTIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      topics: [
        'Deep Learning',
        'Computer Vision',
        'Natural Language Processing',
        'AI Ethics'
      ],
      researchAreas: [
        'Inteligencia Artificial',
        'Robótica',
        'Sistemas Inteligentes',
        'Machine Learning'
      ]
    },
    {
      id: 6,
      name: 'International Congress on Civil Engineering',
      country: 'España',
      countryFlag: '🇪🇸',
      city: 'Barcelona',
      website: 'https://www.icceng.es',
      eventDate: '12-15 de Noviembre, 2024',
      submissionDeadline: '10 de Junio, 2024',
      type: 'Congreso Internacional',
      imageUrl: 'https://images.unsplash.com/photo-1693478075635-bf2742c3ea09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjBjb252ZW50aW9uJTIwY2VudGVyJTIwc3BhaW58ZW58MXx8fHwxNzY1NTA5OTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      topics: [
        'Estructuras Sostenibles',
        'Materiales de Construcción',
        'Infraestructura Urbana',
        'Ingeniería Sísmica'
      ],
      researchAreas: [
        'Ingeniería Civil',
        'Arquitectura',
        'Urbanismo',
        'Construcción Sostenible'
      ]
    },
    {
      id: 7,
      name: 'World Conference on Educational Innovation',
      country: 'Canadá',
      countryFlag: '🇨🇦',
      city: 'Toronto',
      website: 'https://www.wced-innovation.ca',
      eventDate: '3-6 de Febrero, 2025',
      submissionDeadline: '1 de Agosto, 2024',
      type: 'Conferencia Mundial',
      imageUrl: 'https://images.unsplash.com/photo-1656278514844-6396a54bd9fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3JvbnRvJTIwY29uZmVyZW5jZSUyMGNlbnRlciUyMGNhbmFkYXxlbnwxfHx8fDE3NjU1MDk5MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      topics: [
        'Tecnologías Educativas',
        'E-Learning',
        'Pedagogía Digital',
        'Aprendizaje Activo'
      ],
      researchAreas: [
        'Educación',
        'Tecnología Educativa',
        'Psicología Educativa',
        'Innovación Pedagógica'
      ]
    },
    {
      id: 8,
      name: 'International Symposium on Cybersecurity',
      country: 'Reino Unido',
      countryFlag: '🇬🇧',
      city: 'Londres',
      website: 'https://www.cyber-symposium.uk',
      eventDate: '18-21 de Marzo, 2025',
      submissionDeadline: '15 de Septiembre, 2024',
      type: 'Simposio Internacional',
      imageUrl: 'https://images.unsplash.com/photo-1666468546845-cbe45c6775b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25kb24lMjBjb25mZXJlbmNlJTIwaGFsbCUyMHVrfGVufDF8fHx8MTc2NTUwOTkyMnww&ixlib=rb-4.1.0&q=80&w=1080',
      topics: [
        'Ethical Hacking',
        'Blockchain Security',
        'Network Security',
        'Privacy Protection'
      ],
      researchAreas: [
        'Ciberseguridad',
        'Criptografía',
        'Redes de Computadoras',
        'Seguridad Informática'
      ]
    },
    {
      id: 9,
      name: 'Pan-American Congress on Public Health',
      country: 'México',
      countryFlag: '🇲🇽',
      city: 'Ciudad de México',
      website: 'https://www.pahealth-congress.mx',
      eventDate: '8-11 de Abril, 2025',
      submissionDeadline: '1 de Octubre, 2024',
      type: 'Congreso Panamericano',
      imageUrl: 'https://images.unsplash.com/photo-1518659526054-190340b32735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY28lMjBjaXR5JTIwY29udmVudGlvbiUyMGNlbnRlcnxlbnwxfHx8fDE3NjU1MDk5MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      topics: [
        'Epidemiología',
        'Salud Pública',
        'Políticas de Salud',
        'Medicina Preventiva'
      ],
      researchAreas: [
        'Salud Pública',
        'Medicina',
        'Epidemiología',
        'Administración en Salud'
      ]
    },
    {
      id: 10,
      name: 'Global Forum on Climate Change Adaptation',
      country: 'Australia',
      countryFlag: '🇦🇺',
      city: 'Melbourne',
      website: 'https://www.climate-forum.au',
      eventDate: '22-25 de Mayo, 2025',
      submissionDeadline: '15 de Noviembre, 2024',
      type: 'Foro Global',
      imageUrl: 'https://images.unsplash.com/photo-1709676572702-9a71190da266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWxib3VybmUlMjBjb252ZW50aW9uJTIwY2VudGVyJTIwYXVzdHJhbGlhfGVufDF8fHx8MTc2NTUwOTkyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      topics: [
        'Adaptación Climática',
        'Resiliencia Urbana',
        'Gestión de Riesgos',
        'Políticas Ambientales'
      ],
      researchAreas: [
        'Ciencias Ambientales',
        'Cambio Climático',
        'Geografía',
        'Planificación Urbana'
      ]
    }
  ];

  const handleViewDetails = (item: University | Conference) => {
    if (isStudent) {
      setSelectedUniversity(item as University);
    } else {
      setSelectedConference(item as Conference);
    }
    setShowDetailsModal(true);
  };

  const handleApplyFromDetails = () => {
    setShowDetailsModal(false);
    setShowApplicationModal(true);
  };

  // Filtrar universidades solo por búsqueda
  const filteredUniversities = universities.filter((university) => {
    const matchesSearch = 
      university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.acceptedMajors.some(major => major.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesSearch;
  });

  // Filtrar conferencias solo por búsqueda
  const filteredConferences = conferences.filter((conference) => {
    const matchesSearch = 
      conference.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conference.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conference.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conference.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase())) ||
      conference.researchAreas.some(area => area.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Aplicar filtros avanzados para administrativo
    const matchesTopicFilter = !selectedTopicFilter || conference.topics.some(topic => topic.toLowerCase().includes(selectedTopicFilter.toLowerCase()));
    const matchesTypeFilter = !selectedTypeFilter || conference.type === selectedTypeFilter;
    
    return matchesSearch && matchesTopicFilter && matchesTypeFilter;
  });

  // Función para determinar si una conferencia es "Nueva" (agregada recientemente)
  const isNewConference = (id: number): boolean => {
    // Las conferencias con ID >= 8 son consideradas nuevas
    return id >= 8;
  };

  // Función para detectar si la fecha límite está muy cerca (7 días o menos)
  const isUrgentDeadline = (submissionDeadline: string): boolean => {
    const today = new Date();
    const months: Record<string, number> = {
      'Enero': 0, 'Febrero': 1, 'Marzo': 2, 'Abril': 3, 'Mayo': 4, 'Junio': 5,
      'Julio': 6, 'Agosto': 7, 'Septiembre': 8, 'Octubre': 9, 'Noviembre': 10, 'Diciembre': 11
    };
    const parts = submissionDeadline.match(/(\d+) de (\w+), (\d+)/);
    if (parts) {
      const day = parseInt(parts[1]);
      const month = months[parts[2]];
      const year = parseInt(parts[3]);
      const deadline = new Date(year, month, day);
      const diffTime = deadline.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7 && diffDays > 0; // Cierra en 7 días o menos
    }
    return false;
  };

  // Contar conferencias con fechas límite urgentes
  const urgentConferences = conferences.filter(conf => isUrgentDeadline(conf.submissionDeadline));
  const hasUrgentDeadlines = urgentConferences.length > 0;

  // Obtener temas únicos para filtros
  const uniqueTopics = Array.from(new Set(conferences.flatMap(c => c.topics))).sort();
  
  // Obtener tipos de eventos únicos para filtros
  const uniqueTypes = Array.from(new Set(conferences.map(c => c.type))).sort();

  // Determinar si es estudiante o administrativo
  const isStudent = userRole === 'estudiante';
  const isAdmin = userRole === 'administrativo';

  const dataToShow = isStudent ? filteredUniversities : filteredConferences;
  const totalItems = isStudent ? universities.length : conferences.length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <header className={`px-4 py-3 flex items-center sticky top-0 z-40 shadow-sm transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <button
          onClick={onBack}
          className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <ChevronLeft size={24} className={darkMode ? 'text-gray-300' : 'text-gray-800'} />
        </button>
        <h1 className={`ml-2 font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Guía de Destinos</h1>
      </header>

      <main className="px-4 py-6 max-w-4xl mx-auto space-y-6 pb-8">
        {/* Header Section */}
        <div className={`rounded-2xl p-6 text-center shadow-lg ${darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-[#1e5a6d] to-[#2a7a91]'}`}>
          {isStudent ? (
            <>
              <GraduationCap size={48} className="mx-auto mb-4 text-white" />
              <h2 className="text-2xl font-bold text-white mb-2">Universidades con Convenio</h2>
              <p className="text-white/90 text-sm">
                Explora las {universities.length} universidades internacionales disponibles para tu intercambio
              </p>
            </>
          ) : (
            <>
              <Presentation size={48} className="mx-auto mb-4 text-white" />
              <h2 className="text-2xl font-bold text-white mb-2">Conferencias de Investigación</h2>
              <p className="text-white/90 text-sm">
                Explora {conferences.length} eventos académicos internacionales para presentar tu investigación
              </p>
            </>
          )}
        </div>

        {/* Info Banner - Dynamic based on urgent deadlines */}
        {isAdmin && hasUrgentDeadlines ? (
          <div className={`rounded-xl p-5 shadow-lg border-2 animate-pulse ${darkMode ? 'bg-red-900/40 border-red-600' : 'bg-red-50 border-red-400'}`}>
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${darkMode ? 'bg-red-800' : 'bg-red-200'}`}>
                <Clock size={24} className={darkMode ? 'text-red-300' : 'text-red-600'} />
              </div>
              <div className="flex-1">
                <h3 className={`font-bold mb-1 ${darkMode ? 'text-red-200' : 'text-red-800'}`}>
                  ⚠️ ¡ALERTA DE FECHA LÍMITE CERCANA!
                </h3>
                <p className={`text-sm mb-2 ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
                  <strong>{urgentConferences.length} {urgentConferences.length === 1 ? 'conferencia tiene' : 'conferencias tienen'}</strong> fecha límite de envío de papers en los próximos 7 días:
                </p>
                <ul className="space-y-1 mb-3">
                  {urgentConferences.map(conf => (
                    <li key={conf.id} className={`text-sm flex items-start gap-2 ${darkMode ? 'text-red-200' : 'text-red-800'}`}>
                      <span>•</span>
                      <span><strong>{conf.name}</strong> - Cierra: {conf.submissionDeadline}</span>
                    </li>
                  ))}
                </ul>
                <p className={`text-xs ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
                  📌 <strong>Acción inmediata requerida.</strong> No pierdas la oportunidad de presentar tu investigación. Las fechas límite son estrictas y no se aceptan envíos tardíos.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className={`rounded-xl p-4 ${darkMode ? 'bg-blue-900/30 border-2 border-blue-700' : 'bg-blue-50 border-2 border-blue-200'}`}>
            <p className={`text-sm text-center ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
              💡 <strong>Importante:</strong> {isStudent ? 'Revisa cuidadosamente los requisitos antes de aplicar.' : 'Revisa las fechas de envío de papers antes de registrarte.'} Las fechas límite son estrictas.
            </p>
          </div>
        )}

        {/* Search Section */}
        <div className={`rounded-xl p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <div className="flex flex-col gap-3">
            {/* Search Bar */}
            <div className={`flex items-center gap-2 px-4 py-3 rounded-lg border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600' 
                : 'bg-gray-50 border-gray-300'
            }`}>
              <Search size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
              <input
                type="text"
                placeholder={isStudent ? "Buscar por universidad, país, ciudad o carrera..." : "Buscar por conferencia, país, tema o área de investigación..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`flex-1 bg-transparent outline-none ${
                  darkMode ? 'text-gray-200 placeholder-gray-500' : 'text-gray-700 placeholder-gray-400'
                }`}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')} 
                  className={`p-1 hover:bg-gray-600 rounded transition-colors ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                >
                  <X size={18} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                </button>
              )}
            </div>

            {/* Results Count */}
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {dataToShow.length === totalItems 
                ? `Mostrando ${isStudent ? 'todas las' : 'todas las'} ${totalItems} ${isStudent ? 'universidades' : 'conferencias'}`
                : `Encontradas ${dataToShow.length} de ${totalItems} ${isStudent ? 'universidades' : 'conferencias'}`}
            </p>
          </div>
        </div>

        {/* No Results Message */}
        {dataToShow.length === 0 && (
          <div className={`rounded-2xl p-10 text-center shadow-lg ${darkMode ? 'bg-gray-800 border-2 border-gray-700' : 'bg-white border-2 border-gray-200'}`}>
            {/* Empty State Icon */}
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <Search size={48} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
            </div>

            {/* Message */}
            <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              {isStudent ? '¡Vaya! No encontramos universidades que coincidan' : '¡Vaya! No encontramos conferencias que coincidan'}
            </h3>
            
            <p className={`text-sm mb-6 max-w-md mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {isStudent 
                ? 'No hay universidades que coincidan con tu búsqueda. Intenta limpiar tu búsqueda o usar términos diferentes.'
                : 'No hay conferencias que coincidan con tu búsqueda. Intenta limpiar tu búsqueda o usar términos diferentes.'}
            </p>

            {/* Action Button */}
            <button
              onClick={() => setSearchQuery('')}
              className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 mx-auto shadow-lg ${
                darkMode 
                  ? 'bg-[#1e5a6d] text-white hover:opacity-90' 
                  : 'bg-gradient-to-r from-[#1e5a6d] to-[#2a7a91] text-white hover:opacity-90'
              }`}
            >
              <X size={18} />
              Limpiar Búsqueda
            </button>

            {/* Suggestions */}
            <div className={`mt-8 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <p className={`text-xs mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                💡 Sugerencias:
              </p>
              <ul className={`text-xs space-y-2 max-w-sm mx-auto text-left ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li>• Prueba con términos más generales</li>
                <li>• Revisa la ortografía de tu búsqueda</li>
                {isStudent && <li>• Busca por país, ciudad o área de estudio</li>}
                {isAdmin && <li>• Busca por país, ciudad, tema de investigación o tipo de evento</li>}
              </ul>
            </div>
          </div>
        )}

        {/* Grid for Universities/Conferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isStudent && filteredUniversities.map((university) => (
            <div
              key={university.id}
              className={`rounded-2xl overflow-hidden shadow-lg transition-all hover:shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={university.imageUrl}
                  alt={university.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 text-4xl">
                  {university.countryFlag}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <div>
                  <h3 className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {university.name}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {university.city}, {university.country}
                  </p>
                </div>

                <button
                  onClick={() => handleViewDetails(university)}
                  className="w-full bg-gradient-to-r from-[#1e5a6d] to-[#2a7a91] text-white py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-bold shadow-md"
                >
                  <Eye size={18} />
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}

          {isAdmin && filteredConferences.map((conference) => (
            <div
              key={conference.id}
              className={`rounded-2xl overflow-hidden shadow-lg transition-all hover:shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={conference.imageUrl}
                  alt={conference.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 text-4xl">
                  {conference.countryFlag}
                </div>
                <div className={`absolute top-3 left-3 flex flex-col gap-2`} >
                  {/* Event Type Tag */}
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${darkMode ? 'bg-purple-900/80 text-purple-200' : 'bg-purple-600 text-white'}`}>
                    {conference.type}
                  </div>
                  {/* Closing Soon Tag */}
                  {isUrgentDeadline(conference.submissionDeadline) && (
                    <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${darkMode ? 'bg-orange-900/90 text-orange-200' : 'bg-orange-500 text-white'} animate-pulse`} >
                      <Clock size={12} />
                      <span>Próximo Cierre</span>
                    </div>
                  )}
                  {/* New Conference Tag */}
                  {isNewConference(conference.id) && (
                    <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${darkMode ? 'bg-green-900/90 text-green-200' : 'bg-green-500 text-white'}`}>
                      <Sparkles size={12} />
                      <span>Nueva</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <div>
                  <h3 className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {conference.name}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {conference.city}, {conference.country}
                  </p>
                </div>

                <button
                  onClick={() => handleViewDetails(conference)}
                  className="w-full bg-gradient-to-r from-[#1e5a6d] to-[#2a7a91] text-white py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-bold shadow-md"
                >
                  <Eye size={18} />
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Details Modal - For Students */}
      {showDetailsModal && selectedUniversity && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className={`rounded-3xl max-w-2xl w-full my-8 shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {/* Image Header */}
            <div className="relative h-64 rounded-t-3xl overflow-hidden">
              <ImageWithFallback
                src={selectedUniversity.imageUrl}
                alt={selectedUniversity.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedUniversity(null);
                }}
                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
              >
                <X size={24} />
              </button>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-4xl">{selectedUniversity.countryFlag}</span>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedUniversity.name}</h2>
                    <p className="text-sm opacity-90">{selectedUniversity.city}, {selectedUniversity.country}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Website Link */}
              <a
                href={selectedUniversity.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-sm px-4 py-3 rounded-lg transition-all bg-gradient-to-r from-[#1e5a6d] to-[#2a7a91] text-white hover:opacity-90 font-medium"
              >
                <Globe size={16} />
                <span>Visitar Portal Oficial</span>
                <ExternalLink size={14} />
              </a>

              {/* Application Deadline */}
              <div className={`flex items-center gap-3 p-4 rounded-xl ${darkMode ? 'bg-red-900/30' : 'bg-red-50'}`}>
                <Calendar size={24} className={darkMode ? 'text-red-400' : 'text-red-600'} />
                <div>
                  <p className={`text-xs ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                    Fecha límite de aplicación
                  </p>
                  <p className={`font-bold ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
                    {selectedUniversity.applicationDeadline}
                  </p>
                </div>
              </div>

              {/* Requirements */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle size={20} className={darkMode ? 'text-green-400' : 'text-green-600'} />
                  <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Requisitos
                  </h4>
                </div>
                <ul className="space-y-2">
                  {selectedUniversity.requirements.map((req, index) => (
                    <li
                      key={index}
                      className={`flex items-start gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      <span className={`mt-1 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Accepted Majors */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap size={20} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
                  <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Carreras Afines
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedUniversity.acceptedMajors.map((major, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-xs ${
                        darkMode 
                          ? 'bg-blue-900/40 text-blue-300 border border-blue-700' 
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {major}
                    </span>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <button
                onClick={handleApplyFromDetails}
                disabled={isRouteUnlocked}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold shadow-md transition-opacity ${
                  isRouteUnlocked
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-60'
                    : 'bg-gradient-to-r from-[#1e5a6d] to-[#2a7a91] text-white hover:opacity-90'
                }`}
              >
                <Send size={20} />
                {isRouteUnlocked ? 'Ruta Activa' : 'Aplicar Ahora'}
              </button>

              {isRouteUnlocked && (
                <>
                  <div className={`rounded-xl p-3 text-center ${darkMode ? 'bg-blue-900/30 border border-blue-700' : 'bg-blue-50 border border-blue-300'}`}>
                    <p className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                      ℹ️ Tienes una ruta activa. ¿Esta es tu universidad actual?
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      // Actualizar información del destino sin cambiar el progreso
                      if (selectedUniversity && setSelectedDestination) {
                        setSelectedDestination(JSON.stringify({
                          name: selectedUniversity.name,
                          city: selectedUniversity.city,
                          country: selectedUniversity.country
                        }));
                      }
                      setShowDetailsModal(false);
                      setSelectedUniversity(null);
                    }}
                    className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-[#1e5a6d] to-[#2a7a91] text-white hover:opacity-90 transition-opacity"
                  >
                    ✓ Sí, actualizar información
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Details Modal - For Admins */}
      {showDetailsModal && selectedConference && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className={`rounded-3xl max-w-2xl w-full my-8 shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {/* Image Header */}
            <div className="relative h-64 rounded-t-3xl overflow-hidden">
              <ImageWithFallback
                src={selectedConference.imageUrl}
                alt={selectedConference.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedConference(null);
                }}
                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
              >
                <X size={24} />
              </button>
              <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${darkMode ? 'bg-purple-900/80 text-purple-200' : 'bg-purple-600 text-white'}`}>
                {selectedConference.type}
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-4xl">{selectedConference.countryFlag}</span>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedConference.name}</h2>
                    <p className="text-sm opacity-90">{selectedConference.city}, {selectedConference.country}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Website Link */}
              <a
                href={selectedConference.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-sm px-4 py-3 rounded-lg transition-all bg-gradient-to-r from-[#1e5a6d] to-[#2a7a91] text-white hover:opacity-90 font-medium"
              >
                <Globe size={16} />
                <span>Visitar Sitio Web</span>
                <ExternalLink size={14} />
              </a>

              {/* Event Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div className={`flex items-center gap-2 p-4 rounded-xl ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                  <Calendar size={20} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
                  <div>
                    <p className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      Fecha del evento
                    </p>
                    <p className={`font-bold text-sm ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                      {selectedConference.eventDate}
                    </p>
                  </div>
                </div>
                <div className={`flex items-center gap-2 p-4 rounded-xl ${darkMode ? 'bg-red-900/30' : 'bg-red-50'}`}>
                  <Send size={20} className={darkMode ? 'text-red-400' : 'text-red-600'} />
                  <div>
                    <p className={`text-xs ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                      Envío de papers
                    </p>
                    <p className={`font-bold text-sm ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
                      {selectedConference.submissionDeadline}
                    </p>
                  </div>
                </div>
              </div>

              {/* Topics */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen size={20} className={darkMode ? 'text-green-400' : 'text-green-600'} />
                  <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Temas Principales
                  </h4>
                </div>
                <ul className="space-y-2">
                  {selectedConference.topics.map((topic, index) => (
                    <li
                      key={index}
                      className={`flex items-start gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      <span className={`mt-1 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>•</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Research Areas */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Presentation size={20} className={darkMode ? 'text-purple-400' : 'text-purple-600'} />
                  <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Áreas de Investigación
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedConference.researchAreas.map((area, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-xs ${
                        darkMode 
                          ? 'bg-purple-900/40 text-purple-300 border border-purple-700' 
                          : 'bg-purple-50 text-purple-700 border border-purple-200'
                      }`}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Register Button */}
              <button
                onClick={handleApplyFromDetails}
                disabled={isRouteUnlocked}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold shadow-md transition-opacity ${
                  isRouteUnlocked
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-60'
                    : 'bg-gradient-to-r from-[#1e5a6d] to-[#2a7a91] text-white hover:opacity-90'
                }`}
              >
                <Send size={20} />
                {isRouteUnlocked ? 'Ruta Activa' : 'Solicitar Inscripción'}
              </button>

              {isRouteUnlocked && (
                <>
                  <div className={`rounded-xl p-3 text-center ${darkMode ? 'bg-blue-900/30 border border-blue-700' : 'bg-blue-50 border border-blue-300'}`}>
                    <p className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                      ℹ️ Tienes una ruta activa. ¿Esta es tu conferencia actual?
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      // Actualizar información del destino sin cambiar el progreso
                      if (selectedConference && setSelectedDestination) {
                        setSelectedDestination(JSON.stringify({
                          name: selectedConference.name,
                          city: selectedConference.city,
                          country: selectedConference.country
                        }));
                      }
                      setShowDetailsModal(false);
                      setSelectedConference(null);
                    }}
                    className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-[#1e5a6d] to-[#2a7a91] text-white hover:opacity-90 transition-opacity"
                  >
                    ✓ Sí, actualizar información
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Application Modal - For Students */}
      {showApplicationModal && selectedUniversity && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`rounded-3xl max-w-md w-full shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="bg-gradient-to-br from-[#1e5a6d] to-[#2a7a91] p-6 rounded-t-3xl text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Send size={32} className="text-[#1e5a6d]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Solicitud Recibida</h2>
            </div>

            <div className="p-6 space-y-4">
              <div className={`rounded-xl p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Has aplicado a:
                </p>
                <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {selectedUniversity.name}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {selectedUniversity.country}
                </p>
              </div>

              <div className={`rounded-xl p-4 ${darkMode ? 'bg-blue-900/30 border-2 border-blue-700' : 'bg-blue-50 border-2 border-blue-200'}`}>
                <p className={`text-sm text-center ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                  📧 <strong>En breve</strong>, un coordinador de Relaciones Externas se pondrá en contacto contigo vía correo electrónico con los siguientes pasos del proceso de aplicación.
                </p>
              </div>

              <div className={`rounded-xl p-3 ${darkMode ? 'bg-yellow-900/30' : 'bg-yellow-50'}`}>
                <p className={`text-xs text-center ${darkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
                  ⚠️ Asegúrate de revisar tu bandeja de entrada y spam regularmente
                </p>
              </div>

              <button
                onClick={() => {
                  setShowApplicationModal(false);
                  setSelectedUniversity(null);
                  // Desbloquear la ruta embajador y el kit de herramientas
                  if (onUnlockRoute) {
                    onUnlockRoute();
                  }
                  if (onUnlockToolkit) {
                    onUnlockToolkit();
                  }
                  // Guardar el destino seleccionado
                  if (selectedUniversity && setSelectedDestination) {
                    setSelectedDestination(JSON.stringify({
                      name: selectedUniversity.name,
                      city: selectedUniversity.city,
                      country: selectedUniversity.country
                    }));
                  }
                }}
                className="w-full bg-gradient-to-r from-[#1e5a6d] to-[#2a7a91] text-white py-3 rounded-xl hover:opacity-90 transition-opacity font-bold"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Modal - For Admins */}
      {showApplicationModal && selectedConference && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`rounded-3xl max-w-md w-full shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="bg-gradient-to-br from-[#1e5a6d] to-[#2a7a91] p-6 rounded-t-3xl text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Presentation size={32} className="text-[#1e5a6d]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Solicitud Recibida</h2>
            </div>

            <div className="p-6 space-y-4">
              <div className={`rounded-xl p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Has solicitado inscripción a:
                </p>
                <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {selectedConference.name}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {selectedConference.city}, {selectedConference.country}
                </p>
                <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  {selectedConference.eventDate}
                </p>
              </div>

              <div className={`rounded-xl p-4 ${darkMode ? 'bg-blue-900/30 border-2 border-blue-700' : 'bg-blue-50 border-2 border-blue-200'}`}>
                <p className={`text-sm text-center ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                  📧 <strong>En breve</strong>, un coordinador de Relaciones Externas se pondrá en contacto contigo vía correo electrónico con información sobre financiamiento, registro y envío de papers.
                </p>
              </div>

              <div className={`rounded-xl p-3 ${darkMode ? 'bg-yellow-900/30' : 'bg-yellow-50'}`}>
                <p className={`text-xs text-center ${darkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
                  ⚠️ Asegúrate de revisar tu bandeja de entrada y spam regularmente
                </p>
              </div>

              <button
                onClick={() => {
                  setShowApplicationModal(false);
                  setSelectedConference(null);
                  // Desbloquear la ruta embajador y el kit de herramientas
                  if (onUnlockRoute) {
                    onUnlockRoute();
                  }
                  if (onUnlockToolkit) {
                    onUnlockToolkit();
                  }
                  // Guardar el destino seleccionado
                  if (selectedConference && setSelectedDestination) {
                    setSelectedDestination(JSON.stringify({
                      name: selectedConference.name,
                      city: selectedConference.city,
                      country: selectedConference.country
                    }));
                  }
                }}
                className="w-full bg-gradient-to-r from-[#1e5a6d] to-[#2a7a91] text-white py-3 rounded-xl hover:opacity-90 transition-opacity font-bold"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}