import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    console.log('🔍 Consultando usuarios en la base de datos...\n');
    
    const users = await prisma.user.findMany();
    
    if (users.length === 0) {
      console.log('❌ No hay usuarios en la base de datos');
      console.log('💡 Necesitas crear un usuario manualmente');
    } else {
      console.log(`✅ Encontrados ${users.length} usuario(s):`);
      users.forEach((user, index) => {
        console.log(`${index + 1}. 📧 Email: ${user.email}`);
        console.log(`   👤 Nombre: ${user.name}`);
        console.log(`   🆔 ID: ${user.id}\n`);
      });
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();