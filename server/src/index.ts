import express from "express";
import bodyParser from "body-parser";
import { createPass } from "./createPass";
import { downloadPass } from "./downloadPass";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

app.get("/create-pass", createPass);
app.get("/download-pass/:id", downloadPass);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
