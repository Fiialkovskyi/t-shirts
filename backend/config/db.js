import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env;

const connection = mysql.createPool({
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASS,
  connectionLimit: 10,
});

export default connection;
