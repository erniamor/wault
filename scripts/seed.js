const { db } = require('@vercel/postgres');
const {
  USERS,
  VAULTS,
  ELEMENTS,
} = require('../src/logic/placeholder.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      USERS.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedVaults(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "vaults" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS vaults (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    vault_id UUID,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255)
  );
`;

    console.log(`Created "vaults" table`);

    // Insert data into the "vaults" table
    const insertedVaults = await Promise.all(
      VAULTS.map(
        (vault) => client.sql`
        INSERT INTO vaults (id, user_id, vault_id, title, description)
        VALUES (${vault.id}, ${vault.user_id}, ${vault.vault_id}, ${vault.title}, ${vault.description})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedVaults.length} vaults`);

    return {
      createTable,
      vaults: insertedVaults,
    };
  } catch (error) {
    console.error('Error seeding vaults:', error);
    throw error;
  }
}

async function seedElements(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "elements" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS elements (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255),
        url VARCHAR(255),
        user_id UUID NOT NULL,
        vault_id UUID NOT NULL
      );
    `;

    console.log(`Created "elements" table`);

    // Insert data into the "elements" table
    const insertedElements = await Promise.all(
      ELEMENTS.map(
        (element) => client.sql`
        INSERT INTO elements (title, description, url, user_id, vault_id)
        VALUES (${element.title}, ${element.description}, ${element.url}, ${element.user_id}, ${element.vault_id})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedElements.length} elements`);

    return {
      createTable,
      elements: insertedElements,
    };
  } catch (error) {
    console.error('Error seeding elements:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedVaults(client);
  await seedElements(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
