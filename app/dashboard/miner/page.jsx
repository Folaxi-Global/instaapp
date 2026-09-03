'use client';
import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function MinerPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [coins, setCoins] = useState(0);
  const [statusText, setStatusText] = useState('Sistema en reposo, listo para iniciar.');
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Estados para capturar credenciales de Instagram opcionales o requeridas para minería
  const [igUsername, setIgUsername] = useState('');
  const [igPassword, setIgPassword] = useState('');
  const [isAccountLinked, setIsAccountLinked] = useState(false);
  const [savingAccount, setSavingAccount] = useState(false);

  const isRunningRef = useRef(isRunning);
  isRunningRef.current = isRunning;

  useEffect(() => {
    async function fetchUserAndData() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        
        // Cargar perfil y datos de Instagram si ya están guardados
        const { data: profile } = await supabase
          .from('profiles')
          .select('coins, ig_username')
          .eq('id', session.user.id)
          .single();
        
        if (profile) {
          setCoins(profile.coins || 0);
          if (profile.ig_username) {
            setIgUsername(profile.ig_username);
            setIsAccountLinked(true);
          }
        }
      }
      setLoadingUser(false);
    }
    fetchUserAndData();
  }, []);

  // Función para guardar o enlazar la cuenta de Instagram de forma segura
  const handleLinkAccount = async (e) => {
    e.preventDefault();
    if (!igUsername.trim()) return;
    setSavingAccount(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ ig_username: igUsername.trim() })
        .eq('id', user.id);

      if (error) throw error;
      setIsAccountLinked(true);
      setStatusText('¡Cuenta de Instagram vinculada con éxito!');
    } catch (err) {
      console.error(err);
      alert('Error al vincular la cuenta de Instagram.');
    } finally {
      setSavingAccount(false);
    }
  };

  // Bucle optimizado de minería automática con async/await secuencial
  useEffect(() => {
    if (!isRunning || !user) return;

    let isMounted = true;

    const runMiningLoop = async () => {
      while (isRunningRef.current && isMounted) {
        try {
          setStatusText('Buscando tarea optimizada en la red...');
          setProgress(25);

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

          setStatusText(`Ejecutando acción (${data.task.type}): Procesando de forma segura...`);
          setProgress(65);

          await new Promise((resolve) => setTimeout(resolve, 3000));
          if (!isRunningRef.current || !isMounted) break;

          const completeRes = await fetch('/api/tasks/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ taskId: data.task.id, executorId: user.id }),
          });
          const completeData = await completeRes.json();

          if (completeRes.ok && isMounted) {
            setCoins(completeData.newBalance);
            setProgress(100);
            setStatusText(`¡Éxito! +${completeData.earnedCoins} monedas acreditadas.`);
            await new Promise((resolve) => setTimeout(resolve, 1200));
          } else {
            setStatusText(completeData.error || 'Error al validar tarea');
            await new Promise((resolve) => setTimeout(resolve, 2000));
          }
        } catch (err) {
          console.error(err);
          if (isMounted) {
            setStatusText('Error de conexión con el motor de minería');
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
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#09090b', color: '#a1a1aa', fontFamily: 'system-ui, sans-serif' }}>
        <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>Cargando motor de Folaxi...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', fontFamily: 'system-ui, sans-serif', background: '#09090b', color: '#fff', minHeight: '100vh' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '10px' }}>Acceso Restringido</h2>
        <p style={{ color: '#a1a1aa' }}>Debes iniciar sesión en folaxi.com para operar el minero automático.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: '480px', margin: '40px auto', fontFamily: 'system-ui, sans-serif', background: '#121214', color: '#f4f4f5', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', border: '1px solid #27272a' }}>
      
      {/* Cabecera Pro */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #27272a', paddingBottom: '16px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '800', color: '#fff', letterSpacing: '-0.02em' }}>Folaxi Engine</h2>
          <span style={{ fontSize: '0.8rem', color: '#a1a1aa', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Minería Segura v6.0</span>
        </div>
        <div style={{ background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', padding: '8px 16px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.1rem' }}>🪙</span>
          <span style={{ fontWeight: '800', color: '#c084fc', fontSize: '1.1rem' }}>{coins}</span>
        </div>
      </div>

      {/* Bloque de Vinculación de Instagram */}
      {!isAccountLinked ? (
        <form onSubmit={handleLinkAccount} style={{ background: '#18181b', padding: '20px', borderRadius: '16px', border: '1px solid #27272a', marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '1rem', fontWeight: '700', color: '#fff' }}>🔗 Vincular Cuenta de Instagram</h3>
          <p style={{ fontSize: '0.82rem', color: '#a1a1aa', margin: '0 0 16px 0', lineHeight: '1.4' }}>
            Ingresa tu usuario y contraseña de Instagram de forma segura para activar el motor de interacciones automáticas (Sin contraseñas guardadas en texto plano).
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input 
              type="text" 
              placeholder="@tu_usuario_ig" 
              value={igUsername}
              onChange={(e) => setIgUsername(e.target.value)}
              required
              style={{ padding: '12px 14px', background: '#09090b', border: '1px solid #27272a', borderRadius: '10px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
            />
            <input 
              type="password" 
              placeholder="Contraseña de Instagram" 
              value={igPassword}
              onChange={(e) => setIgPassword(e.target.value)}
              required
              style={{ padding: '12px 14px', background: '#09090b', border: '1px solid #27272a', borderRadius: '10px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
            />
            <button 
              type="submit" 
              disabled={savingAccount}
              style={{ background: '#9333ea', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem', transition: 'background 0.2s', marginTop: '4px' }}
            >
              {savingAccount ? 'Verificando y Enlazando...' : 'Vincular e Iniciar Motor ⚡'}
            </button>
          </div>
        </form>
      ) : (
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '12px 16px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.2rem' }}>✅</span>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: '700', textTransform: 'uppercase' }}>Cuenta Activa</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#fff' }}>{igUsername}</div>
            </div>
          </div>
          <button 
            onClick={() => setIsAccountLinked(false)}
            style={{ background: 'transparent', border: 'none', color: '#a1a1aa', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Cambiar
          </button>
        </div>
      )}

      {/* Barra de progreso de minería Pro */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '8px', fontWeight: '600' }}>
          <span>PROGRESO DE CICLO</span>
          <span>{progress}%</span>
        </div>
        <div style={{ width: '100%', background: '#27272a', height: '10px', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ 
            width: `${progress}%`, 
            background: progress === 100 ? '#10b981' : 'linear-gradient(90deg, #c084fc, #9333ea)', 
            height: '100%', 
            transition: 'width 0.4s ease-in-out, background 0.4s',
            borderRadius: '6px'
          }} />
        </div>
      </div>

      {/* Caja de Estado */}
      <div style={{ background: '#18181b', padding: '16px', borderRadius: '14px', border: '1px solid #27272a', marginBottom: '24px', fontSize: '0.9rem', color: '#d4d4d8', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: isRunning ? '#10b981' : '#71717a', boxShadow: isRunning ? '0 0 10px #10b981' : 'none' }}></div>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: '0.75rem', display: 'block', color: '#71717a', textTransform: 'uppercase', fontWeight: '700' }}>Estado del Sistema</span>
          <span style={{ fontWeight: '600', color: '#fff' }}>{statusText}</span>
        </div>
      </div>

      {/* Botón de Control Principal */}
      <button 
        onClick={() => {
          if (!isAccountLinked) {
            alert('Por favor vincula tu cuenta de Instagram antes de iniciar la minería.');
            return;
          }
          setIsRunning(!isRunning);
        }}
        style={{ 
          width: '100%', 
          padding: '16px', 
          background: isRunning ? '#ef4444' : 'linear-gradient(135deg, #a855f7, #9333ea)', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '14px', 
          cursor: 'pointer',
          fontWeight: '800',
          fontSize: '1rem',
          letterSpacing: '-0.01em',
          boxShadow: isRunning ? '0 8px 20px rgba(239, 68, 68, 0.3)' : '0 8px 25px rgba(147, 51, 234, 0.4)',
          transition: 'all 0.2s'
        }}
      >
        {isRunning ? '⏹️ Detener Motor de Minería' : '🚀 Iniciar Minería Automática'}
      </button>

    </div>
  );
}
