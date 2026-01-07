import { ChevronLeft, ChevronRight, Lock, X, CheckCircle, Clock, Globe, Calendar, FileText, Upload, ArrowLeft, AlertCircle, Check, History, HelpCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface RouteScreenProps {
  onBack: () => void;
  onNavigateToGuide?: () => void;
  darkMode?: boolean;
  userRole?: string;
  isUnlocked?: boolean;
  selectedDestination?: string;
  openTaskId?: number | null; // Nueva prop para abrir tarea específica desde pendientes
}

interface Activity {
  id: number;
  title: string;
  description: string;
  phase: 'before' | 'during' | 'after';
  obligatory: boolean;
  isObligatory?: boolean; // Añadido para marcar actividades obligatorias
  deadline: string;
  task: string;
  documentRequired: string;
}

export function RouteScreen({ onBack, onNavigateToGuide, darkMode = false, userRole = 'estudiante', isUnlocked = false, selectedDestination = '', openTaskId = null }: RouteScreenProps) {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: number]: File | string | null }>({});
  const [completedActivities, setCompletedActivities] = useState<{ [key: number]: boolean }>({});
  const [selectedPhase, setSelectedPhase] = useState<'before' | 'during' | 'after'>('before');
  const [viewHistory, setViewHistory] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [routeCompleted, setRouteCompleted] = useState(false);
  const [showCompletedOptions, setShowCompletedOptions] = useState(false);
  const [viewingCompletedRoute, setViewingCompletedRoute] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showLockedAlert, setShowLockedAlert] = useState(false);
  const [fileErrors, setFileErrors] = useState<{ [key: number]: string }>({});
  const [showContinueMessage, setShowContinueMessage] = useState(false);

  // Parsear destino seleccionado
  const getDestinationInfo = () => {
    try {
      if (!selectedDestination) return null;
      const parsed = JSON.parse(selectedDestination);
      // Verificar que tenga los campos necesarios
      if (parsed.name && parsed.city && parsed.country) {
        return {
          name: parsed.name,
          city: parsed.city,
          country: parsed.country
        };
      }
      return null;
    } catch {
      // Si no es JSON, es un string antiguo - retornar null
      return null;
    }
  };

  const destinationInfo = getDestinationInfo();

  // Cargar estado desde localStorage al montar
  useEffect(() => {
    // Solo cargar si la ruta ya estaba inicializada previamente
    const routeInitialized = localStorage.getItem('routeInitialized');
    
    if (routeInitialized === 'true') {
      const savedCompleted = localStorage.getItem('routeCompleted');
      const savedActivities = localStorage.getItem('completedActivities');
      
      // Cargar actividades completadas solo si ya existían
      if (savedActivities) {
        const parsedActivities = JSON.parse(savedActivities);
        setCompletedActivities(parsedActivities);
        
        // Mostrar mensaje "Continuar donde lo dejaste" si hay progreso y no viene de tarea pendiente
        const hasProgress = Object.keys(parsedActivities).length > 0;
        if (hasProgress && openTaskId === null) {
          setShowContinueMessage(true);
          // Ocultar mensaje después de 4 segundos
          setTimeout(() => setShowContinueMessage(false), 4000);
        }
      }
      
      // Cargar archivos subidos guardados
      const savedFiles = localStorage.getItem('uploadedFiles');
      if (savedFiles) {
        const parsedFiles = JSON.parse(savedFiles);
        // Los archivos se cargan como nombres, no como File objects
        // Esto es solo para mostrar que están cargados
        setUploadedFiles(parsedFiles);
      }
      
      if (savedCompleted === 'true') {
        setRouteCompleted(true);
        setShowCompletedOptions(true);
      }
    }
    
    // Si viene desde tareas pendientes con una tarea específica, abrirla automáticamente
    if (openTaskId !== null && openTaskId !== undefined) {
      const activitiesList = userRole === 'estudiante' ? studentActivities : adminActivities;
      const taskToOpen = activitiesList.find(act => act.id === openTaskId);
      if (taskToOpen) {
        setSelectedActivity(taskToOpen);
        setShowDetailsModal(true);
        setSelectedPhase(taskToOpen.phase);
      }
    }
    // Si es la primera vez (no hay routeInitialized), las actividades comienzan en 0
  }, [openTaskId, userRole]);

  // Actualizar localStorage cada vez que cambian las actividades completadas
  useEffect(() => {
    if (isUnlocked) {
      // Guardar actividades completadas
      localStorage.setItem('routeInitialized', 'true');
      localStorage.setItem('completedActivities', JSON.stringify(completedActivities));
      
      // Calcular siguiente actividad pendiente
      const activitiesList = userRole === 'estudiante' ? studentActivities : adminActivities;
      const nextPendingActivity = activitiesList.find(activity => 
        !completedActivities[activity.id] && activity.obligatory
      );
      
      if (nextPendingActivity) {
        localStorage.setItem('currentPendingTask', JSON.stringify({
          id: nextPendingActivity.id,
          title: nextPendingActivity.title,
          deadline: nextPendingActivity.deadline,
          obligatory: nextPendingActivity.obligatory
        }));
      } else {
        // Si no hay actividades obligatorias pendientes, eliminar la tarea pendiente
        localStorage.removeItem('currentPendingTask');
      }

      // Verificar si todas las actividades obligatorias están completadas
      const allObligatoryCompleted = activitiesList
        .filter(activity => activity.obligatory)
        .every(activity => completedActivities[activity.id]);
      
      if (allObligatoryCompleted && Object.keys(completedActivities).length > 0) {
        const wasCompleted = localStorage.getItem('routeCompleted') === 'true';
        localStorage.setItem('routeCompleted', 'true');
        
        // Si acaba de completarse (no estaba completada antes), incrementar el contador de viajes
        if (!wasCompleted && !routeCompleted) {
          const currentTrips = parseInt(localStorage.getItem('completedTrips') || '0', 10);
          localStorage.setItem('completedTrips', String(currentTrips + 1));
        }
      } else {
        localStorage.removeItem('routeCompleted');
      }
    }
  }, [completedActivities, isUnlocked, userRole]);

  // Guardar actividades completadas solo cuando el componente se desmonta
  useEffect(() => {
    return () => {
      // Cleanup adicional al salir (ya está manejado en el efecto anterior)
    };
  }, []);

  // Guardar estado en localStorage cuando cambia
  useEffect(() => {
    if (routeCompleted) {
      localStorage.setItem('routeCompleted', 'true');
      localStorage.setItem('completedActivities', JSON.stringify(completedActivities));
      localStorage.setItem('selectedDestination', selectedDestination);
    }
  }, [routeCompleted, completedActivities, selectedDestination]);

  // Guardar archivos subidos en localStorage
  useEffect(() => {
    if (isUnlocked && Object.keys(uploadedFiles).length > 0) {
      // Convertir Files a formato serializable (solo guardar nombres)
      const fileData: { [key: number]: string } = {};
      Object.entries(uploadedFiles).forEach(([id, file]) => {
        if (file) {
          fileData[parseInt(id)] = file.name;
        }
      });
      localStorage.setItem('uploadedFiles', JSON.stringify(fileData));
    }
  }, [uploadedFiles, isUnlocked]);

  // Actividades para estudiantes
  const studentActivities: Activity[] = [
    {
      id: 1,
      title: 'Revisión de requisitos de movilidad',
      description: 'Revisa todos los requisitos académicos y administrativos necesarios para participar en el programa de movilidad estudiantil.',
      phase: 'before',
      obligatory: true,
      isObligatory: true,
      deadline: '15 Ene 2025',
      task: 'Leer y verificar la lista completa de requisitos proporcionada por la coordinación.',
      documentRequired: 'Subir captura de pantalla confirmando que has revisado los requisitos.'
    },
    {
      id: 2,
      title: 'Subir documentos',
      description: 'Carga los documentos requeridos: pasaporte vigente, certificado de matrícula, carta de motivación y otros documentos solicitados.',
      phase: 'before',
      obligatory: true,
      deadline: '30 Ene 2025',
      task: 'Recopilar y digitalizar todos los documentos oficiales requeridos.',
      documentRequired: 'Pasaporte vigente, certificado de matrícula, carta de motivación en PDF.'
    },
    {
      id: 3,
      title: 'Firma de convenio de estudios',
      description: 'Firma el convenio de estudios que establece las materias que cursarás en la universidad de destino y su equivalencia.',
      phase: 'before',
      obligatory: true,
      deadline: '15 Feb 2025',
      task: 'Coordinar con tu coordinador académico las materias a cursar en el extranjero.',
      documentRequired: 'Convenio de estudios firmado digitalmente o escaneado en PDF.'
    },
    {
      id: 4,
      title: 'Aprobación del coordinador académico',
      description: 'Espera la aprobación de tu coordinador académico quien validará tu plan de estudios y elegibilidad.',
      phase: 'before',
      obligatory: true,
      deadline: '28 Feb 2025',
      task: 'Agendar reunión con el coordinador y presentar tu plan académico.',
      documentRequired: 'Carta de aprobación del coordinador firmada.'
    },
    {
      id: 5,
      title: 'Asistencia a charla informativa',
      description: 'Participa en la charla informativa obligatoria sobre el proceso de movilidad, cultura del país destino y aspectos administrativos.',
      phase: 'before',
      obligatory: true,
      deadline: '10 Mar 2025',
      task: 'Asistir presencialmente o virtualmente a la charla programada.',
      documentRequired: 'Certificado de asistencia (se enviará automáticamente tras la charla).'
    },
    {
      id: 6,
      title: 'Revisión de seguro médico internacional',
      description: 'Verifica tu cobertura de seguro médico internacional y asegúrate de tener toda la documentación necesaria.',
      phase: 'before',
      obligatory: true,
      deadline: '20 Mar 2025',
      task: 'Revisar la póliza de seguro y contactos de emergencia.',
      documentRequired: 'Copia de la póliza del seguro médico internacional.'
    },
    {
      id: 7,
      title: 'Gestión de visa / trámites migratorios',
      description: 'Realiza los trámites necesarios para obtener la visa de estudiante según los requisitos del país destino.',
      phase: 'before',
      obligatory: true,
      deadline: '15 Abr 2025',
      task: 'Completar formularios y agendar cita en el consulado.',
      documentRequired: 'Copia del pasaporte con visa de estudiante aprobada.'
    },
    {
      id: 8,
      title: 'Compra de boletos',
      description: 'Adquiere tus boletos de avión ida y vuelta. Guarda los comprobantes para posibles reembolsos.',
      phase: 'before',
      obligatory: true,
      deadline: '30 Abr 2025',
      task: 'Comparar opciones de vuelo y realizar la compra.',
      documentRequired: 'E-ticket o confirmación de reserva en PDF.'
    },
    {
      id: 9,
      title: 'Confirmación de alojamiento',
      description: 'Confirma tu lugar de residencia en el país destino: residencia universitaria, apartamento o familia anfitriona.',
      phase: 'before',
      obligatory: true,
      deadline: '10 May 2025',
      task: 'Coordinar con la universidad receptora o buscar alojamiento privado.',
      documentRequired: 'Contrato de alojamiento o carta de confirmación de residencia.'
    },
    {
      id: 10,
      title: 'Entrega de documentos finales',
      description: 'Entrega todos los documentos finales requeridos antes de tu partida a la oficina de Relaciones Internacionales.',
      phase: 'before',
      obligatory: true,
      deadline: '25 May 2025',
      task: 'Compilar carpeta digital con todos los documentos procesados.',
      documentRequired: 'Carpeta ZIP con todos los documentos mencionados anteriormente.'
    },
    {
      id: 11,
      title: 'Llegada al país destino',
      description: 'Notifica tu llegada segura a Relaciones Internacionales y a la universidad receptora.',
      phase: 'during',
      obligatory: true,
      deadline: 'Dentro de 24h de llegada',
      task: 'Enviar correo confirmando llegada con fecha y hora.',
      documentRequired: 'Foto del sello de entrada en tu pasaporte.'
    },
    {
      id: 12,
      title: 'Registro en la universidad receptora',
      description: 'Completa tu registro oficial en la universidad de destino y obtén tu credencial estudiantil.',
      phase: 'during',
      obligatory: true,
      deadline: 'Primera semana',
      task: 'Asistir a la oficina de estudiantes internacionales para el registro.',
      documentRequired: 'Foto de tu credencial estudiantil.'
    },
    {
      id: 13,
      title: 'Entrega de documentos de llegada',
      description: 'Presenta los documentos requeridos por la universidad receptora: carta de aceptación, seguro, pasaporte.',
      phase: 'during',
      obligatory: true,
      deadline: 'Primera semana',
      task: 'Entregar copias de documentos en la oficina internacional.',
      documentRequired: 'Recibo o comprobante de entrega de documentos.'
    },
    {
      id: 14,
      title: 'Inicio de clases',
      description: 'Comienza tu semestre académico. Asegúrate de que las materias coincidan con tu convenio de estudios.',
      phase: 'during',
      obligatory: true,
      deadline: 'Según calendario',
      task: 'Verificar horarios y aulas. Presentarte con tus profesores.',
      documentRequired: 'Horario oficial con firma de cada profesor.'
    },
    {
      id: 15,
      title: 'Seguimiento académico mensual',
      description: 'Envía reportes mensuales sobre tu progreso académico al coordinador de la ESPOL.',
      phase: 'during',
      obligatory: true,
      deadline: 'Cada mes',
      task: 'Llenar formulario de seguimiento con notas y asistencia.',
      documentRequired: 'Reporte mensual firmado por el tutor internacional.'
    },
    {
      id: 16,
      title: 'Actividades culturales o integraciones',
      description: 'Participa en actividades de integración cultural y eventos organizados por la universidad receptora.',
      phase: 'during',
      obligatory: false,
      deadline: 'Durante estancia',
      task: 'Asistir a al menos 3 eventos culturales o académicos.',
      documentRequired: 'Fotos y breve descripción de los eventos.'
    },
    {
      id: 17,
      title: 'Reporte de situación',
      description: 'Envía reportes bimensuales sobre tu adaptación, situación académica y cualquier eventualidad.',
      phase: 'during',
      obligatory: true,
      deadline: 'Cada 2 meses',
      task: 'Completar encuesta de bienestar y adaptación.',
      documentRequired: 'Formulario de situación completo.'
    },
    {
      id: 18,
      title: 'Contacto con tutor académico internacional',
      description: 'Mantén comunicación regular con tu tutor académico en la universidad de destino.',
      phase: 'during',
      obligatory: true,
      deadline: 'Semanal',
      task: 'Agendar reuniones periódicas con tu tutor asignado.',
      documentRequired: 'Minuta de reuniones con firma del tutor.'
    },
    {
      id: 19,
      title: 'Entrega de certificado de notas',
      description: 'Solicita y entrega el certificado oficial de notas de la universidad receptora a la ESPOL.',
      phase: 'after',
      obligatory: true,
      deadline: '15 días post-retorno',
      task: 'Solicitar transcript oficial en la universidad receptora.',
      documentRequired: 'Certificado de notas oficial sellado (PDF).'
    },
    {
      id: 20,
      title: 'Subir informe final de movilidad',
      description: 'Elabora y sube tu informe final detallando tu experiencia académica y cultural.',
      phase: 'after',
      obligatory: true,
      deadline: '30 días post-retorno',
      task: 'Redactar informe de 3-5 páginas sobre la experiencia.',
      documentRequired: 'Informe final en formato PDF con fotos.'
    },
    {
      id: 21,
      title: 'Reunión de cierre con coordinación',
      description: 'Agenda una reunión con el coordinador de movilidad para cerrar tu expediente.',
      phase: 'after',
      obligatory: true,
      deadline: '45 días post-retorno',
      task: 'Coordinar fecha para reunión presencial o virtual.',
      documentRequired: 'No requiere documento, solo asistencia confirmada.'
    },
    {
      id: 22,
      title: 'Validación y homologación de materias',
      description: 'Completa el proceso de homologación de las materias cursadas en el extranjero.',
      phase: 'after',
      obligatory: true,
      deadline: '60 días post-retorno',
      task: 'Presentar solicitud de homologación con el certificado de notas.',
      documentRequired: 'Formulario de homologación firmado por el coordinador.'
    },
    {
      id: 23,
      title: 'Encuesta de satisfacción',
      description: 'Completa la encuesta de satisfacción sobre tu experiencia de movilidad.',
      phase: 'after',
      obligatory: true,
      deadline: '70 días post-retorno',
      task: 'Llenar encuesta online (15-20 minutos).',
      documentRequired: 'Confirmación automática al completar la encuesta.'
    },
    {
      id: 24,
      title: 'Participación como embajador',
      description: 'Comparte tu experiencia con futuros postulantes y conviértete en embajador del programa.',
      phase: 'after',
      obligatory: false,
      deadline: 'Voluntario',
      task: 'Participar en ferias o charlas para futuros estudiantes.',
      documentRequired: 'No requiere documento.'
    }
  ];

  // Definir la función DESPUÉS de activities
  const isActivityUnlocked = (index: number) => {
    if (index === 0) return true; // Primera actividad siempre desbloqueada
    return completedActivities[activities[index - 1].id] === true; // Desbloqueada si la anterior está completada
  };

  const adminActivities: Activity[] = studentActivities; // Temporal

  const activities = userRole === 'estudiante' ? studentActivities : adminActivities;
  const isStudent = userRole === 'estudiante';
  
  // Contar solo actividades OBLIGATORIAS
  const obligatoryActivities = activities.filter(a => a.obligatory);
  const completedObligatoryActivities = obligatoryActivities.filter(a => completedActivities[a.id]);
  const completedObligatoryCount = completedObligatoryActivities.length;
  const totalObligatoryCount = obligatoryActivities.length;
  
  // Para el progreso general, seguir usando todas las actividades
  const completedCount = Object.keys(completedActivities).filter(id => completedActivities[parseInt(id)]).length;
  const totalCount = activities.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);
  
  // Todas las OBLIGATORIAS completadas
  const allObligatoryCompleted = completedObligatoryCount === totalObligatoryCount;

  // Encontrar la actividad actual (primera no completada)
  const currentActivityIndex = activities.findIndex((activity, index) => !completedActivities[activity.id] && isActivityUnlocked(index));

  const handleActivityClick = (activity: Activity, index: number) => {
    // Solo permitir abrir actividades desbloqueadas
    if (isActivityUnlocked(index)) {
      setSelectedActivity(activity);
      setShowDetailsModal(true);
      // Limpiar error previo al abrir nueva actividad
      setFileErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[activity.id];
        return newErrors;
      });
    } else {
      // Mostrar alerta si está bloqueada
      setShowLockedAlert(true);
    }
  };

  const handleFileUpload = (activityId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    // Limpiar error previo
    setFileErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[activityId];
      return newErrors;
    });
    
    if (file) {
      // Validar formato (solo PDF)
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (fileExtension !== 'pdf') {
        setFileErrors(prev => ({ 
          ...prev, 
          [activityId]: 'El archivo debe estar en formato PDF. Por favor, convierte tu documento a PDF antes de subirlo.' 
        }));
        event.target.value = ''; // Limpiar input
        return;
      }
      
      // Validar tamaño (máximo 5MB)
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSizeInBytes) {
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        setFileErrors(prev => ({ 
          ...prev, 
          [activityId]: `El archivo supera el tamaño máximo permitido. Tu archivo pesa ${fileSizeMB}MB. El tamaño máximo es 5MB. Intenta comprimir el archivo o usa una calidad menor.` 
        }));
        event.target.value = ''; // Limpiar input
        return;
      }
      
      // Si pasa todas las validaciones, guardar el archivo
      setUploadedFiles(prev => ({ ...prev, [activityId]: file }));
    }
  };

  const handleCompleteActivity = (activityId: number) => {
    setCompletedActivities(prev => ({ ...prev, [activityId]: true }));
    setShowDetailsModal(false);
    setSelectedActivity(null);
    
    // Check if all obligatory activities are now completed
    const newCompleted = { ...completedActivities, [activityId]: true };
    const newCompletedObligatory = obligatoryActivities.filter(a => newCompleted[a.id]);
    if (newCompletedObligatory.length === totalObligatoryCount) {
      setShowCongratulations(true);
      setRouteCompleted(true);
    }
  };

  // Vista bloqueada
  if (!isUnlocked) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <header className={`px-4 py-3 flex items-center sticky top-0 z-40 shadow-sm transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <button
            onClick={onBack}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <ChevronLeft size={24} className={darkMode ? 'text-gray-300' : 'text-gray-800'} />
          </button>
          <div className="ml-2 flex-1">
            <h1 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Ruta Embajador</h1>
          </div>
        </header>

        <main className="px-4 py-12 max-w-md mx-auto flex items-center justify-center min-h-[70vh]">
          <div className={`rounded-3xl p-8 text-center shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
              <Lock size={48} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
            </div>
            <h2 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Ruta Bloqueada
            </h2>
            <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Debes escoger un destino y tener aprobada su movilidad por <span className="font-bold text-[#1e5a6d]">RELEX</span>
            </p>
            <button
              onClick={onNavigateToGuide}
              className="w-full bg-gradient-to-r from-[#1e5a6d] to-[#2a7a91] text-white py-3 px-6 rounded-xl hover:opacity-90 transition-opacity font-bold flex items-center justify-center gap-2"
            >
              <Globe size={20} />
              Guía de destinos
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Vista desbloqueada
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <header className={`px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center flex-1">
          <button
            onClick={onBack}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <ChevronLeft size={24} className={darkMode ? 'text-gray-300' : 'text-gray-800'} />
          </button>
          <div className="ml-2">
            <h1 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Ruta Embajador</h1>
            {selectedDestination && (
              <div className="flex items-center gap-1 mt-0.5">
                <Globe size={14} className="text-[#1e5a6d]" />
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {destinationInfo && destinationInfo.city && destinationInfo.country 
                    ? `${destinationInfo.city}, ${destinationInfo.country} - ${destinationInfo.name}`
                    : 'Destino seleccionado (actualiza desde Guía de Destinos)'}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Banner informativo si el destino está en formato antiguo */}
      {selectedDestination && !destinationInfo && (
        <div className="px-4 pt-4">
          <div className={`max-w-2xl mx-auto rounded-xl p-4 ${darkMode ? 'bg-yellow-900/30 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'} flex items-center gap-3`}>
            <AlertCircle size={20} className="text-yellow-600 flex-shrink-0" />
            <div className="flex-1">
              <p className={`text-sm font-bold ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                Información de destino incompleta
              </p>
              <p className={`text-xs ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                Para ver el destino completo, vuelve a seleccionar tu universidad en "Guía de Destinos"
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Mensaje de "Continuar donde lo dejaste" - Clickeable */}
      {showContinueMessage && (() => {
        // Encontrar la primera actividad no completada
        const activities = isStudent ? studentActivities : adminActivities;
        const firstIncompleteActivity = activities.find(activity => !completedActivities[activity.id]);
        
        return (
          <div className="px-4 pt-4">
            <button
              onClick={() => {
                if (firstIncompleteActivity) {
                  // Hacer scroll hacia la actividad
                  const element = document.getElementById(`activity-${firstIncompleteActivity.id}`);
                  element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  // Ocultar el mensaje
                  setShowContinueMessage(false);
                }
              }}
              className={`max-w-2xl mx-auto rounded-xl p-4 ${darkMode ? 'bg-blue-900/30 border border-blue-800 hover:bg-blue-900/50' : 'bg-blue-50 border border-blue-200 hover:bg-blue-100'} flex items-center gap-3 animate-fade-in w-full transition-all cursor-pointer`}
            >
              <History size={20} className="text-blue-600 flex-shrink-0" />
              <div className="flex-1 text-left">
                <p className={`text-sm font-bold ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                  Continuar donde lo dejaste
                </p>
                <p className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  Tienes {Object.keys(completedActivities).length} {Object.keys(completedActivities).length === 1 ? 'actividad completada' : 'actividades completadas'}
                  {firstIncompleteActivity && ` • Siguiente: ${firstIncompleteActivity.title}`}
                </p>
              </div>
              <ChevronRight size={20} className="text-blue-600 flex-shrink-0" />
            </button>
          </div>
        );
      })()}

      {/* Pantalla de Ruta Completada - 2 opciones */}
      {showCompletedOptions && routeCompleted && (
        <main className="px-4 py-12 max-w-md mx-auto flex items-center justify-center min-h-[70vh]">
          <div className={`rounded-3xl p-8 text-center shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="text-7xl mb-4">🎉</div>
            <h2 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              ¡Ruta Completada!
            </h2>
            <p className={`text-sm mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Ya completaste tu movilidad a <span className="font-bold text-[#1e5a6d]">
                {destinationInfo 
                  ? (destinationInfo.city && destinationInfo.country 
                      ? `${destinationInfo.city}, ${destinationInfo.country}`
                      : destinationInfo.name || destinationInfo.country)
                  : 'tu destino'}
              </span>
            </p>
            
            <div className="space-y-4">
              {/* Opción 1: Ver la ruta completa */}
              <button
                onClick={() => {
                  setShowCompletedOptions(false);
                  setViewingCompletedRoute(true);
                }}
                className="w-full bg-gradient-to-r from-[#1e5a6d] to-[#2a7a91] text-white py-4 px-6 rounded-xl hover:opacity-90 transition-opacity font-bold flex items-center justify-center gap-2"
              >
                <CheckCircle size={20} />
                Ver ruta completa
              </button>
              
              {/* Opción 2: Ir a guía de destinos */}
              <button
                onClick={() => {
                  // Limpiar localStorage para iniciar nueva movilidad
                  localStorage.removeItem('routeCompleted');
                  localStorage.removeItem('completedActivities');
                  localStorage.removeItem('selectedDestination');
                  onNavigateToGuide?.();
                }}
                className={`w-full py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Globe size={20} />
                Elegir otro destino
              </button>
            </div>
          </div>
        </main>
      )}

      {/* Contenido normal cuando NO se muestran opciones */}
      {(!showCompletedOptions || !routeCompleted || viewingCompletedRoute) && (
        <main className="px-4 py-6 max-w-md mx-auto pb-24">
          {/* Botón "Volver a opciones" cuando está viendo ruta completada */}
          {viewingCompletedRoute && (
            <button
              onClick={() => {
                setViewingCompletedRoute(false);
                setShowCompletedOptions(true);
              }}
              className={`mb-6 w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <ArrowLeft size={20} />
              Volver a opciones
            </button>
          )}
          
          {/* Phase Tabs - For navigation */}
          <div className={`rounded-2xl p-1 mb-6 grid grid-cols-3 gap-1 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <button
              onClick={() => {
                const firstBeforeIndex = activities.findIndex(a => a.phase === 'before');
                if (firstBeforeIndex !== -1) {
                  const element = document.getElementById(`activity-${activities[firstBeforeIndex].id}`);
                  element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className={`py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🔵 Antes
            </button>
            <button
              onClick={() => {
                const firstDuringIndex = activities.findIndex(a => a.phase === 'during');
                if (firstDuringIndex !== -1) {
                  const element = document.getElementById(`activity-${activities[firstDuringIndex].id}`);
                  element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className={`py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🟢 Durante
            </button>
            <button
              onClick={() => {
                const firstAfterIndex = activities.findIndex(a => a.phase === 'after');
                if (firstAfterIndex !== -1) {
                  const element = document.getElementById(`activity-${activities[firstAfterIndex].id}`);
                  element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className={`py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🟣 Después
            </button>
          </div>

          {/* Progress Bar */}
          <div className={`rounded-2xl p-5 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Tu Progreso
              </h3>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {progressPercentage}%
                </span>
                <span className={`text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                  {completedCount}/{totalCount}
                </span>
              </div>
            </div>
            <div className={`w-full h-3 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div
                className="h-full bg-gradient-to-r from-[#1e5a6d] to-[#2a7a91] transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Activities Path */}
          <div className="relative pl-12">
            {/* Línea conectora vertical - z-0 para que esté detrás */}
            <div className="absolute left-6 top-0 z-0" style={{ 
              backgroundImage: 'repeating-linear-gradient(0deg, #60a5fa, #60a5fa 10px, transparent 10px, transparent 20px)',
              width: '4px',
              height: `${(activities.length - 1) * 144 + 140}px`
            }}></div>

            {/* Activities - ALL IN ONE LINE */}
            <div className="space-y-4 relative z-10">
              {activities.map((activity, index) => {
                const isPhaseStart = index === 0 || activities[index - 1].phase !== activity.phase;
                const phaseLabel = activity.phase === 'before' ? '🔵 ANTES DEL VIAJE' : activity.phase === 'during' ? '🟢 DURANTE EL VIAJE' : '🟣 DESPUÉS DEL VIAJE';
                const phaseColor = activity.phase === 'before' ? 'blue' : activity.phase === 'during' ? 'cyan' : 'purple';
                const unlocked = isActivityUnlocked(index);
                const isCompleted = completedActivities[activity.id];
                const isCurrentActivity = index === currentActivityIndex;
                
                return (
                  <div key={activity.id} id={`activity-${activity.id}`}>
                    {/* Phase Separator */}
                    {isPhaseStart && (
                      <div className="mb-6 -ml-12 relative z-20 pointer-events-none select-none">
                        <div className={`rounded-lg p-3 border-l-4 ${
                          phaseColor === 'blue' 
                            ? darkMode ? 'bg-blue-900/20 border-blue-500' : 'bg-blue-50 border-blue-500' 
                            : phaseColor === 'cyan'
                            ? darkMode ? 'bg-cyan-900/20 border-cyan-500' : 'bg-cyan-50 border-cyan-500'
                            : darkMode ? 'bg-purple-900/20 border-purple-500' : 'bg-purple-50 border-purple-500'
                        }`}>
                          <h3 className={`font-bold text-sm tracking-wide ${
                            phaseColor === 'blue' 
                              ? darkMode ? 'text-blue-300' : 'text-blue-700' 
                              : phaseColor === 'cyan'
                              ? darkMode ? 'text-cyan-300' : 'text-cyan-700'
                              : darkMode ? 'text-purple-300' : 'text-purple-700'
                          }`}>
                            {phaseLabel}
                          </h3>
                        </div>
                      </div>
                    )}

                    {/* Tortuga en actividad actual */}
                    {isCurrentActivity && (
                      <div className="mb-3 flex justify-start -ml-12">
                        <div className="text-6xl animate-bounce">
                          🐢
                        </div>
                      </div>
                    )}

                    {/* Activity Node */}
                    <div className="relative">
                      {/* Circle Node */}
                      <div className="absolute -left-12 top-1">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 transition-all ${
                            isCompleted
                              ? 'bg-green-500 border-green-300'
                              : unlocked
                              ? 'bg-yellow-400 border-yellow-300 animate-pulse'
                              : darkMode
                              ? 'bg-gray-600 border-gray-500'
                              : 'bg-gray-300 border-gray-200'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle size={24} className="text-white" />
                          ) : unlocked ? (
                            <Clock size={24} className="text-gray-800" />
                          ) : (
                            <Lock size={20} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                          )}
                        </div>
                      </div>

                      {/* Activity Card */}
                      <button
                        onClick={() => handleActivityClick(activity, index)}
                        className={`w-full text-left rounded-xl p-4 shadow-md transition-all cursor-pointer ${
                          unlocked ? 'hover:shadow-lg' : 'opacity-60'
                        } ${
                          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className={`font-bold text-sm pr-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            {activity.title}
                          </h4>
                          {activity.obligatory && (
                            <span className="flex-shrink-0 bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-bold">
                              ⚠ Obligatorio
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                          <Calendar size={14} />
                          <span>{activity.deadline}</span>
                        </div>
                        {unlocked && (
                          <div className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-2 rounded-lg text-xs font-bold hover:opacity-90 transition-opacity mt-2 text-center">
                            Ver detalles
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mensaje de Felicitaciones al completar todo - Modal fijo adelante de todo */}
          {showCongratulations && (
            <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4">
              <div className={`rounded-3xl p-8 text-center shadow-2xl max-w-md w-full relative ${darkMode ? 'bg-gradient-to-br from-green-800 to-emerald-900' : 'bg-gradient-to-br from-green-400 to-emerald-500'}`}>
                <button
                  onClick={() => setShowCongratulations(false)}
                  className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <X size={24} />
                </button>
                <div className="text-7xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold mb-3 text-white">
                  ¡Felicidades!
                </h2>
                <p className="text-white text-lg mb-4">
                  Has completado tu movilidad con éxito
                </p>
                <div className="flex items-center justify-center gap-2 text-white/90 text-sm">
                  <CheckCircle size={20} />
                  <span>Todas las actividades obligatorias completadas</span>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedActivity && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
          <div className={`rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {/* Header */}
            <div className={`p-6 rounded-t-3xl sticky top-0 z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedActivity(null);
                  // Limpiar errores al cerrar el modal
                  if (selectedActivity) {
                    setFileErrors(prev => {
                      const newErrors = { ...prev };
                      delete newErrors[selectedActivity.id];
                      return newErrors;
                    });
                  }
                }}
                className={`absolute top-4 right-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-2 transition-colors`}
              >
                <X size={20} />
              </button>
              <h2 className={`text-lg font-bold pr-10 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {selectedActivity.title}
              </h2>
              {selectedActivity.obligatory && !completedActivities[selectedActivity.id] && (
                <span className="inline-block bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full font-bold mt-2">
                  ⚠ Obligatorio
                </span>
              )}
              {completedActivities[selectedActivity.id] && (
                <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-bold mt-2">
                  ✅ Completado
                </span>
              )}
            </div>

            <div className="p-6 space-y-4">
              {/* Fecha Límite */}
              <div className={`rounded-xl p-4 border-2 ${darkMode ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-300'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-yellow-700' : 'bg-yellow-400'}`}>
                    <Clock size={20} className={darkMode ? 'text-yellow-200' : 'text-gray-800'} />
                  </div>
                  <div>
                    <p className={`text-xs ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                      Fecha límite
                    </p>
                    <p className={`font-bold ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                      {selectedActivity.deadline}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tarea */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={18} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
                  <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Tarea
                  </h3>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {selectedActivity.task}
                </p>
              </div>

              {/* Documento Requerido */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Upload size={18} className={darkMode ? 'text-green-400' : 'text-green-600'} />
                  <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Documento requerido
                  </h3>
                </div>
                <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {selectedActivity.documentRequired}
                </p>
                
                {/* Upload Area */}
                {uploadedFiles[selectedActivity.id] ? (
                  <div className="space-y-3">
                    {/* Archivo Cargado */}
                    <div className={`rounded-xl p-4 border-2 ${darkMode ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-300'}`}>
                      <div className="flex items-center gap-3">
                        <Check size={24} className="text-green-600" />
                        <div className="flex-1">
                          <p className={`text-sm font-bold ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                            Archivo cargado
                          </p>
                          <p className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                            {typeof uploadedFiles[selectedActivity.id] === 'string' 
                              ? uploadedFiles[selectedActivity.id] 
                              : uploadedFiles[selectedActivity.id]?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Botón Reemplazar Archivo */}
                    <label className={`block w-full py-3 px-4 rounded-xl border-2 font-bold text-sm cursor-pointer transition-all text-center ${
                      darkMode 
                        ? 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50' 
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                    }`}>
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload(selectedActivity.id, e)}
                        accept=".pdf"
                        className="hidden"
                      />
                      <div className="flex items-center justify-center gap-2">
                        <Upload size={18} />
                        <span>Reemplazar archivo</span>
                      </div>
                    </label>
                    
                    {/* Error Message (si hay error al reemplazar) */}
                    {fileErrors[selectedActivity.id] && (
                      <div className={`rounded-lg p-4 border-l-4 ${
                        darkMode 
                          ? 'bg-red-900/30 border-red-600' 
                          : 'bg-red-50 border-red-500'
                      }`}>
                        <div className="flex items-start gap-3">
                          <AlertCircle size={20} className={`flex-shrink-0 mt-0.5 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                          <div className="flex-1">
                            <p className={`font-bold text-sm mb-1 ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
                              Error al reemplazar archivo
                            </p>
                            <p className={`text-xs ${darkMode ? 'text-red-300' : 'text-red-600'}`}>
                              {fileErrors[selectedActivity.id]}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <label className={`block border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                      fileErrors[selectedActivity.id]
                        ? darkMode 
                          ? 'border-red-700 bg-red-900/10' 
                          : 'border-red-300 bg-red-50'
                        : darkMode 
                          ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/50' 
                          : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                    }`}>
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload(selectedActivity.id, e)}
                        accept=".pdf"
                        className="hidden"
                      />
                      <Upload size={32} className={`mx-auto mb-2 ${
                        fileErrors[selectedActivity.id]
                          ? 'text-red-500'
                          : darkMode ? 'text-gray-500' : 'text-gray-400'
                      }`} />
                      <p className={`font-bold text-sm mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Subir archivo
                      </p>
                      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        Solo PDF (máx. 5MB)
                      </p>
                    </label>
                    
                    {/* Error Message */}
                    {fileErrors[selectedActivity.id] && (
                      <div className={`mt-3 rounded-lg p-4 border-l-4 ${
                        darkMode 
                          ? 'bg-red-900/30 border-red-600' 
                          : 'bg-red-50 border-red-500'
                      }`}>
                        <div className="flex items-start gap-3">
                          <AlertCircle size={20} className={`flex-shrink-0 mt-0.5 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                          <div className="flex-1">
                            <p className={`font-bold text-sm mb-1 ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
                              Error al subir archivo
                            </p>
                            <p className={`text-xs ${darkMode ? 'text-red-300' : 'text-red-600'}`}>
                              {fileErrors[selectedActivity.id]}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Botones de Acción */}
              <div className="space-y-3 pt-2">
                <button 
                  onClick={() => handleCompleteActivity(selectedActivity.id)}
                  disabled={!uploadedFiles[selectedActivity.id]}
                  className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-opacity ${
                    uploadedFiles[selectedActivity.id]
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:opacity-90 cursor-pointer'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle size={20} />
                  Marcar como completado
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    // Limpiar errores al cerrar el modal
                    if (selectedActivity) {
                      setFileErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors[selectedActivity.id];
                        return newErrors;
                      });
                    }
                    setSelectedActivity(null);
                  }}
                  className={`w-full py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <ArrowLeft size={20} />
                  Volver al mapa
                </button>
              </div>

              {/* Tip */}
              <div className={`rounded-xl p-3 ${darkMode ? 'bg-blue-900/30 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className={darkMode ? 'text-blue-400 flex-shrink-0 mt-0.5' : 'text-blue-600 flex-shrink-0 mt-0.5'} />
                  <p className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                    <strong>Tip:</strong> Asegúrate de que todos los documentos estén completos y sean legibles antes de subirlos. Puedes reemplazar un archivo cargado en cualquier momento si necesitas hacer correcciones.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pantalla de Ruta Completada - Ver ruta completa */}
      {viewingCompletedRoute && (
        <main className="px-4 py-6 max-w-md mx-auto pb-24">
          {/* Phase Tabs - For navigation */}
          <div className={`rounded-2xl p-1 mb-6 grid grid-cols-3 gap-1 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <button
              onClick={() => {
                const firstBeforeIndex = activities.findIndex(a => a.phase === 'before');
                if (firstBeforeIndex !== -1) {
                  const element = document.getElementById(`activity-${activities[firstBeforeIndex].id}`);
                  element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className={`py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🔵 Antes
            </button>
            <button
              onClick={() => {
                const firstDuringIndex = activities.findIndex(a => a.phase === 'during');
                if (firstDuringIndex !== -1) {
                  const element = document.getElementById(`activity-${activities[firstDuringIndex].id}`);
                  element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className={`py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🟢 Durante
            </button>
            <button
              onClick={() => {
                const firstAfterIndex = activities.findIndex(a => a.phase === 'after');
                if (firstAfterIndex !== -1) {
                  const element = document.getElementById(`activity-${activities[firstAfterIndex].id}`);
                  element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className={`py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🟣 Después
            </button>
          </div>

          {/* Progress Bar */}
          <div className={`rounded-2xl p-5 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Tu Progreso
              </h3>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {progressPercentage}%
                </span>
                <span className={`text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                  {completedCount}/{totalCount}
                </span>
              </div>
            </div>
            <div className={`w-full h-3 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div
                className="h-full bg-gradient-to-r from-[#1e5a6d] to-[#2a7a91] transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Activities Path */}
          <div className="relative pl-12">
            {/* Línea conectora vertical - z-0 para que esté detrás */}
            <div className="absolute left-6 top-0 z-0" style={{ 
              backgroundImage: 'repeating-linear-gradient(0deg, #60a5fa, #60a5fa 10px, transparent 10px, transparent 20px)',
              width: '4px',
              height: `${(activities.length - 1) * 144 + 140}px`
            }}></div>

            {/* Activities - ALL IN ONE LINE */}
            <div className="space-y-4 relative z-10">
              {activities.map((activity, index) => {
                const isPhaseStart = index === 0 || activities[index - 1].phase !== activity.phase;
                const phaseLabel = activity.phase === 'before' ? '🔵 ANTES DEL VIAJE' : activity.phase === 'during' ? '🟢 DURANTE EL VIAJE' : '🟣 DESPUÉS DEL VIAJE';
                const phaseColor = activity.phase === 'before' ? 'blue' : activity.phase === 'during' ? 'cyan' : 'purple';
                const unlocked = isActivityUnlocked(index);
                const isCompleted = completedActivities[activity.id];
                const isCurrentActivity = index === currentActivityIndex;
                
                return (
                  <div key={activity.id} id={`activity-${activity.id}`}>
                    {/* Phase Separator */}
                    {isPhaseStart && (
                      <div className="mb-6 -ml-12 relative z-20 pointer-events-none select-none">
                        <div className={`rounded-lg p-3 border-l-4 ${
                          phaseColor === 'blue' 
                            ? darkMode ? 'bg-blue-900/20 border-blue-500' : 'bg-blue-50 border-blue-500' 
                            : phaseColor === 'cyan'
                            ? darkMode ? 'bg-cyan-900/20 border-cyan-500' : 'bg-cyan-50 border-cyan-500'
                            : darkMode ? 'bg-purple-900/20 border-purple-500' : 'bg-purple-50 border-purple-500'
                        }`}>
                          <h3 className={`font-bold text-sm tracking-wide ${
                            phaseColor === 'blue' 
                              ? darkMode ? 'text-blue-300' : 'text-blue-700' 
                              : phaseColor === 'cyan'
                              ? darkMode ? 'text-cyan-300' : 'text-cyan-700'
                              : darkMode ? 'text-purple-300' : 'text-purple-700'
                          }`}>
                            {phaseLabel}
                          </h3>
                        </div>
                      </div>
                    )}

                    {/* Tortuga en actividad actual */}
                    {isCurrentActivity && (
                      <div className="mb-3 flex justify-start -ml-12">
                        <div className="text-6xl animate-bounce">
                          🐢
                        </div>
                      </div>
                    )}

                    {/* Activity Node */}
                    <div className="relative">
                      {/* Circle Node */}
                      <div className="absolute -left-12 top-1">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 transition-all ${
                            isCompleted
                              ? 'bg-green-500 border-green-300'
                              : unlocked
                              ? 'bg-yellow-400 border-yellow-300 animate-pulse'
                              : darkMode
                              ? 'bg-gray-600 border-gray-500'
                              : 'bg-gray-300 border-gray-200'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle size={24} className="text-white" />
                          ) : unlocked ? (
                            <Clock size={24} className="text-gray-800" />
                          ) : (
                            <Lock size={20} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                          )}
                        </div>
                      </div>

                      {/* Activity Card */}
                      <button
                        onClick={() => handleActivityClick(activity, index)}
                        className={`w-full text-left rounded-xl p-4 shadow-md transition-all cursor-pointer ${
                          unlocked ? 'hover:shadow-lg' : 'opacity-60'
                        } ${
                          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className={`font-bold text-sm pr-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            {activity.title}
                          </h4>
                          {activity.obligatory && (
                            <span className="flex-shrink-0 bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-bold">
                              ⚠ Obligatorio
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                          <Calendar size={14} />
                          <span>{activity.deadline}</span>
                        </div>
                        {unlocked && (
                          <div className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-2 rounded-lg text-xs font-bold hover:opacity-90 transition-opacity mt-2 text-center">
                            Ver detalles
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mensaje de Felicitaciones al completar todo - Modal fijo adelante de todo */}
          {showCongratulations && (
            <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4">
              <div className={`rounded-3xl p-8 text-center shadow-2xl max-w-md w-full relative ${darkMode ? 'bg-gradient-to-br from-green-800 to-emerald-900' : 'bg-gradient-to-br from-green-400 to-emerald-500'}`}>
                <button
                  onClick={() => setShowCongratulations(false)}
                  className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <X size={24} />
                </button>
                <div className="text-7xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold mb-3 text-white">
                  ¡Felicidades!
                </h2>
                <p className="text-white text-lg mb-4">
                  Has completado tu movilidad con éxito
                </p>
                <div className="flex items-center justify-center gap-2 text-white/90 text-sm">
                  <CheckCircle size={20} />
                  <span>Todas las actividades obligatorias completadas</span>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {/* Modal de Alerta de Actividad Bloqueada */}
      {showLockedAlert && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className={`rounded-3xl p-8 max-w-sm w-full shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${darkMode ? 'bg-orange-900/30' : 'bg-orange-100'}`}>
              <Lock size={32} className="text-orange-600" />
            </div>
            <h3 className={`text-xl font-bold text-center mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Actividad Bloqueada
            </h3>
            <p className={`text-center text-sm mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Esta actividad está bloqueada. Debes completar primero la actividad anterior desbloqueada para poder acceder a esta.
            </p>
            <button
              onClick={() => setShowLockedAlert(false)}
              className="w-full bg-gradient-to-r from-[#1e5a6d] to-[#2a7a91] text-white py-3 px-6 rounded-xl hover:opacity-90 transition-opacity font-bold"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Modal de Ayuda */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className={`rounded-3xl p-8 max-w-md w-full shadow-2xl relative ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <button
              onClick={() => setShowHelp(false)}
              className={`absolute top-4 right-4 ${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} rounded-full p-2 transition-colors`}
            >
              <X size={20} />
            </button>
            <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
              <HelpCircle size={32} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
            </div>
            <h3 className={`text-xl font-bold text-center mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              ¿Cómo funciona la Ruta?
            </h3>
            <div className={`text-sm space-y-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <p>
                Para avanzar en el proceso, completa las actividades <strong>paso a paso</strong>. Algunas actividades dependen de otras, por lo que debes seguir el orden indicado.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 border-4 border-green-300 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                  <p><strong>Verde con ✓:</strong> Actividad completada</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-400 border-4 border-yellow-300 flex items-center justify-center flex-shrink-0">
                    <Clock size={16} className="text-gray-800" />
                  </div>
                  <p><strong>Amarillo con reloj:</strong> Actividad desbloqueada y pendiente</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-gray-300 border-gray-200'} border-4 flex items-center justify-center flex-shrink-0`}>
                    <Lock size={14} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                  </div>
                  <p><strong>Gris con candado:</strong> Actividad bloqueada</p>
                </div>
              </div>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} italic`}>
                <strong>Tip:</strong> Las actividades marcadas con "⚠ Obligatorio" son requisitos esenciales para completar tu movilidad.
              </p>
            </div>
            <button
              onClick={() => setShowHelp(false)}
              className="w-full bg-gradient-to-r from-[#1e5a6d] to-[#2a7a91] text-white py-3 px-6 rounded-xl hover:opacity-90 transition-opacity font-bold mt-6"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Botón de Ayuda Flotante */}
      {isUnlocked && !showCompletedOptions && (
        <button
          onClick={() => setShowHelp(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#1e5a6d] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#2a7a91] transition-all hover:scale-110 z-40"
        >
          <HelpCircle size={24} />
        </button>
      )}
    </div>
  );
}