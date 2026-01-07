# Guía de Roles - EmbajaEspol

## Sistema de Roles Implementado ✅

La aplicación ahora reconoce y mantiene el rol del usuario a través de toda la sesión:

### **Roles Disponibles:**
1. **`student`** - Estudiante
2. **`administrative`** - Personal Administrativo

---

## Flujo de Datos del Rol

```
LoginScreen (usuario selecciona rol)
    ↓
App.tsx (almacena rol en userData)
    ↓
MainScreen (recibe userRole como prop)
    ↓
Componentes secundarios (reciben userRole):
    - CultureScreen ✅
    - ContactScreen ✅
    - [Próximos componentes...]
```

---

## Componentes ya Actualizados ✅

### 1. **CultureScreen.tsx**
- ✅ Ya recibe el prop `userRole`
- ✅ Listo para mostrar contenido diferenciado
- 📝 Actualmente muestra el mismo contenido para ambos roles
- 💡 Puedes agregar lógica condicional según necesites

### 2. **ContactScreen.tsx**
- ✅ Ya recibe el prop `userRole`
- ✅ Listo para mostrar contenido diferenciado
- 📝 Actualmente muestra el mismo contenido para ambos roles

### 3. **MainScreen.tsx**
- ✅ Recibe `userRole` desde App.tsx
- ✅ Pasa `userRole` a todos los componentes secundarios
- ✅ Muestra el rol correcto en el modal de perfil

---

## Secciones que Necesitan Contenido Diferenciado

Según tu solicitud, estas secciones cambiarán según el rol:

### 🗺️ **Guía de Destinos** (próximo a implementar)
**Estudiantes:**
- Información sobre universidades de destino
- Requisitos académicos
- Experiencias de otros estudiantes

**Personal Administrativo:**
- Convenios internacionales
- Datos estadísticos
- Gestión de programas

---

### 🛤️ **Ruta Embajador** (próximo a implementar)
**Estudiantes:**
- Pasos para aplicar a movilidad
- Checklist de documentos
- Timeline del proceso

**Personal Administrativo:**
- Proceso de aprobación
- Gestión de solicitudes
- Reportes y seguimiento

---

### 🧰 **Kit de Herramientas** (próximo a implementar)
**Estudiantes:**
- Formularios de aplicación
- Guías de viaje
- Tips de adaptación cultural
- Recursos financieros

**Personal Administrativo:**
- Plantillas de documentos
- Bases de datos de convenios
- Herramientas de gestión
- Reportes administrativos

---

## Ejemplo de Uso del Rol

```typescript
// Dentro de cualquier componente que reciba userRole:

export function MiComponente({ userRole }: { userRole?: string }) {
  return (
    <div>
      {userRole === 'student' ? (
        <div>Contenido para Estudiantes</div>
      ) : (
        <div>Contenido para Personal Administrativo</div>
      )}
    </div>
  );
}
```

---

## Próximos Pasos

1. **Definir el contenido específico** para cada rol en:
   - Guía de Destinos
   - Ruta Embajador
   - Kit de Herramientas

2. **Crear los componentes** para estas secciones

3. **Implementar la lógica condicional** basada en `userRole`

---

## Estado Actual del Sistema ✅

✅ **Login** - Captura correctamente el rol seleccionado  
✅ **App.tsx** - Almacena y pasa el rol a MainScreen  
✅ **MainScreen** - Distribuye el rol a todos los componentes  
✅ **CultureScreen** - Recibe el rol (listo para personalización)  
✅ **ContactScreen** - Recibe el rol (listo para personalización)  
⏳ **Guía de Destinos** - Por implementar  
⏳ **Ruta Embajador** - Por implementar  
⏳ **Kit de Herramientas** - Por implementar  

---

**Nota:** El sistema está 100% preparado para diferenciar contenido. Solo necesitas especificar qué debe verse en cada sección según el rol del usuario.
