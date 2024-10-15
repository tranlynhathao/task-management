const express = require("express");
const env = require("dotenv");
env.config();
const cors = require("cors");
const bodyParser = require("body-parser");
const database = require("./config/database");
database.connect();
const app = express();
const port = process.env.PORT;

// parse application/json
app.use(bodyParser.json());

// app.use(cors({
//   origin: 'http://xyz.com',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }));

app.use(cors());

const routesApiV1 = require("./v1/routes/index.route");

routesApiV1(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

