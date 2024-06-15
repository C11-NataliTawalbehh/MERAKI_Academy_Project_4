require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const db = require("./models/db")
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const roleRouter = require("./routes/role");
const userRoter = require("./routes/user");
const productRoter = require("./routes/product");
const favoriteRoter = require("./routes/favorite")
const checkoutRoter = require("./routes/checkout");
const categoryRouter = require("./routes/category");

app.use("/roles" , roleRouter);
app.use("/user" , userRoter);
app.use("/product" ,productRoter);
app.use("/favorite",favoriteRoter);
app.use("/checkout" , checkoutRoter);
app.use("/categories" ,categoryRouter);
// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
