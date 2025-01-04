const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

app.post("/upload", upload.single("audio"), (req, res) => {
  res.status(200).send({ message: "Audio uploaded successfully", file: req.file });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
