import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const { userId, packageId } = await request.json();

    if (!userId || !packageId) {
      return NextResponse.json({ error: 'Faltan datos de la compra (userId o packageId)' }, { status: 400 });
    }

    // 1. Definir los paquetes disponibles de monedas en el sistema
    const coinPackages = {
      'pack_100_views': { title: 'Paquete de 100 Vistas', coins: 100, price: 1.99 },
      'pack_500_followers': { title: 'Paquete de 500 Seguidores', coins: 500, price: 4.99 },
      'pack_1000_coins': { title: 'Paquete Pro de 1000 Monedas', coins: 1000, price: 8.99 }
    };

    const selectedPackage = coinPackages[packageId];

    if (!selectedPackage) {
      return NextResponse.json({ error: 'El paquete seleccionado no es válido' }, { status: 400 });
    }

    // 2. Registrar la orden pendiente en la base de datos (puedes crear una tabla `orders` en Supabase)
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        { 
          user_id: userId, 
          package_id: packageId, 
          coins: selectedPackage.coins, 
          amount_paid: selectedPackage.price, 
          status: 'pending' 
        }
      ])
      .select()
      .single();

    if (orderError) {
      // Si la tabla 'orders' aún no ha sido creada, simulamos la respuesta para continuar el flujo
      console.warn('Aviso: La tabla orders no existe o falló el registro, simulando pasarela...');
    }

    // 3. Aquí integrarías la llamada a tu pasarela de pago (ej. Stripe o PayPal) 
    // para generar la URL de pago real. Simularemos una URL de pago externa:
    const mockCheckoutUrl = `https://checkout.folaxi.com/pay?order=${order?.id || 'simulated'}&amount=${selectedPackage.price}`;

    return NextResponse.json({ 
      success: true, 
      checkoutUrl: mockCheckoutUrl,
      package: selectedPackage,
      message: 'Orden de pago generada correctamente'
    });

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
