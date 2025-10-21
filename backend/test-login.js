import fetch from 'node-fetch';

const API_URL = 'http://localhost:3000';

async function testLogin() {
  console.log('🧪 Probando login con credenciales de prueba...\n');

  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@test.com',
        password: '123456'
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Error en login:', data);
      console.error(`   Status: ${response.status}`);
      console.error(`   Message: ${data.error || data.message}`);
      return;
    }

    console.log('✅ Login exitoso!\n');
    console.log('📦 Respuesta del servidor:');
    console.log('   Token:', data.token ? `${data.token.substring(0, 30)}...` : 'NO TOKEN');
    console.log('\n👤 Datos del usuario:');
    console.log(`   ID: ${data.user.id}`);
    console.log(`   Nombre: ${data.user.name}`);
    console.log(`   Email: ${data.user.email}`);
    console.log(`   Role: ${data.user.role}`);
    console.log('\n✅ Todo funcionando correctamente!');
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    console.error('\n💡 Asegúrate de que el backend esté corriendo en puerto 3000');
  }
}

testLogin();
