import pg from "pg";

const { Client } = pg;

const connection = async () => {
  const client = new Client({
    user: "postgres",
    password: "12",
    host: "localhost",
    port: 5432,
    database: "postgr1",
  });

  try {
    await client.connect();
    console.log("Connected to PostgreSQL database");
    return client;
  } catch (err) {
    console.error("Error connecting to PostgreSQL database", err);
    throw err;
  }
};

export default connection;

