import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Seed function to populate the database with test data
 * This function creates sample users for development and testing
 */
async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing users
  await prisma.user.deleteMany();
  console.log('🗑️  Cleared existing users');

  // Create sample users
  const users = [
    {
      email: 'john.doe@example.com',
      name: 'John Doe',
    },
    {
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
    },
    {
      email: 'bob.wilson@example.com',
      name: 'Bob Wilson',
    },
    {
      email: 'alice.johnson@example.com',
      name: 'Alice Johnson',
    },
    {
      email: 'charlie.brown@example.com',
      name: 'Charlie Brown',
    },
    {
      email: 'diana.prince@example.com',
      name: 'Diana Prince',
    },
    {
      email: 'bruce.wayne@example.com',
      name: 'Bruce Wayne',
    },
    {
      email: 'clark.kent@example.com',
      name: 'Clark Kent',
    },
  ];

  // Insert users using bulk insert (createMany)
  const result = await prisma.user.createMany({
    data: users,
    skipDuplicates: true, // Skip if user with same email already exists
  });

  console.log(`✅ Created ${result.count} users using bulk insert`);
  console.log(`🎉 Successfully seeded ${users.length} users!`);
}

/**
 * Execute the seed function and handle errors
 */
main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🔌 Database connection closed');
  });
