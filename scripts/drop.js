const { db } = require('@vercel/postgres');

async function dropUsers(client) {
  try {
    await client.sql`DROP TABLE IF EXISTS users;`;
    console.log(`users table dropped`);
    return {
    };
  } catch (error) {
    console.error('Error dropping users:', error);
    throw error;
  }
}
async function dropFolders(client) {
  try {
    await client.sql`DROP TABLE IF EXISTS folders;`;
    console.log(`folders table dropped`);
    return {
    };
  } catch (error) {
    console.error('Error dropping folders:', error);
    throw error;
  }
}
async function dropNotes(client) {
  try {
    await client.sql`DROP TABLE IF EXISTS notes;`;
    console.log(`notes table dropped`);
    return {
    };
  } catch (error) {
    console.error('Error dropping notes:', error);
    throw error;
  }
}


async function main() {
  const client = await db.connect();

  await dropUsers(client);
  await dropFolders(client);
  await dropNotes(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to drop the database:',
    err,
  );
});
