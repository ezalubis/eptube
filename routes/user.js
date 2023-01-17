import conn from "../db.js";

export async function getAllUser(_req, res) {
    const rows = await conn.query(`SELECT * FROM userr ORDER BY waktu DESC`);
    res.send(rows);
}
export async function userUpload(req, res) {
    await conn.query(
        `INSERT INTO userr VALUES ('${req.body.user}','${req.file.filename}','${req.body.judul}',now())`
    );
    res.send("user berhasil upload");
}
export async function editUpload(req, res) {
    await conn.query(
        `UPDATE userr SET user= '${req.body.user}', judul ='${req.body.judul}' WHERE judul ='${req.params.judul}'`
    );
    res.send("User dan judul telah diedit.");
}
export async function deleteVideoByJudul(req, res) {
    await conn.query(`DELETE FROM userr WHERE judul = '${req.params.judul}'`);
    res.send("Video telah dihapus.");
}
export async function daftar(req, res) {
    await conn.query(
        `INSERT INTO profile VALUES (null,'${req.body.username}','${req.body.password}')`
    );
    res.send("Daftar Berhasil");
}