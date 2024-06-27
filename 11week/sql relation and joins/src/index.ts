import { Client } from "pg";
const client = new Client({
  connectionString:
    "postgresql://postgres:mysecrectpassword@localhost:5432/postgres",
});

const createUsersTable = async () => {
  await client.connect();
  const result = await client.query(`
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`);
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
    await client.connect();
    // Ensure client connection is established
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

// createUsersTable();
// insertIntoTable("saratam67", "snammthegrt@gmail.com", "htybjvf8u");

// -----------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------FOREIGN KEYS AND RELATIONSHPS--------------------------------

const addressTable = async () => {
  try {
    await client.connect();
    const response = await client.query(`
        CREATE TABLE addresses (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            city VARCHAR(100) NOT NULL,
            country VARCHAR(100) NOT NULL,
            street VARCHAR(255) NOT NULL,
            pincode VARCHAR(20),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        `); //or could use ON DELETE CASCADE
  } catch (error) {
    console.log(error);
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

// ==========================================================================================================================================
// ==================================================TRANSACTIONS======================================================================
async function insertUserAndAddress(
  username: string,
  email: string,
  password: string,
  city: string,
  country: string,
  street: string,
  pincode: string
) {
  const client = new Client({
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "mysecretpassword",
  });

  try {
    await client.connect();

    // Start transaction
    await client.query("BEGIN"); //======================================================FIRST QUERY TO BE RUN

    // Insert user
    const insertUserText = `
          INSERT INTO users (username, email, password)
          VALUES ($1, $2, $3)
          RETURNING id;
      `;
    const userRes = await client.query(insertUserText, [
      username,
      email,
      password,
    ]);
    const userId = userRes.rows[0].id;

    // Insert address using the returned user ID
    const insertAddressText = `
          INSERT INTO addresses (user_id, city, country, street, pincode)
          VALUES ($1, $2, $3, $4, $5);
      `;
    await client.query(insertAddressText, [
      userId,
      city,
      country,
      street,
      pincode,
    ]);

    // Commit transaction
    await client.query("COMMIT"); //====================================================LAST QUERY TO COMMIT THE TRANSACTION

    console.log("User and address inserted successfully");
  } catch (err) {
    await client.query("ROLLBACK"); // Roll back the transaction on error
    console.error("Error during transaction, rolled back.", err);
    throw err;
  } finally {
    await client.end(); // Close the client connection
  }
}

// ============================================================JOINS========================================================
// give the result by joning 2  or more tables together

const queries = `SELECT users.id, users.username, users.email, addresses.city, addresses.country, addresses.street, addresses.pincode
FROM users 
JOIN addresses ON users.id = addresses.user_id
WHERE users.id = YOUR_USER_ID;`;

// here users=left table and addresses=right table

const queries2 = `SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
            FROM users u
            JOIN addresses a ON u.id = a.user_id
            WHERE u.id = $1`;
// types of joim
// 1. inner join = join by default returns rows when both of the tables has matches
// 2. left join=  suppose we have values that match in left table but donot have correspoding entries in righ table, then on left join it returns the result with the columns of left table filled and the colums of right table empty or null 
// 3. right joins
// 4. full joins= show everything irrespective of the relationships

const queriesJoins={
  innerJoin: `SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
  FROM users
  INNER JOIN addresses ON users.id = addresses.user_id;`,
  // returns no null column, both should match 

  leftJoin:`SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
  FROM users
  LEFT JOIN addresses ON users.id = addresses.user_id;`,
  // returns everything from left(users) irrespective of mathces on the right(addresses)

  rightJoin:`SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
  FROM users
  RIGHT JOIN addresses ON users.id = addresses.user_id;`,
  // returns everything from right{addresses} irrespective of mathces on the left(users)

  fullJoin:`SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
  FROM users
  FULL JOIN addresses ON users.id = addresses.user_id;`
  // combined left and right joins
};
