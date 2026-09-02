'use client';
import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

// Inicializar cliente de Supabase para el navegador
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function MinerPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [coins, setCoins] = useState(0);
  const [statusText, setStatusText] = useState('Inactivo');
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Usar useRef para evitar problemas de cierres (closures) con los estados en bucles asíncronos
  const isRunningRef = useRef(isRunning);
  isRunningRef.current = isRunning;

  // 1. Obtener el usuario autenticado real desde Supabase al cargar la página
  useEffect(() => {
    async function fetchUserAndBalance() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        // Cargar saldo real de monedas desde la tabla profiles
        const { data: profile } = await supabase
          .from('profiles')
          .select('coins')
          .eq('id', session.user.id)
          .single();
        
        if (profile) setCoins(profile.coins || 0);
      }
      setLoadingUser(false);
    }
    fetchUserAndBalance();
  }, []);

  // 2. Bucle optimizado de minería automática con async/await secuencial
  useEffect(() => {
    if (!isRunning || !user) return;

    let isMounted = true;

    const runMiningLoop = async () => {
      while (isRunningRef.current && isMounted) {
        try {
          setStatusText('Buscando tarea disponible...');
          setProgress(20);

          // Pedir siguiente tarea
          const res = await fetch('/api/tasks/next', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.id }),
          });
          const data = await res.json();

          if (!res.ok || !isMounted) {
            setStatusText(data.message || 'No hay tareas disponibles por ahora.');
            setProgress(0);
            setIsRunning(false);
            break;
          }

          setStatusText(`Ejecutando (${data.task.type}): Procesando...`);
          setProgress(60);

          // Simular tiempo de la acción real en segundo plano (ej. vista o follow)
          await new Promise((resolve) => setTimeout(resolve, 3000));
          if (!isRunningRef.current || !isMounted) break;

          // Completar tarea y cobrar monedas
          const completeRes = await fetch('/api/tasks/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ taskId: data.task.id, executorId: user.id }),
          });
          const completeData = await completeRes.json();

          if (completeRes.ok && isMounted) {
            setCoins(completeData.newBalance);
            setProgress(100);
            setStatusText(`¡Ganaste +${completeData.earnedCoins} monedas!`);
            // Breve pausa con la barra llena antes del siguiente ciclo
            await new Promise((resolve) => setTimeout(resolve, 1000));
          } else {
            setStatusText(completeData.error || 'Error al validar tarea');
            await new Promise((resolve) => setTimeout(resolve, 2000));
          }
        } catch (err) {
          console.error(err);
          if (isMounted) {
            setStatusText('Error de conexión con el servidor');
            setIsRunning(false);
          }
          break;
        }
      }
    };

    runMiningLoop();

    return () => {
      isMounted = false;
    };
  }, [isRunning, user]);

  if (loadingUser) {
    return <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>Cargando sesión de Folaxi...</div>;
  }

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>
        <h2>Acceso Restringido</h2>
        <p>Debes iniciar sesión en folaxi.com para usar el minero automático.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '420px', margin: '40px auto', fontFamily: 'sans-serif', background: '#f9f9f9', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <h2 style={{ marginBottom: '8px', color: '#111' }}>Minero Automático - Folaxi</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>Saldo actual: <strong style={{ color: '#2563eb', fontSize: '1.2rem' }}>{coins} 🪙</strong></p>
      
      {/* Barra de progreso interactiva */}
      <div style={{ width: '100%', background: '#e5e7eb', height: '24px', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
        <div style={{ 
          width: `${progress}%`, 
          background: progress === 100 ? '#10b981' : '#3b82f6', 
          height: '100%', 
          transition: 'width 0.4s ease-in-out, background 0.4s' 
        }} />
      </div>

      <div style={{ background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '20px', fontSize: '0.9rem', color: '#4b5563' }}>
        Estado: <span style={{ fontWeight: '500', color: isRunning ? '#2563eb' : '#374151' }}>{statusText}</span>
      </div>

      <button 
        onClick={() => setIsRunning(!isRunning)}
        style={{ 
          width: '100%', 
          padding: '14px', 
          background: isRunning ? '#dc2626' : '#2563eb', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '8px', 
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '1rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          transition: 'background 0.2s'
        }}
      >
        {isRunning ? 'Detener Minería' : 'Iniciar Minería Automática'}
      </button>
    </div>
  );
}
