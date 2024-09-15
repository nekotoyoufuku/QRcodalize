import express from "express";
import bodyParser from "body-parser";
import { createPass } from "./createPass";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

app.get("/create-pass", createPass);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
