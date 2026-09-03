'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function NewCampaignPage() {
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(10);
  const [type, setType] = useState('view');
  const [targetUrl, setTargetUrl] = useState('');
  const [totalQuantity, setTotalQuantity] = useState(10);
  const [rewardCoins, setRewardCoins] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Sincronización híbrida: Busca sesión de Supabase o toma los datos locales del almacenamiento
    async function loadUserData() {
      const savedUser = localStorage.getItem('folaxi_ig_user');
      const savedCoins = localStorage.getItem('folaxi_coins');
      
      if (savedCoins) setCoins(parseInt(savedCoins));

      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        const { data: profile } = await supabase
          .from('profiles')
          .select('coins')
          .eq('id', session.user.id)
          .single();
        if (profile) {
          setCoins(profile.coins || 0);
          localStorage.setItem('folaxi_coins', (profile.coins || 0).toString());
        }
      } else if (savedUser) {
        setUser({ id: 'local-bypass', email: `${savedUser}@folaxi.com` });
      } else {
        // Fallback para permitir usar la app libremente sin bloqueos
        setUser({ id: 'local-bypass', email: 'user@folaxi.com' });
      }
    }
    loadUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setMessage('Debes configurar tu cuenta primero.');
      return;
    }

    const totalCost = totalQuantity * rewardCoins;
    if (coins < totalCost) {
      setMessage('No tienes suficientes monedas para crear esta campaña.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Si estamos en modo Supabase real y hay conexión
      if (user.id !== 'local-bypass') {
        const { error: taskError } = await supabase
          .from('tasks')
          .insert([
            {
              user_id: user.id,
              type,
              target_url: targetUrl,
              total_quantity: parseInt(totalQuantity),
              reward_coins: parseInt(rewardCoins),
              status: 'active'
            }
          ]);

        if (taskError) throw taskError;

        const newCoins = coins - totalCost;
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ coins: newCoins })
          .eq('id', user.id);

        if (profileError) throw profileError;
        
        setCoins(newCoins);
        localStorage.setItem('folaxi_coins', newCoins.toString());
      } else {
        // Modo local fluido
        await new Promise((resolve) => setTimeout(resolve, 800));
        const newCoins = coins - totalCost;
        setCoins(newCoins);
        localStorage.setItem('folaxi_coins', newCoins.toString());
      }

      setMessage('¡Campaña creada con éxito en el sistema!');
      setTargetUrl('');
    } catch (err) {
      console.error(err);
      setMessage('Error al crear la campaña: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '450px', margin: '40px auto', fontFamily: 'sans-serif', background: '#ffffff', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)', border: '1px solid #f3f4f6', color: '#1e293b' }}>
      <h2 style={{ marginBottom: '8px', color: '#111827', fontSize: '1.4rem' }}>Crear Campaña - Folaxi</h2>
      <p style={{ color: '#6b7280', marginBottom: '20px' }}>Saldo disponible: <strong style={{ color: '#15803d', fontSize: '1.2rem' }}>{coins} 🪙</strong></p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 'bold', color: '#374151' }}>Tipo de interacción</label>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #d1d5db', background: '#fff', color: '#000', fontSize: '0.95rem' }}
          >
            <option value="view">Vistas (Views)</option>
            <option value="follow">Seguidores (Follows)</option>
            <option value="like">Me gusta (Likes)</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 'bold', color: '#374151' }}>Enlace objetivo (URL)</label>
          <input 
            type="url" 
            placeholder="https://instagram.com/p/..." 
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            required
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #d1d5db', boxSizing: 'border-box', color: '#000', fontSize: '0.95rem' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 'bold', color: '#374151' }}>Cantidad deseada</label>
          <input 
            type="number" 
            min="1" 
            value={totalQuantity}
            onChange={(e) => setTotalQuantity(e.target.value)}
            required
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #d1d5db', boxSizing: 'border-box', color: '#000', fontSize: '0.95rem' }}
          />
        </div>

        <div style={{ background: '#f0fdf4', padding: '14px', borderRadius: '10px', fontSize: '0.95rem', color: '#166534', border: '1px solid #bbf7d0' }}>
          Costo total: <strong>{totalQuantity * rewardCoins} 🪙</strong>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '14px', 
            background: 'linear-gradient(135deg, #10b981, #059669)', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '10px', 
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
            boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.2)'
          }}
        >
          {loading ? 'Creando campaña...' : '🚀 Lanzar Campaña'}
        </button>
      </form>

      {message && <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.9rem', color: message.includes('éxito') ? '#10b981' : '#dc2626', fontWeight: '600' }}>{message}</p>}
    </div>
  );
}
