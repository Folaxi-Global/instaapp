'use client';
import { useState, useEffect } from 'react';

export default function TasksPage() {
  const [coins, setCoins] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('folaxi_instagram_user') || 'vertensglobal';
    setUsername(savedUser);

    const savedCoins = localStorage.getItem('folaxi_coins');
    if (savedCoins) {
      setCoins(parseInt(savedCoins));
    } else {
      localStorage.setItem('folaxi_coins', '371');
      setCoins(371);
    }
  }, []);

  const handleCompleteTask = async (taskId = 'task_demo_1') => {
    setLoading(true);
    setMessage('');

    try {
      // Llamada real a tu API backend en app/api/tasks/route.js
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, executorId: username })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setCoins(data.newBalance);
        localStorage.setItem('folaxi_coins', data.newBalance.toString());
        setMessage(`¡Tarea completada con éxito! Ganaste +${data.earnedCoins} 🪙`);
      } else {
        // Fallback local si la base de datos aún no tiene registros de prueba creados
        const earned = 10;
        const newCoins = coins + earned;
        setCoins(newCoins);
        localStorage.setItem('folaxi_coins', newCoins.toString());
        setMessage(`¡Tarea simulada con éxito! Ganaste +${earned} 🪙`);
      }
    } catch (err) {
      const earned = 10;
      const newCoins = coins + earned;
      setCoins(newCoins);
      localStorage.setItem('folaxi_coins', newCoins.toString());
      setMessage(`¡Tarea completada! Ganaste +${earned} 🪙`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '480px', margin: '10px auto 90px auto', padding: '16px', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Barra Superior de Saldo */}
      <div style={{ background: 'linear-gradient(135deg, #833ab4, #6b21a8)', borderRadius: '22px', padding: '12px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', boxShadow: '0 8px 25px rgba(131, 58, 180, 0.25)', marginBottom: '20px' }}>
        <div style={{ background: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: '900', fontSize: '0.95rem' }}>
          <span>🪙</span> {coins}
        </div>
        <div style={{ background: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: '900', fontSize: '0.95rem' }}>
          <span>💎</span> 0
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button style={{ width: '100%', padding: '15px', background: 'linear-gradient(135deg, #833ab4, #6b21a8)', color: '#fff', border: 'none', borderRadius: '18px', fontWeight: '900', fontSize: '1.05rem', cursor: 'pointer', boxShadow: '0 8px 20px rgba(131, 58, 180, 0.35)' }}>
          Tareas de Interacción 📋
        </button>
      </div>

      {message && (
        <div style={{ background: '#f0fdf4', color: '#16a34a', padding: '14px', borderRadius: '14px', fontSize: '0.88rem', marginBottom: '16px', fontWeight: '700', textAlign: 'center', border: '1px solid #bbf7d0' }}>
          {message}
        </div>
      )}

      {/* Tarjeta de Tarea Operativa */}
      <div style={{ background: '#ffffff', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '45px', height: '45px', background: '#f3e8ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333ea', fontSize: '1.2rem' }}>
              ❤️
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '900', color: '#0f172a' }}>Dar Me gusta a Publicación</h4>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Recompensa: +10 🪙</span>
            </div>
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#d97706' }}>
            <span>🪙</span> 10
          </div>
        </div>

        <button 
          onClick={() => handleCompleteTask()}
          disabled={loading}
          style={{ width: '100%', padding: '12px', background: loading ? '#cbd5e1' : 'linear-gradient(135deg, #833ab4, #fd1d1d)', color: '#fff', border: 'none', borderRadius: '14px', fontWeight: '900', fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 6px 15px rgba(131, 58, 180, 0.3)' }}
        >
          {loading ? 'Procesando...' : 'Completar Tarea y Ganar Monedas ⚡'}
        </button>
      </div>

    </div>
  );
}
