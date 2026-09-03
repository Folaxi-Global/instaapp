'use client';
import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function MinerPage() {
  const [step, setStep] = useState('login'); // 'login' | 'loading' | 'dashboard'
  const [loadingProgress, setLoadingProgress] = useState(0);

  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [coins, setCoins] = useState(0);
  const [statusText, setStatusText] = useState('Sistema en reposo, listo para iniciar.');
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Estados para el login directo estilo APK de Instagram
  const [igUsername, setIgUsername] = useState('');
  const [igPassword, setIgPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [saveAccount, setSaveAccount] = useState(true);
  const [savingAccount, setSavingAccount] = useState(false);

  const isRunningRef = useRef(isRunning);
  isRunningRef.current = isRunning;

  // Carga inicial híbrida: revisa Supabase o permite bypass local instantáneo
  useEffect(() => {
    async function fetchUserAndData() {
      const savedUser = localStorage.getItem('folaxi_ig_user');
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        
        const { data: profile } = await supabase
          .from('profiles')
          .select('coins, ig_username')
          .eq('id', session.user.id)
          .single();
        
        if (profile) {
          setCoins(profile.coins || 0);
          if (profile.ig_username) {
            setIgUsername(profile.ig_username);
            setStep('dashboard');
          }
        }
      } else if (savedUser) {
        setUser({ id: 'local-bypass', email: `${savedUser}@folaxi.com` });
        setIgUsername(savedUser);
        setStep('dashboard');
        const savedCoins = localStorage.getItem('folaxi_coins');
        if (savedCoins) setCoins(parseInt(savedCoins));
      }

      setLoadingUser(false);
    }
    fetchUserAndData();
  }, []);

  const handleLinkAccount = async (e) => {
    e.preventDefault();
    if (!igUsername.trim() || !igPassword.trim()) return;
    setSavingAccount(true);

    // Activar pantalla de carga (0 a 100%) con el logotipo
    setStep('loading');
    setLoadingProgress(0);

    let currentProgress = 0;
    const interval = setInterval(async () => {
      currentProgress += Math.floor(Math.random() * 20) + 10;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);

        try {
          localStorage.setItem('folaxi_ig_user', igUsername.trim());
          localStorage.setItem('folaxi_coins', coins.toString());

          if (user && user.id !== 'local-bypass') {
            await supabase
              .from('profiles')
              .update({ ig_username: igUsername.trim() })
              .eq('id', user.id);
          } else {
            setUser({ id: 'local-bypass', email: `${igUsername.trim()}@folaxi.com` });
          }
          setStatusText('¡Cuenta vinculada con éxito! Motor listo.');
        } catch (err) {
          console.error(err);
          setStatusText('¡Cuenta vinculada en modo local!');
        } finally {
          setSavingAccount(false);
          setTimeout(() => {
            setStep('dashboard');
          }, 400);
        }
      }
      setLoadingProgress(currentProgress);
    }, 250);
  };

  useEffect(() => {
    if (!isRunning || step !== 'dashboard') return;

    let isMounted = true;

    const runMiningLoop = async () => {
      while (isRunningRef.current && isMounted) {
        try {
          setStatusText('Buscando tarea optimizada en la red...');
          setProgress(25);

          if (!user || user.id === 'local-bypass') {
            await new Promise((resolve) => setTimeout(resolve, 2500));
            if (!isRunningRef.current || !isMounted) break;
            
            setStatusText('Ejecutando acción de interacción segura...');
            setProgress(65);
            await new Promise((resolve) => setTimeout(resolve, 2500));
            if (!isRunningRef.current || !isMounted) break;

            setCoins((prev) => {
              const newBalance = prev + 5;
              localStorage.setItem('folaxi_coins', newBalance.toString());
              return newBalance;
            });
            setProgress(100);
            setStatusText('¡Éxito! +5 monedas acreditadas.');
            await new Promise((resolve) => setTimeout(resolve, 1200));
            continue;
          }

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
  }, [isRunning, step, user]);

  if (loadingUser) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#9333ea', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
        <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>Cargando Folaxi...</p>
      </div>
    );
  }

  return (
    <div style={{ background: 'linear-gradient(135deg, #c084fc 0%, #9333ea 50%, #7e22ce 100%)', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '30px 20px', fontFamily: 'system-ui, sans-serif', color: '#fff', boxSizing: 'border-box' }}>
      
      {/* Cabecera / Saldo superior */}
      <div style={{ width: '100%', maxWidth: '400px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: '800', fontSize: '1.2rem', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo-folaxi.jpg" alt="Logo" style={{ width: '28px', height: '28px', borderRadius: '6px', objectFit: 'cover' }} />
          Folaxi<span style={{ color: '#fbbf24' }}>.com</span>
        </div>
        {step === 'dashboard' && (
          <div style={{ background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <span>🪙</span>
            <span style={{ fontWeight: '800', fontSize: '1rem' }}>{coins}</span>
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center', width: '100%', maxWidth: '400px', margin: '20px 0' }}>
        
        {/* PASO 1: Login de Instagram */}
        {step === 'login' && (
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '900', fontStyle: 'italic', letterSpacing: '-0.03em', margin: '0 0 25px 0', textShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
              Folaxi
            </h1>

            <div style={{ background: '#fff', borderRadius: '24px', padding: '35px 24px 24px 24px', color: '#1e293b', boxShadow: '0 20px 40px rgba(0,0,0,0.25)', position: 'relative' }}>
              
              <div style={{ position: 'absolute', top: '-35px', left: '50%', transform: 'translateX(-50%)', width: '70px', height: '70px', background: '#f8fafc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid #fff', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
                <span style={{ fontSize: '1.8rem' }}>📸</span>
              </div>

              <form onSubmit={handleLinkAccount} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
                <input 
                  type="text" 
                  placeholder="Instagram username" 
                  value={igUsername}
                  onChange={(e) => setIgUsername(e.target.value)}
                  required
                  style={{ padding: '14px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '0.95rem', outline: 'none', color: '#000' }}
                />
                
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="Instagram password" 
                    value={igPassword}
                    onChange={(e) => setIgPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', color: '#000' }}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    style={{ position: 'absolute', right: '14px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}
                  >
                    👁️
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#64748b', textAlign: 'left', marginTop: '2px' }}>
                  <input 
                    type="checkbox" 
                    checked={saveAccount} 
                    onChange={(e) => setSaveAccount(e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: '#9333ea', cursor: 'pointer' }}
                  />
                  <label>Guardar cuenta</label>
                </div>

                <button 
                  type="submit" 
                  disabled={savingAccount}
                  style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: '#000', border: 'none', padding: '16px', borderRadius: '14px', fontWeight: '800', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 8px 20px rgba(245, 158, 11, 0.3)', marginTop: '6px', transition: 'transform 0.2s' }}
                >
                  {savingAccount ? 'Conectando...' : 'Iniciar sesión'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* PASO 2: Pantalla de Carga (0 a 100%) con Logo */}
        {step === 'loading' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px 10px' }}>
            <img src="/logo-folaxi.jpg" alt="Folaxi Logo" style={{ width: '85px', height: '85px', borderRadius: '20px', objectFit: 'cover', boxShadow: '0 15px 30px rgba(0,0,0,0.3)', marginBottom: '20px', border: '3px solid rgba(255,255,255,0.4)' }} />
            <h2 style={{ fontSize: '1.8rem', fontWeight: '900', fontStyle: 'italic', margin: '0 0 8px 0' }}>Folaxi.com</h2>
            <p style={{ fontSize: '0.9rem', opacity: '0.9', marginBottom: '25px' }}>Sincronizando motor y conectando perfil...</p>
            
            <div style={{ width: '100%', background: 'rgba(0,0,0,0.25)', height: '12px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ width: `${loadingProgress}%`, background: '#fbbf24', height: '100%', transition: 'width 0.3s ease-in-out', borderRadius: '8px' }} />
            </div>
            <div style={{ marginTop: '10px', fontWeight: '800', fontSize: '1.1rem' }}>{loadingProgress}%</div>
          </div>
        )}

        {/* PASO 3: Dashboard de Minería */}
        {step === 'dashboard' && (
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(12px)', borderRadius: '24px', padding: '30px 20px', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ fontSize: '1.4rem' }}>✅</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.75rem', opacity: '0.8', textTransform: 'uppercase', fontWeight: '700' }}>Cuenta Vinculada</div>
                <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{igUsername}</div>
              </div>
              <button 
                onClick={() => {
                  localStorage.removeItem('folaxi_ig_user');
                  setStep('login');
                  setIsRunning(false);
                }}
                style={{ background: 'rgba(0,0,0,0.2)', border: 'none', color: '#fff', fontSize: '0.75rem', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', marginLeft: 'auto' }}
              >
                Cambiar
              </button>
            </div>

            {/* Barra de Progreso */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', opacity: '0.9', marginBottom: '6px', fontWeight: '600' }}>
                <span>PROGRESO DEL MOTOR</span>
                <span>{progress}%</span>
              </div>
              <div style={{ width: '100%', background: 'rgba(0,0,0,0.2)', height: '10px', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${progress}%`, 
                  background: progress === 100 ? '#34d399' : '#fbbf24', 
                  height: '100%', 
                  transition: 'width 0.4s ease-in-out',
                  borderRadius: '6px'
                }} />
              </div>
            </div>

            {/* Estado */}
            <div style={{ background: 'rgba(0,0,0,0.25)', padding: '14px', borderRadius: '12px', marginBottom: '20px', fontSize: '0.88rem', textAlign: 'center', fontWeight: '500' }}>
              {statusText}
            </div>

            {/* Botón Minería */}
            <button 
              onClick={() => setIsRunning(!isRunning)}
              style={{ 
                width: '100%', 
                padding: '16px', 
                background: isRunning ? '#ef4444' : 'linear-gradient(135deg, #fbbf24, #f59e0b)', 
                color: isRunning ? '#fff' : '#000', 
                border: 'none', 
                borderRadius: '14px', 
                cursor: 'pointer',
                fontWeight: '900',
                fontSize: '1rem',
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                transition: 'all 0.2s'
              }}
            >
              {isRunning ? '⏹️ Detener Minería' : '🚀 Iniciar Minería Automática'}
            </button>
          </div>
        )}
      </div>

      {/* Pie de página soporte */}
      <div style={{ textAlign: 'center', fontSize: '0.8rem', opacity: '0.85', display: 'flex', flexDirection: 'column', gap: '3px' }}>
        <span>Support email: support@folaxi.com</span>
        <span>Site: https://folaxi.com</span>
        <span style={{ opacity: '0.6', marginTop: '2px' }}>6.0.0-R</span>
      </div>

    </div>
  );
}
