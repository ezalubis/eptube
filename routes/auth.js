import conn from "../db.js";
import jwt from "jsonwebtoken";

export async function login(req, res) {
    const rows = await conn.query(
        `SELECT * FROM profile WHERE username = '${req.body.username}'`
    );
    if (rows.length > 0) {
        if (req.body.passwordd === rows[0].passwordd) {
            const token = jwt.sign(rows[0], "rahasia");
            res.send(token);
        } else {
            res.status(401).send("Kata sandi salah.");
        }
    } else {
        res.status(401).send("Nama pengguna tidak ditemukan.");
    }
}