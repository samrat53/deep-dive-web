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

const createAddressTable = async () => {
  try {
    await client.connect();
    const query = `CREATE TABLE addresses(
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      city VARCHAR(255) NOT NULL,
      country VARCHAR(255) NOT NULL,
      street VARCHAR(255) NOT NULL,
      pincode VARCHAR(20),
      createed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );`;
    const result = await client.query(query);
    console.log(result);
  } catch (error) {
    console.log("error creating the table ", error);
  }
};

const insertIntoAddresses = async (
  user_id: number,
  city: string,
  country: string,
  street: string,
  pincode: number
) => {
  try {
    await client.connect();
    const values = [user_id, city, country, street, pincode];
    const query = `INSERT INTO addresses (user_id,city,country,street,pincode) values ($1,$2,$3,$4,$5);`;
    const result = await client.query(query, values);
    console.log(result);
  } catch (error) {
    console.log(`error in values entry in addresses`, error);
  }
};

const getUserDetailsWithAddresses = async (id: number) => {
  try {
    await client.connect();
    const query = ` 
    SELECT users.id, users.username, users.email, addresses.country, addresses.street, addresses.pincode
    FROM users
    JOIN addresses ON users.id=addresses.user_id
    WHERE users.id= $1;
    `;
    //by defualt JOIN = INNER JOIN
    const result = await client.query(query, [id]);

    if (result.rows.length > 0) {
      console.log(result.rows);
      return result.rows;
    } else {
      console.log(`No users or address found for the given id`);
      return null;
    }
  } catch (error) {
    console.log(`error in find the matched details`, error);
  }
};
// createUsersTable();
// insertIntoTable("sanam67", "snamm@gmail.com", "pashbh");
// getUsers("sak@gmail.com");
// createAddressTable();
// insertIntoAddresses(4, "scl", "uk", "road-911009", 1099876543);
getUserDetailsWithAddresses(3);
