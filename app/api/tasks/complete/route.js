import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const { taskId, executorId } = await request.json();

    if (!taskId || !executorId) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    // 1. Obtener detalles de la tarea
    const { data: task, error: taskError } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', taskId)
      .single();

    if (taskError || !task || task.status !== 'active') {
      return NextResponse.json({ error: 'La tarea no es válida o ya no está activa' }, { status: 400 });
    }

    // 2. Registrar el log de ejecución
    const { error: logError } = await supabase
      .from('task_logs')
      .insert([{ task_id: taskId, executor_id: executorId, status: 'completed' }]);

    if (logError) {
      return NextResponse.json({ error: 'Ya realizaste esta tarea anteriormente' }, { status: 400 });
    }

    // 3. Incrementar el contador de completados en la tarea
    const newCompletedQty = task.completed_quantity + 1;
    const newStatus = newCompletedQty >= task.total_quantity ? 'completed' : 'active';

    await supabase
      .from('tasks')
      .update({ completed_quantity: newCompletedQty, status: newStatus })
      .eq('id', taskId);

    // 4. Sumar las monedas al ejecutor (minero)
    const { data: profile } = await supabase
      .from('profiles')
      .select('coins')
      .eq('id', executorId)
      .single();

    const updatedCoins = (profile?.coins || 0) + task.reward_coins;

    await supabase
      .from('profiles')
      .update({ coins: updatedCoins })
      .eq('id', executorId);

    return NextResponse.json({ 
      success: true, 
      message: 'Tarea completada con éxito',
      earnedCoins: task.reward_coins,
      newBalance: updatedCoins
    });

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
