const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authentication = require("./middleware/authentication");
const { checkAuth } = require("./controllers/userController");
// connect to mongodb
connectDb();

const app = express();

//middleware for cross origin request handling (origin and credentials are set since we are working with react on the front end)
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// middleware for parsing the incoming request body
app.use(express.json());
// middleware for parsing the incoming cookies
app.use(cookieParser());

// middleware to use userRoutes for user paths
app.use("/", require("./routes/userRoutes"));

// middleware to use the path "api/employees" for all requests
// app.use("/api/employees", require("./routes/adminRoutes"));
app.use("/api/employees", authentication, require("./routes/adminRoutes"));

app.get("/checkauth", authentication, checkAuth);
// middleware to handle errors
app.use(errorHandler);

const port = process.env.PORT;

app.listen(port, () => {
  console.log("server running on", port);
});
