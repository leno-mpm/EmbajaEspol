import { useState } from 'react';
import { User, UserCog } from 'lucide-react';
import logoImage from 'figma:asset/ea61210eae872b17e2d751ecf021b1c1fe8e8ce8.png';

type Role = 'estudiante' | 'administrativo' | null;

interface LoginScreenProps {
  onLoginSuccess: (username: string, role: string) => void;
}

export function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRole || !username || !password) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Validar que el correo termine con @espol.edu.ec
    if (!username.endsWith('@espol.edu.ec')) {
      alert('El correo debe terminar con @espol.edu.ec');
      return;
    }

    console.log('Iniciando sesión como:', selectedRole);
    console.log('Usuario:', username);
    console.log('Contraseña:', password);
    
    alert(`Bienvenido ${selectedRole}: ${username}`);
    onLoginSuccess(username, selectedRole);
  };

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gray-50">
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src={logoImage} 
              alt="EmbajaEspol Logo" 
              className="w-32 h-32 object-contain"
            />
          </div>
          <h1 className="text-3xl mb-2 font-bold">EmbajaEspol</h1>
        </div>

        {/* Selección de rol */}
        {!selectedRole ? (
          <div className="bg-white rounded-3xl shadow-lg p-10">
            <h2 className="text-center mb-8">Selecciona tu rol</h2>
            
            <div className="space-y-4">
              <button
                onClick={() => handleRoleSelect('estudiante')}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-[#1e5a6d] text-[#1e5a6d] rounded-full py-4 px-6 hover:bg-[#1e5a6d] hover:text-white transition-all duration-200"
              >
                <User className="w-5 h-5" />
                <span>Estudiante</span>
              </button>

              <button
                onClick={() => handleRoleSelect('administrativo')}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-[#1e5a6d] text-[#1e5a6d] rounded-full py-4 px-6 hover:bg-[#1e5a6d] hover:text-white transition-all duration-200"
              >
                <UserCog className="w-5 h-5" />
                <span>Personal Administrativo</span>
              </button>
            </div>
          </div>
        ) : (
          /* Formulario de inicio de sesión */
          <div className="bg-white rounded-3xl shadow-lg p-10">
            <div className="mb-8">
              <button
                onClick={() => setSelectedRole(null)}
                className="text-sm text-gray-600 hover:text-[#1e5a6d] transition-colors mb-4 font-bold"
              >
                &lt; Cambiar rol
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Campo de usuario */}
              <div>
                <input
                  id="username"
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="usuario@espol.edu.ec"
                  className="w-full px-5 py-3 border-2 border-gray-300 rounded-full outline-none focus:border-[#1e5a6d] transition-colors"
                  required
                />
              </div>

              {/* Campo de contraseña */}
              <div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  className="w-full px-5 py-3 border-2 border-gray-300 rounded-full outline-none focus:border-[#1e5a6d] transition-colors"
                  required
                />
              </div>

              {/* Botón de inicio de sesión */}
              <button
                type="submit"
                className="w-full bg-[#1e5a6d] text-white rounded-full py-3 px-6 hover:bg-[#2a7a91] transition-colors mt-8"
              >
                Iniciar Sesión
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}