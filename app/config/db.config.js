import dotenv from "dotenv";

dotenv.config();
const dbconfig={
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_NAME,
}

export default dbconfig