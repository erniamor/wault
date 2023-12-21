const { db } = require('@vercel/postgres');
const {
  USERS,
  FOLDERS,
  NOTES,
} = require('./placeholder.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`DROP TABLE IF EXISTS users;`;
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

async function seedFolders(client) {
  try {
    await client.sql`DROP TABLE IF EXISTS folders;`;
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "folders" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS folders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    folder_id UUID,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255)
  );
`;

    console.log(`Created "folders" table`);

    // Insert data into the "folders" table
    const insertedFolders = await Promise.all(
      FOLDERS.map(
        (folder) => client.sql`
        INSERT INTO folders (id, user_id, folder_id, title, description)
        VALUES (${folder.id}, ${folder.user_id}, ${folder.folder_id}, ${folder.title}, ${folder.description})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedFolders.length} folders`);

    return {
      createTable,
      folders: insertedFolders,
    };
  } catch (error) {
    console.error('Error seeding folders:', error);
    throw error;
  }
}

async function seedNotes(client) {
  try {
    await client.sql`DROP TABLE IF EXISTS notes;`;
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "notes" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS notes (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255),
        content TEXT,
        url TEXT,
        user_id UUID NOT NULL,
        folder_id UUID
      );
    `;

    console.log(`Created "notes" table`);

    // Insert data into the "notes" table
    const insertedNotes = await Promise.all(
      NOTES.map(
        (note) => client.sql`
        INSERT INTO notes (title, description, content, url, user_id, folder_id)
        VALUES (${note.title}, ${note.description}, ${note.content}, ${note.url}, ${note.user_id}, ${note.folder_id})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedNotes.length} notes`);

    return {
      createTable,
      notes: insertedNotes,
    };
  } catch (error) {
    console.error('Error seeding notes:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedFolders(client);
  await seedNotes(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
