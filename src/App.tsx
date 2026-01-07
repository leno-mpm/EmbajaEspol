import { useState, useEffect } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { MainScreen } from './components/MainScreen';

// Tipos para los datos del usuario
interface UserData {
  username: string;
  role: string;
}

interface UserProgress {
  selectedDestination: string | null;
  isRouteUnlocked: boolean;
  isToolkitUnlocked: boolean;
  routeInitialized: boolean;
  routeCompleted: boolean;
  completedActivities: string[];
  currentPendingTask: number;
  userCoins: number;
  galleryPhotos: any[];
  completedTrips: number;
  completedRewards: number[]; // IDs de retos completados
  uploadedFiles: any; // Archivos subidos en Ruta Embajador
  // Agregar más datos según sea necesario
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isRouteUnlocked, setIsRouteUnlocked] = useState(false);
  const [isToolkitUnlocked, setIsToolkitUnlocked] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);

  // Función para obtener los datos de un usuario específico
  const getUserProgress = (email: string): UserProgress | null => {
    const savedData = localStorage.getItem(`user_${email}`);
    if (savedData) {
      return JSON.parse(savedData);
    }
    return null;
  };

  // Función para guardar los datos del usuario
  const saveUserProgress = (email: string, progress: UserProgress) => {
    localStorage.setItem(`user_${email}`, JSON.stringify(progress));
  };

  // Función para resetear todos los datos a valores iniciales
  const resetUserProgress = (email: string) => {
    const initialProgress: UserProgress = {
      selectedDestination: null,
      isRouteUnlocked: false,
      isToolkitUnlocked: false,
      routeInitialized: false,
      routeCompleted: false,
      completedActivities: [],
      currentPendingTask: 0,
      userCoins: 1250, // Monedas iniciales
      galleryPhotos: [],
      completedTrips: 0,
      completedRewards: [],
      uploadedFiles: {}
    };
    
    saveUserProgress(email, initialProgress);
    
    // También limpiar localStorage de datos antiguos
    localStorage.removeItem('routeInitialized');
    localStorage.removeItem('routeCompleted');
    localStorage.removeItem('completedActivities');
    localStorage.removeItem('selectedDestination');
    localStorage.removeItem('currentPendingTask');
    localStorage.removeItem('userCoins');
    localStorage.removeItem('galleryPhotos');
    localStorage.removeItem('completedTrips');
    localStorage.removeItem('completedRewards');
    localStorage.removeItem('uploadedFiles');
    
    return initialProgress;
  };

  const handleLoginSuccess = (username: string, role: string) => {
    setUserData({ username, role });
    
    // Verificar si este usuario ya tiene datos guardados
    let userProgress = getUserProgress(username);
    
    if (!userProgress) {
      // Usuario nuevo - crear datos iniciales
      userProgress = resetUserProgress(username);
    }
    
    // Cargar el progreso del usuario
    setSelectedDestination(userProgress.selectedDestination);
    setIsRouteUnlocked(userProgress.isRouteUnlocked);
    setIsToolkitUnlocked(userProgress.isToolkitUnlocked);
    
    // Establecer en localStorage para que los componentes lo lean
    if (userProgress.selectedDestination) {
      localStorage.setItem('selectedDestination', userProgress.selectedDestination);
    }
    localStorage.setItem('routeInitialized', String(userProgress.routeInitialized));
    localStorage.setItem('routeCompleted', String(userProgress.routeCompleted));
    localStorage.setItem('completedActivities', JSON.stringify(userProgress.completedActivities));
    localStorage.setItem('currentPendingTask', String(userProgress.currentPendingTask));
    localStorage.setItem('userCoins', String(userProgress.userCoins));
    localStorage.setItem('galleryPhotos', JSON.stringify(userProgress.galleryPhotos));
    localStorage.setItem('completedTrips', String(userProgress.completedTrips));
    localStorage.setItem('completedRewards', JSON.stringify(userProgress.completedRewards || []));
    localStorage.setItem('uploadedFiles', JSON.stringify(userProgress.uploadedFiles || {}));
    
    // Guardar el email del usuario actual
    localStorage.setItem('currentUserEmail', username);
    
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Guardar el progreso actual antes de cerrar sesión
    if (userData?.username) {
      const currentProgress: UserProgress = {
        selectedDestination: selectedDestination,
        isRouteUnlocked: isRouteUnlocked,
        isToolkitUnlocked: isToolkitUnlocked,
        routeInitialized: localStorage.getItem('routeInitialized') === 'true',
        routeCompleted: localStorage.getItem('routeCompleted') === 'true',
        completedActivities: JSON.parse(localStorage.getItem('completedActivities') || '[]'),
        currentPendingTask: parseInt(localStorage.getItem('currentPendingTask') || '0'),
        userCoins: parseInt(localStorage.getItem('userCoins') || '1250'),
        galleryPhotos: JSON.parse(localStorage.getItem('galleryPhotos') || '[]'),
        completedTrips: parseInt(localStorage.getItem('completedTrips') || '0'),
        completedRewards: JSON.parse(localStorage.getItem('completedRewards') || '[]'),
        uploadedFiles: JSON.parse(localStorage.getItem('uploadedFiles') || '{}')
      };
      
      saveUserProgress(userData.username, currentProgress);
    }
    
    // Limpiar localStorage
    localStorage.removeItem('routeInitialized');
    localStorage.removeItem('routeCompleted');
    localStorage.removeItem('completedActivities');
    localStorage.removeItem('selectedDestination');
    localStorage.removeItem('currentPendingTask');
    localStorage.removeItem('userCoins');
    localStorage.removeItem('galleryPhotos');
    localStorage.removeItem('completedTrips');
    localStorage.removeItem('completedRewards');
    localStorage.removeItem('uploadedFiles');
    localStorage.removeItem('currentUserEmail');
    
    setIsLoggedIn(false);
    setUserData(null);
    setIsRouteUnlocked(false);
    setIsToolkitUnlocked(false);
    setSelectedDestination(null);
  };

  const handleUnlockRoute = () => {
    setIsRouteUnlocked(true);
  };

  const handleUnlockToolkit = () => {
    setIsToolkitUnlocked(true);
  };

  // Guardar automáticamente cuando cambian los estados importantes
  useEffect(() => {
    if (userData?.username && isLoggedIn) {
      const currentProgress: UserProgress = {
        selectedDestination: selectedDestination,
        isRouteUnlocked: isRouteUnlocked,
        isToolkitUnlocked: isToolkitUnlocked,
        routeInitialized: localStorage.getItem('routeInitialized') === 'true',
        routeCompleted: localStorage.getItem('routeCompleted') === 'true',
        completedActivities: JSON.parse(localStorage.getItem('completedActivities') || '[]'),
        currentPendingTask: parseInt(localStorage.getItem('currentPendingTask') || '0'),
        userCoins: parseInt(localStorage.getItem('userCoins') || '1250'),
        galleryPhotos: JSON.parse(localStorage.getItem('galleryPhotos') || '[]'),
        completedTrips: parseInt(localStorage.getItem('completedTrips') || '0')
      };
      
      saveUserProgress(userData.username, currentProgress);
    }
  }, [selectedDestination, isRouteUnlocked, isToolkitUnlocked, userData, isLoggedIn]);

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoggedIn ? (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      ) : (
        <MainScreen 
          onLogout={handleLogout} 
          userEmail={userData?.username}
          userRole={userData?.role}
          isRouteUnlocked={isRouteUnlocked}
          onUnlockRoute={handleUnlockRoute}
          isToolkitUnlocked={isToolkitUnlocked}
          onUnlockToolkit={handleUnlockToolkit}
          selectedDestination={selectedDestination}
          setSelectedDestination={setSelectedDestination}
        />
      )}
    </div>
  );
}