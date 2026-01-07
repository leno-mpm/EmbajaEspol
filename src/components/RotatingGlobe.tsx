import { useState, useRef, useEffect } from 'react';

export function RotatingGlobe() {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const animationRef = useRef<number>();

  // Auto-rotation animation
  useEffect(() => {
    if (autoRotate && !isDragging) {
      const animate = () => {
        setRotation((prev) => (prev + 0.2) % 360);
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [autoRotate, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const diff = e.clientX - startX;
      setRotation((prev) => (prev + diff * 0.5) % 360);
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setAutoRotate(true), 1000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const diff = e.touches[0].clientX - startX;
      setRotation((prev) => (prev + diff * 0.5) % 360);
      setStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTimeout(() => setAutoRotate(true), 1000);
  };

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      <div
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ perspective: '1000px' }}
      >
        <div
          className="relative w-full h-full rounded-full overflow-hidden"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
            transition: isDragging ? 'none' : 'transform 0.1s linear',
            boxShadow: 'inset -30px 0 60px rgba(0,0,0,0.4), 0 0 40px rgba(0,150,255,0.2)',
          }}
        >
          {/* Globe base with Earth texture */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%),
                linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%),
                url('https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMGdsb2JlJTIwcGxhbmV0fGVufDF8fHx8MTc2NTM1NTYyN3ww&ixlib=rb-4.1.0&q=80&w=1080')
              `,
              backgroundSize: 'cover',
              backgroundPosition: `${-rotation * 2}px center`,
              backgroundRepeat: 'repeat-x',
            }}
          />

          {/* Clouds layer - slower movement */}
          <div
            className="absolute inset-0 rounded-full opacity-40"
            style={{
              background: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><defs><filter id="blur"><feGaussianBlur stdDeviation="8"/></filter></defs><g filter="url(%23blur)" fill="white" opacity="0.7"><ellipse cx="200" cy="150" rx="80" ry="30"/><ellipse cx="400" cy="200" rx="100" ry="40"/><ellipse cx="600" cy="180" rx="70" ry="35"/><ellipse cx="300" cy="400" rx="90" ry="35"/><ellipse cx="500" cy="450" rx="80" ry="30"/><ellipse cx="150" cy="550" rx="75" ry="30"/><ellipse cx="650" cy="600" rx="85" ry="35"/></g></svg>')`,
              backgroundSize: 'cover',
              backgroundPosition: `${-rotation * 1.5}px center`,
              backgroundRepeat: 'repeat-x',
            }}
          />

          {/* Light reflection */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 35% 25%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 30%, transparent 60%)',
            }}
          />

          {/* Shadow edge */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 70% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)',
            }}
          />
        </div>
      </div>

      {/* Instruction label */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur rounded-full px-4 py-2 shadow-lg">
        <span className="text-xs text-gray-700">
          {autoRotate && !isDragging
            ? '🌍 Rotación automática - Arrastra para controlar'
            : '🖱️ Arrastra para rotar 360°'}
        </span>
      </div>

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(100,180,255,0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    </div>
  );
}
