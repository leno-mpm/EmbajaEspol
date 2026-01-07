import { ChevronLeft, Bell, CheckCircle, AlertCircle, Award, Info, Trash2, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NotificationsScreenProps {
  onBack: () => void;
  darkMode?: boolean;
  userRole?: string;
}

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'reward';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export function NotificationsScreen({ onBack, darkMode = false, userRole = 'estudiante' }: NotificationsScreenProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadNotifications();
  }, [userRole]);

  const loadNotifications = () => {
    // Cargar notificaciones guardadas o generar algunas de ejemplo
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      const parsed = JSON.parse(savedNotifications);
      setNotifications(parsed);
      updateUnreadCount(parsed);
    } else {
      // Notificaciones de ejemplo según el rol
      const exampleNotifications: Notification[] = userRole === 'estudiante' ? [
        {
          id: '1',
          type: 'success',
          title: '¡Actividad completada!',
          message: 'Has completado con éxito "Solicitar Pasaporte". ¡Sigue así!',
          timestamp: 'Hace 2 horas',
          read: false
        },
        {
          id: '2',
          type: 'reward',
          title: 'Nuevas monedas ganadas',
          message: 'Has ganado 150 monedas por completar una actividad. Total: 1,250 monedas',
          timestamp: 'Hace 3 horas',
          read: false
        },
        {
          id: '3',
          type: 'warning',
          title: 'Tarea pendiente próxima a vencer',
          message: 'Tu tarea "Reservar Alojamiento" vence el 25 de diciembre. ¡No te olvides!',
          timestamp: 'Hace 5 horas',
          read: false
        },
        {
          id: '4',
          type: 'info',
          title: 'Nueva universidad disponible',
          message: 'La Universidad de Melbourne está ahora disponible en la Guía de Destinos',
          timestamp: 'Hace 1 día',
          read: true
        },
        {
          id: '5',
          type: 'success',
          title: 'Ruta desbloqueada',
          message: 'Has desbloqueado la Ruta Embajador para tu destino seleccionado',
          timestamp: 'Hace 2 días',
          read: true
        },
        {
          id: '6',
          type: 'info',
          title: 'Actualización de la aplicación',
          message: 'Nueva funcionalidad: Ahora puedes subir evidencias de tus actividades',
          timestamp: 'Hace 3 días',
          read: true
        }
      ] : [
        {
          id: '1',
          type: 'success',
          title: 'Convenio firmado',
          message: 'El convenio con la Universidad de Oxford ha sido firmado exitosamente',
          timestamp: 'Hace 1 hora',
          read: false
        },
        {
          id: '2',
          type: 'info',
          title: 'Conferencia programada',
          message: 'La conferencia internacional ha sido agendada para el 15 de enero',
          timestamp: 'Hace 4 horas',
          read: false
        },
        {
          id: '3',
          type: 'warning',
          title: 'Actividad pendiente',
          message: 'Recuerda completar la coordinación del programa de intercambio',
          timestamp: 'Hace 1 día',
          read: true
        },
        {
          id: '4',
          type: 'success',
          title: 'Actividad completada',
          message: 'Has completado "Organizar conferencia internacional"',
          timestamp: 'Hace 2 días',
          read: true
        }
      ];

      setNotifications(exampleNotifications);
      updateUnreadCount(exampleNotifications);
      localStorage.setItem('notifications', JSON.stringify(exampleNotifications));
    }
  };

  const updateUnreadCount = (notifs: Notification[]) => {
    const count = notifs.filter(n => !n.read).length;
    setUnreadCount(count);
    localStorage.setItem('unreadNotifications', count.toString());
  };

  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    updateUnreadCount(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updatedNotifications);
    updateUnreadCount(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const deleteNotification = (id: string) => {
    const updatedNotifications = notifications.filter(n => n.id !== id);
    setNotifications(updatedNotifications);
    updateUnreadCount(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    localStorage.removeItem('notifications');
    localStorage.setItem('unreadNotifications', '0');
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'warning':
        return <AlertCircle size={20} className="text-yellow-600" />;
      case 'reward':
        return <Award size={20} className="text-orange-600" />;
      case 'info':
      default:
        return <Info size={20} className="text-blue-600" />;
    }
  };

  const getNotificationBgColor = (type: string, read: boolean) => {
    if (darkMode) {
      return read ? 'bg-gray-800' : 'bg-gray-700';
    }
    
    if (read) return 'bg-gray-50';
    
    switch (type) {
      case 'success':
        return 'bg-green-50';
      case 'warning':
        return 'bg-yellow-50';
      case 'reward':
        return 'bg-orange-50';
      case 'info':
      default:
        return 'bg-blue-50';
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-10`}>
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <ChevronLeft size={24} className={darkMode ? 'text-gray-300' : 'text-gray-800'} />
          </button>
          <h1 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Notificaciones
          </h1>
        </div>
        
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className={`text-sm font-bold transition-colors ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
          >
            Marcar todas como leídas
          </button>
        )}
      </header>

      <div className="p-4">
        {/* Stats Card */}
        <div className={`max-w-2xl mx-auto mb-4 rounded-2xl p-4 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total de notificaciones
              </p>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {notifications.length}
              </p>
            </div>
            <div className="text-right">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Sin leer
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {unreadCount}
              </p>
            </div>
            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className={`p-3 rounded-xl transition-colors ${darkMode ? 'bg-red-900/30 hover:bg-red-900/50' : 'bg-red-50 hover:bg-red-100'}`}
                title="Borrar todas"
              >
                <Trash2 size={20} className="text-red-600" />
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-w-2xl mx-auto space-y-3">
          {notifications.length === 0 ? (
            <div className={`rounded-2xl p-12 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <Bell size={40} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
              </div>
              <h3 className={`font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                No tienes notificaciones
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Cuando tengas novedades, aparecerán aquí
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-2xl p-4 transition-all border ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                } ${getNotificationBgColor(notification.type, notification.read)}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    darkMode ? 'bg-gray-900/50' : 'bg-white'
                  }`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5"></div>
                      )}
                    </div>
                    
                    <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {notification.timestamp}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className={`text-xs font-bold px-3 py-1 rounded-full transition-colors ${
                              darkMode 
                                ? 'bg-blue-900/30 text-blue-400 hover:bg-blue-900/50' 
                                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                            }`}
                          >
                            <Check size={14} className="inline mr-1" />
                            Marcar como leída
                          </button>
                        )}
                        
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            darkMode 
                              ? 'hover:bg-red-900/30 text-gray-400 hover:text-red-400' 
                              : 'hover:bg-red-50 text-gray-500 hover:text-red-600'
                          }`}
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
