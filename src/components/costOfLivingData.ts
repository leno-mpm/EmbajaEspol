export interface CostOfLivingDestination {
  id: string;
  name: string;
  flag: string;
  language: string;
  currency: string;
  currencyCode: string;
  exchangeRate: string;
  costs: {
    cheapRestaurant: string;
    mealFor2: string;
    apt1Bedroom: string;
    apt3Bedroom: string;
  };
  visa: string[];
  transport: string[];
  culture: string[];
}

export const costOfLivingDestinations: CostOfLivingDestination[] = [
  {
    id: 'austria',
    name: 'Austria',
    flag: '🇦🇹',
    language: 'Alemán',
    currency: 'Euro',
    currencyCode: 'EUR',
    exchangeRate: '1 € = 1.06 USD',
    costs: {
      cheapRestaurant: '14 €',
      mealFor2: '60 €',
      apt1Bedroom: '738.72 €',
      apt3Bedroom: '1,354.06 €'
    },
    visa: [
      'Visa tipo C (hasta 90 días)',
      'Visa tipo D (hasta 6 meses)',
      'Para más de 6 meses: permiso de residencia de estudiante',
      'Costo aproximado: 100 €'
    ],
    transport: [
      'Cercanías',
      'AVE (trenes de alta velocidad)',
      'Taxis',
      'Autobús'
    ],
    culture: [
      'Rica en historia y seguridad',
      'Alto nivel de vida',
      'Enfoque en familia, naturaleza y deportes'
    ]
  },
  {
    id: 'dominican-republic',
    name: 'República Dominicana',
    flag: '🇩🇴',
    language: 'Español',
    currency: 'Peso dominicano',
    currencyCode: 'DOP',
    exchangeRate: '1 peso = 0.018 USD',
    costs: {
      cheapRestaurant: '$6.41',
      mealFor2: '$36.65',
      apt1Bedroom: '$492.11',
      apt3Bedroom: '$841.81'
    },
    visa: [
      'Visa de estudiante renovable anualmente',
      'Requisitos: formulario, carta de aceptación, pasaporte',
      'Solvencia económica, certificado médico'
    ],
    transport: [
      'Metro de Santo Domingo',
      'Taxis 24h',
      'Uber y Cabify',
      'Autobuses y "guaguas"',
      'Mototaxis'
    ],
    culture: [
      'Fusión española, africana y taína',
      'Música: bachata y merengue',
      'Arquitectura colonial',
      'Gente amigable'
    ]
  },
  {
    id: 'italy',
    name: 'Italia',
    flag: '🇮🇹',
    language: 'Italiano',
    currency: 'Euro',
    currencyCode: 'EUR',
    exchangeRate: '1 € = 1.06 USD',
    costs: {
      cheapRestaurant: '15 €',
      mealFor2: '60 €',
      apt1Bedroom: '661.31 €',
      apt3Bedroom: '1,277 €'
    },
    visa: [
      'Visa tipo C (corta estancia, hasta 90 días)',
      'Visa tipo D (larga duración, más de 90 días)',
      'Requisitos: carta de aceptación, prueba de fondos (450-515 €/mes)',
      'Seguro médico obligatorio'
    ],
    transport: [
      'Autobús',
      'Metro',
      'Tranvía',
      'Taxi'
    ],
    culture: [
      'Rica en arte y cultura',
      'Baja criminalidad',
      'Precauciones normales en grandes ciudades'
    ]
  },
  {
    id: 'germany',
    name: 'Alemania',
    flag: '🇩🇪',
    language: 'Alemán',
    currency: 'Euro',
    currencyCode: 'EUR',
    exchangeRate: '1 € = 1.06 USD',
    costs: {
      cheapRestaurant: '12 €',
      mealFor2: '50 €',
      apt1Bedroom: 'Varía por ciudad',
      apt3Bedroom: 'Varía por ciudad'
    },
    visa: [
      'Solicitar 3 meses antes del viaje',
      'Requisitos: pasaporte, carta de aceptación',
      'Prueba de fondos: 8,700 €/año',
      'Seguro médico y certificado de idioma',
      'Permiso de residencia al llegar'
    ],
    transport: [
      'Autobuses',
      'Trenes (Deutsche Bahn)',
      'Taxis',
      'Alquiler de coches'
    ],
    culture: [
      'País pacífico con libertad religiosa',
      'Gente amable y acogedora',
      'Alta cualificación profesional'
    ]
  },
  {
    id: 'france',
    name: 'Francia',
    flag: '🇫🇷',
    language: 'Francés',
    currency: 'Euro',
    currencyCode: 'EUR',
    exchangeRate: '1 € = 1.06 USD',
    costs: {
      cheapRestaurant: '15 €',
      mealFor2: '60 €',
      apt1Bedroom: '759.38 €',
      apt3Bedroom: '1,611.04 €'
    },
    visa: [
      'Tipos según duración (corta, larga hasta 6 meses, larga más de 6 meses)',
      'Costo: 50-99 €',
      'Requisitos: aceptación por institución',
      'Prueba de fondos suficientes'
    ],
    transport: [
      'Ferrocarril (TGV)',
      'Tranvías',
      'Taxis',
      'Autobuses'
    ],
    culture: [
      'Comida y vino fundamentales',
      'Alta costura y moda',
      'Festividades cristianas importantes'
    ]
  },
  {
    id: 'canada',
    name: 'Canadá',
    flag: '🇨🇦',
    language: 'Inglés',
    currency: 'Dólar canadiense',
    currencyCode: 'CAD',
    exchangeRate: '1 CAD = 0.73 USD',
    costs: {
      cheapRestaurant: '$20',
      mealFor2: '$85',
      apt1Bedroom: 'Varía por ciudad',
      apt3Bedroom: 'Varía por ciudad'
    },
    visa: [
      'Trámite online disponible',
      'Pago de tarifa: ~150 CAD',
      'Requisitos: pasaporte, carta de aceptación',
      'Prueba de fondos: ~833 CAD/mes',
      'Certificado de inglés'
    ],
    transport: [
      'Autobús',
      'Tren',
      'Taxi',
      'Metro',
      'Avión'
    ],
    culture: [
      'Gente tolerante y educada',
      'Sentido de comunidad',
      'Valoran honestidad y puntualidad',
      'Multiculturalismo'
    ]
  },
  {
    id: 'spain',
    name: 'España',
    flag: '🇪🇸',
    language: 'Español',
    currency: 'Euro',
    currencyCode: 'EUR',
    exchangeRate: '1 € = 1.06 USD',
    costs: {
      cheapRestaurant: '12 €',
      mealFor2: '50 €',
      apt1Bedroom: '740.99 €',
      apt3Bedroom: '1,247.65 €'
    },
    visa: [
      'Visa de estudiante Schengen',
      'Formulario y pasaporte válido',
      'Seguro médico (30,000 €)',
      'Reserva de viaje',
      'Prueba de fondos'
    ],
    transport: [
      'Cercanías Renfe',
      'AVE (alta velocidad)',
      'Taxis',
      'Autobús'
    ],
    culture: [
      'Flamenco y toros',
      'Playas paradisíacas',
      'Sociedad pacífica',
      'Baja criminalidad en la UE'
    ]
  },
  {
    id: 'mexico',
    name: 'México',
    flag: '🇲🇽',
    language: 'Español',
    currency: 'Peso mexicano',
    currencyCode: 'MXN',
    exchangeRate: '1 MXN = 0.053 USD',
    costs: {
      cheapRestaurant: 'MXN 150',
      mealFor2: 'MXN 600',
      apt1Bedroom: 'MXN 9,239.10',
      apt3Bedroom: 'MXN 16,313.51'
    },
    visa: [
      'Solicitud en línea o consulado',
      'Costo: ~$51 USD',
      'Requisitos: formulario, pasaporte, fotografía',
      'Solvencia económica'
    ],
    transport: [
      'Metro',
      'Metrobús',
      'Taxis',
      'Microbuses',
      'Eco-bici'
    ],
    culture: [
      'Diversa: indígena y europea',
      'Mejora en seguridad',
      'Rica en tradiciones'
    ]
  },
  {
    id: 'argentina',
    name: 'Argentina',
    flag: '🇦🇷',
    language: 'Español',
    currency: 'Peso argentino',
    currencyCode: 'ARS',
    exchangeRate: '1 ARS = 0.0049 USD',
    costs: {
      cheapRestaurant: '$6.12',
      mealFor2: '$25',
      apt1Bedroom: '$233.83',
      apt3Bedroom: '$454.02'
    },
    visa: [
      'Ingreso como turista, luego trámite en migración',
      'Válida máximo 6 meses, renovable',
      'Requisitos: pasaporte, carta de aceptación',
      'Antecedentes penales, prueba de fondos'
    ],
    transport: [
      'Transporte público',
      'Trenes',
      'Subte (metro)',
      'Bicicleta',
      'Metrobús'
    ],
    culture: [
      'Gente afectuosa (saludos con besos)',
      'Importancia de amigos y asados',
      'Economía inestable'
    ]
  },
  {
    id: 'el-salvador',
    name: 'El Salvador',
    flag: '🇸🇻',
    language: 'Español',
    currency: 'Colón salvadoreño',
    currencyCode: 'SVC',
    exchangeRate: '1 colón = 0.11 USD',
    costs: {
      cheapRestaurant: '$7',
      mealFor2: '$27.44',
      apt1Bedroom: '$581.25',
      apt3Bedroom: '$888.24'
    },
    visa: [
      'Consultar requisitos específicos según país de origen'
    ],
    transport: [
      'Taxis',
      'Autobuses',
      'Colectivos',
      'Mototaxis'
    ],
    culture: [
      'Pueblo alegre',
      'Influencia española',
      'Muy creyente',
      'Gastronomía: maíz, frijol, café'
    ]
  },
  {
    id: 'costa-rica',
    name: 'Costa Rica',
    flag: '🇨🇷',
    language: 'Español',
    currency: 'Colón costarricense',
    currencyCode: 'CRC',
    exchangeRate: '1 colón = 0.0018 USD',
    costs: {
      cheapRestaurant: '$7.69',
      mealFor2: '$42.70',
      apt1Bedroom: '$542.57',
      apt3Bedroom: '$971.44'
    },
    visa: [
      'Visa provisional de categoría especial',
      'Trámite digital o físico en consulado'
    ],
    transport: [
      'Taxis',
      'Autobuses',
      'Avionetas',
      'Shuttles privados'
    ],
    culture: [
      'País mestizo y pluricultural',
      'Sin ejército ("Suiza de América Central")',
      'Enfoque en familia y equilibrio vida-trabajo'
    ]
  },
  {
    id: 'chile',
    name: 'Chile',
    flag: '🇨🇱',
    language: 'Español',
    currency: 'Peso chileno',
    currencyCode: 'CLP',
    exchangeRate: '1 CLP = 0.0012 USD',
    costs: {
      cheapRestaurant: '$8.11',
      mealFor2: '$40.60',
      apt1Bedroom: '$424.60',
      apt3Bedroom: '$751.90'
    },
    visa: [
      'Trámite en consulado',
      'Requisitos: carta de aceptación, solvencia económica',
      'Antecedentes penales, certificado médico'
    ],
    transport: [
      'Autobuses',
      'Colectivos',
      'Tren',
      'Taxi',
      'Metro',
      'Avión'
    ],
    culture: [
      'Mezcla indígena (mapuche) y española',
      'Influencia europea',
      'Pasión por fútbol y rodeo',
      'Diversidad geográfica y gastronómica'
    ]
  },
  {
    id: 'peru',
    name: 'Perú',
    flag: '🇵🇪',
    language: 'Español',
    currency: 'Sol peruano',
    currencyCode: 'PEN',
    exchangeRate: '1 sol = 0.26 USD',
    costs: {
      cheapRestaurant: '$3.15',
      mealFor2: '$20.99',
      apt1Bedroom: 'Varía por ciudad',
      apt3Bedroom: 'Varía por ciudad'
    },
    visa: [
      'Institución educativa solicita visa a migraciones',
      'Requisitos: formulario, pasaporte',
      'Carta de aceptación, reserva de pasaje'
    ],
    transport: [
      'Station wagons',
      'Mototaxis',
      'Metropolitano',
      'Metro',
      'Combis',
      'Taxis'
    ],
    culture: [
      'Fusión hispana y nativa (quechua, aymara)',
      'Arte y arquitectura impresionantes',
      'Cocina mundialmente famosa',
      'Gente educada y ceremoniosa'
    ]
  },
  {
    id: 'venezuela',
    name: 'Venezuela',
    flag: '🇻🇪',
    language: 'Español',
    currency: 'Bolívar',
    currencyCode: 'VES',
    exchangeRate: '1 bolívar = 0.00000041411 USD',
    costs: {
      cheapRestaurant: '$10',
      mealFor2: '$50',
      apt1Bedroom: '$236.26',
      apt3Bedroom: '$458.32'
    },
    visa: [
      'Visa de transeúnte estudiante',
      'Vigencia: 1 año, renovable'
    ],
    transport: [
      'Subterráneo',
      'Buses (ómnibus colectivo)',
      'Metro',
      'Coche',
      'Motocicleta'
    ],
    culture: [
      'Crisol indígena, africana y española',
      'Diversidad en danzas, música y rituales'
    ]
  },
  {
    id: 'bolivia',
    name: 'Bolivia',
    flag: '🇧🇴',
    language: 'Español',
    currency: 'Boliviano',
    currencyCode: 'BOB',
    exchangeRate: '1 BOB = 0.14 USD',
    costs: {
      cheapRestaurant: '$20',
      mealFor2: '$140',
      apt1Bedroom: '$367.12',
      apt3Bedroom: 'Varía por ciudad'
    },
    visa: [
      'Requisitos: formulario, pasaporte, fotografía',
      'Carta de aceptación, antecedentes penales',
      'Costo: $50'
    ],
    transport: [
      'Microbús',
      'Trenes',
      'Taxis',
      'Autobuses'
    ],
    culture: [
      'Lugares paradisíacos',
      'Platos típicos variados',
      'Sociedad trabajadora y hospitalaria',
      'Orientada a la familia'
    ]
  },
  {
    id: 'uruguay',
    name: 'Uruguay',
    flag: '🇺🇾',
    language: 'Español',
    currency: 'Peso uruguayo',
    currencyCode: 'UYU',
    exchangeRate: '1 UYU = 0.025 USD',
    costs: {
      cheapRestaurant: '$15.22',
      mealFor2: '$52.45',
      apt1Bedroom: '$547.97',
      apt3Bedroom: '$919.70'
    },
    visa: [
      'No requerida para latinoamericanos, estadounidenses, canadienses y europeos',
      'Ingreso como turista (90 días), extensión posible'
    ],
    transport: [
      'Autobús (principal medio)',
      'También llamado bus, colectivo, ómnibus o bondi'
    ],
    culture: [
      'Variada por influencia inmigrante',
      'Tradiciones: mate, tango, asado, fútbol',
      'Carnaval más largo del mundo'
    ]
  },
  {
    id: 'colombia',
    name: 'Colombia',
    flag: '🇨🇴',
    language: 'Español',
    currency: 'Peso colombiano',
    currencyCode: 'COP',
    exchangeRate: '1 COP = 0.00021 USD',
    costs: {
      cheapRestaurant: '$3.09',
      mealFor2: '$16.69',
      apt1Bedroom: '$237.02',
      apt3Bedroom: '$428.88'
    },
    visa: [
      'Visa tipo V, vigencia 1-5 años',
      'Requisitos: certificado de admisión',
      'Extractos bancarios (10 salarios mínimos/mes)',
      'Copia de pasaporte'
    ],
    transport: [
      'Taxis',
      'Autobuses',
      'Tranvías',
      'Ferris',
      'Ferrocarriles'
    ],
    culture: [
      'Mezcla europea e indígena',
      'Regionalismo marcado',
      'Fútbol y carnaval como unificadores',
      'Música esencial: cumbia, vallenato'
    ]
  },
  {
    id: 'brazil',
    name: 'Brasil',
    flag: '🇧🇷',
    language: 'Portugués',
    currency: 'Real brasileño',
    currencyCode: 'BRL',
    exchangeRate: '1 BRL = 0.19 USD',
    costs: {
      cheapRestaurant: '$25',
      mealFor2: '$149.78',
      apt1Bedroom: '$1,577.46',
      apt3Bedroom: 'Varía por ciudad'
    },
    visa: [
      'Documentos: pasaporte, fotos, comprobante de inscripción',
      'Certificado policial, tarifa $180',
      'Válida por duración de estudios, entrada múltiple'
    ],
    transport: [
      'Colectivos grandes',
      'Trenes',
      'Subterráneos',
      'Tranvías',
      'Taxis',
      'Barcos'
    ],
    culture: [
      'Delincuencia importante (robos menores comunes)',
      'Gente relajada que valora disfrutar la vida',
      'Carnaval como gran festividad'
    ]
  },
  {
    id: 'panama',
    name: 'Panamá',
    flag: '🇵🇦',
    language: 'Español',
    currency: 'Dólar estadounidense / Balboa',
    currencyCode: 'USD/PAB',
    exchangeRate: '1:1',
    costs: {
      cheapRestaurant: '$7',
      mealFor2: '$50',
      apt1Bedroom: '$734.14',
      apt3Bedroom: '$1,340.91'
    },
    visa: [
      'Solo para quienes se dediquen exclusivamente a estudiar (prohibido trabajar)',
      'Requisitos: carta de admisión, comprobante de pago',
      'Solvencia económica'
    ],
    transport: [
      'Ferris',
      'Ferrocarriles',
      'Transporte público',
      'Taxis',
      'Lanzaderas',
      'Autobuses'
    ],
    culture: [
      'Festividades populares: Carnavales, Semana Santa',
      'Baja tasa de delitos comunes comparado con vecinos'
    ]
  }
];
