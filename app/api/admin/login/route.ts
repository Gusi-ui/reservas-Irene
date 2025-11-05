import { NextRequest, NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';

// En producción, usa una clave secreta fuerte y almacénala en variables de entorno
const JWT_SECRET = process.env.JWT_SECRET || 'tu-secreto-jwt-muy-seguro-cambialo-en-produccion';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validar credenciales (en producción, usa bcrypt y base de datos)
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (username === adminUsername && password === adminPassword) {
      // Crear token JWT
      const token = sign(
        { username, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      return NextResponse.json({ 
        success: true, 
        token,
        message: 'Login exitoso' 
      });
    } else {
      return NextResponse.json(
        { error: 'Credenciales incorrectas' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error in login:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}

