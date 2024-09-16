import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { createPass } from "./createPass";
import { downloadPass } from "./downloadPass";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

app.get("/create-pass", createPass);
app.get("/download-pass/:id", downloadPass);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
