const express = require("express");
const Router = express.Router();
const { getuserinfo } = require("../controllers/getitems");

// Middleware to handle JSON requests
Router.use(express.json());
// Define routes
Router.get("/getuserinfo", getuserinfo);
module.exports = Router;
