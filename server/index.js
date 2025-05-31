const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { readdirSync } = require("fs");
const path = require("path");
const connectDb = require("./lib/connection");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config();
connectDb();
app.use(morgan("dev"));

// ✅ CORS Setup
const corsOptions = {
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

// ✅ SAFELY Load all route files from /routes using absolute path
readdirSync(path.join(__dirname, "routes"))
  .filter((file) => file.endsWith(".js"))
  .forEach((routeFile) => {
    const routeModule = require(`./routes/${routeFile}`);
    if (typeof routeModule === "function") {
      app.use("/api", routeModule);
    }
  });

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
