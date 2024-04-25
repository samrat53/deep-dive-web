import { Client } from "pg";
require("dotenv").config();

// postgresql://username:password@host/database
const connectionString = process.env.connectionString;
const client = new Client({
  connectionString: connectionString,
});

const createUsersTable = async () => {
  await client.connect();
  const result = await client.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            createed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
  console.log(result);
};

const insertIntoTable = async (
  username: string,
  email: string,
  password: string
) => {
  // const query = `INSERT INTO users(username,email,password) VALUES (${username},${email},${password});`;
  // const query = `INSERT INTO users(username,email,password) VALUES ($1,$2,$3)`;
  // const values = [username, email, password];
  // const result = await client.query(query, values);
  // console.log("insertion done" + result);
  try {
    await client.connect(); // Ensure client connection is established
    // Use parameterized query to prevent SQL injection
    const insertQuery =
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
    const values = [username, email, password];
    const res = await client.query(insertQuery, values);
    console.log("Insertion success:", res); // Output insertion result
  } catch (err) {
    console.error("Error during the insertion:", err);
  } finally {
    await client.end(); // Close the client connection
  }
};
const getUsers = async (email: string) => {
  const query = `SELECT * FROM users WHERE email LIKE $1`;
  const values = [email];
  try {
    await client.connect();
    const result = await client.query(query, values);
    if (result.rows.length > 0) {
      console.log(`User found: ,`, result.rows);
    } else console.log("No user found");
  } catch (error) {
    console.log(`error finding the user`);
  }
};
// createUsersTable();
// insertIntoTable("sam5", "sak@gmail.com", "passwordwerd");
getUsers("sak@gmail.com");
