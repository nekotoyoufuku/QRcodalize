import express from "express";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

app.get("/create-pass", async (req, res) => {
  console.log("hey hey hey");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
