import mysql from "mysql";
import dbconfig from "../config/db.config.js";
import logger from "../utils/logger.js";

const createConnection = () => {
  const connection = mysql.createConnection({
    host: dbconfig.HOST,
    user: dbconfig.USER,
    password: dbconfig.PASSWORD,
    database: dbconfig.DATABASE,
    dateStrings: true
  });

  connection.connect((error) => {
    if (error) {
      logger.error(`Database connection failed: ${error.message}`);
      throw error;
    }
    logger.info("MySQL database connected successfully");
  });

  return connection;
};

export default createConnection;
