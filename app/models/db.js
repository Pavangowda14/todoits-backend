import mysql from "mysql";
import dbconfig from "../config/db.config.js" ;

const connection=mysql.createConnection({
    host:dbconfig.HOST,
    user:dbconfig.USER,
    password:dbconfig.PASSWORD,
    database:dbconfig.DATABASE,
});

connection.connect(error=>{
    if(error){
        throw error
    }
    console.log("mysql connected")
})

export default connection;