require("dotenv").config();
const express = require("express");
const app = express();
const getitem = require("./Routes/GetRoute");
const { sql, config } = require("./ConfigDB/database");

app.use(express.json());

// Routes
app.use("/api", getitem);
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// Use dynamic port for Azure
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
