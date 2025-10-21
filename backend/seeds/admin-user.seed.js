import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

/**
 * Seed de usuario administrador
 */
async function seedAdminUser() {
  console.log('🌱 Seeding usuario administrador...\n');

  try {
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: 'admin@test.com' }
    });

    if (existingUser) {
      console.log('⚠️  Usuario admin@test.com ya existe. Actualizando...');
      
      // Actualizar con la nueva contraseña y rol
      const hashedPassword = await bcrypt.hash('123456', 10);
      
      const updatedUser = await prisma.user.update({
        where: { email: 'admin@test.com' },
        data: {
          password: hashedPassword,
          role: 'profesor',
          name: 'Administrador'
        }
      });

      console.log('✅ Usuario actualizado:');
      console.log(`   📧 Email: ${updatedUser.email}`);
      console.log(`   👤 Nombre: ${updatedUser.name}`);
      console.log(`   👔 Role: ${updatedUser.role}`);
      console.log(`   🔑 Password: 123456`);
    } else {
      // Crear nuevo usuario
      const hashedPassword = await bcrypt.hash('123456', 10);
      
      const user = await prisma.user.create({
        data: {
          email: 'admin@test.com',
          password: hashedPassword,
          name: 'Administrador',
          role: 'profesor'
        }
      });

      console.log('✅ Usuario creado:');
      console.log(`   📧 Email: ${user.email}`);
      console.log(`   👤 Nombre: ${user.name}`);
      console.log(`   👔 Role: ${user.role}`);
      console.log(`   🔑 Password: 123456`);
    }

    console.log('\n✅ Seed completado!\n');
  } catch (error) {
    console.error('❌ Error al crear usuario admin:', error);
    throw error;
  }
}

seedAdminUser()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
