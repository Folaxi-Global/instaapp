import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'Falta el ID de usuario' }, { status: 400 });
    }

    // Obtener IDs de tareas que este usuario ya completó
    const { data: executedLogs } = await supabase
      .from('task_logs')
      .select('task_id')
      .eq('executor_id', userId);

    const excludedTaskIds = executedLogs?.map(log => log.task_id) || [];

    // Buscar una tarea activa que cumpla las condiciones
    let query = supabase
      .from('tasks')
      .select('*')
      .eq('status', 'active')
      .neq('user_id', userId) // Evita que haga sus propias tareas
      .order('created_at', { ascending: true })
      .limit(1);

    if (excludedTaskIds.length > 0) {
      query = query.not('id', 'in', `(${excludedTaskIds.join(',')})`);
    }

    const { data: tasks, error } = await query;

    if (error || !tasks || tasks.length === 0) {
      return NextResponse.json({ message: 'No hay tareas disponibles en este momento' }, { status: 404 });
    }

    const task = tasks[0];

    return NextResponse.json({ success: true, task });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
