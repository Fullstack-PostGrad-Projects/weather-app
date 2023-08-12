const client = require("../client");
const bcrypt = require("bcrypt");

const SALT_COUNT = 10;

const createUser = async ({ username, password }) => {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING username, id;
        `,
      [username, hashedPassword]
    );
    return user;
  } catch (error) {
    console.error("error in createUser");
    throw error;
  }
};

const grabUserByUsername = async ({ username }) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT  username, id, password
      FROM users 
      WHERE username = $1
    `,
      [username]
    );
    return user;
  } catch (error) {
    console.error("error in grabUserByUsername", error);
  }
};

const grabUserById = async (userId) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT id, username
      FROM users
      WHERE id = $1
      `,
      [userId]
    );
    return user;
  } catch (error) {
    console.error("error in grabUserById");
    throw error;
  }
};

const updateUser = async ({ id, ...fields }) => {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(",");
  if (setString.length === 0) {
    return;
  }
  if (fields?.password) {
    const hashedPassword = await bcrypt.hash(fields.password, SALT_COUNT);
    fields.password = hashedPassword;
  }

  try {
    const {
      rows: [user],
    } = await client.query(
      `
        UPDATE users
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `,
      Object.values(fields)
    );

    return user;
  } catch (error) {
    console.error("error in updateUser");
    throw error;
  }
};
const grabAllUsers = async () => {
  try {
    const { rows: users } = await client.query(`
        SELECT * 
        FROM users
        RETURNING *;
        `);
    return users;
  } catch (error) {
    console.error("error grabbing all users");
    throw error;
  }
};
async function getUser({ username, password }) {
  try {
    const checkUser = await grabUserByUsername({ username });
    const hashedPassword = checkUser.password;
    const isValid = await bcrypt.compare(password, hashedPassword);
    if (isValid) {
      const finalUser = await grabUserById(checkUser.id);
      return finalUser;
    }

    return finalUser;
  } catch (error) {
    console.error(error); // Log the actual error message
    throw error;
  }
}

module.exports = {
  createUser,
  grabUserById,
  updateUser,
  grabAllUsers,
  grabUserByUsername,
  getUser,
};
