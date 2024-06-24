require("dotenv").config();
const express = require("express");
const cors = require("cors");

require("./models/db");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

// Import routers
const roleRouter = require("./routes/role");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const checkoutRouter = require("./routes/checkout");
const favoriteCartRouter = require("./routes/favoriteCart");
const favoriteRouter = require("./routes/favorite")
// const loginRouter = require("./routes/login");


app.use("/roles" , roleRouter);
app.use("/user" , userRouter);
app.use("/product" ,productRouter);
app.use("/checkout" , checkoutRouter);
app.use("/cart" , favoriteCartRouter);
 app.use("/favorite" , favoriteRouter)

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
