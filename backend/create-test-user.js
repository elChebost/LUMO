import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    console.log('🔍 Verificando usuario de prueba...\n');
    
    // Verificar si ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: 'admin@test.com' }
    });
    
    if (existingUser) {
      console.log('✅ Usuario de prueba ya existe:');
      console.log(`📧 Email: ${existingUser.email}`);
      console.log(`👤 Nombre: ${existingUser.name}`);
      console.log(`🔑 Password: 123456`);
      return;
    }
    
    console.log('🔧 Creando usuario de prueba...\n');
    
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    const newUser = await prisma.user.create({
      data: {
        name: 'Admin Test',
        email: 'admin@test.com',
        password: hashedPassword
      }
    });
    
    console.log('✅ Usuario de prueba creado exitosamente:');
    console.log(`📧 Email: ${newUser.email}`);
    console.log(`👤 Nombre: ${newUser.name}`);
    console.log(`🔑 Password: 123456`);
    console.log(`🆔 ID: ${newUser.id}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();