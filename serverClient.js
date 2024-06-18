import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

console.log(path.join(__dirname, "dist", "index.html"));
const app = express();
// app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, "dist")));

app.get("*", (req, res) => {
    console.log(req);
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(5000, err => {
    if (err) {
        throw Error(err);
    }
    console.log("Клиент-сервер запущен");
});
