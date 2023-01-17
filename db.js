import mariadb from "mariadb";

const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    database: "eptube",
});

const conn = await pool.getConnection();
console.log("Basis data telah terhubung.");

export default conn;