import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import { login } from "./routes/auth.js";
import {
    getAllUser,
    userUpload,
    editUpload,
    deleteVideoByJudul,
    daftar
} from "./routes/user.js";

const app = express();

app.use(express.static("public"));

app.use(express.json());

function auth(req, res, next) {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "rahasia", async(err, _decoded) => {
            if (!err) {
                next();
            } else {
                res.status(401).send("Token salah.");
            }
        });
    } else {
        res.status(401).send("Token belum ada.");
    }
}

const upload = multer({ dest: "public/videos" });

app.post("/api/daftar", daftar);
app.get("/api/video", getAllUser);
app.post("/api/login", login);
app.use(auth);
app.post("/api/video", upload.single("video"), userUpload);
app.put("/api/video/:judul", editUpload);
app.delete("/api/video/:judul", deleteVideoByJudul);

app.listen(3002, () => console.log("Server sedang berjalan."));