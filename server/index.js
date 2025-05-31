const express = require("express");
const cors =  require("cors");
const dotenv = require("dotenv");
const {readdirSync} = require("fs");
const connectDb = require("./lib/connection");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config();
connectDb();
app.use(morgan("dev"));
app.use(
    cors({
        origin: process.env.https://novasphere-client.onrender.com,
    })
);
app.use(express.json());

readdirSync("./routes").map((route) => 
    app.use("/api", require(`./routes/${route}`))
);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


