require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.HOST_PORT;
const domain = process.env.HOST_DOMAIN;
const errorsHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

const homepageRouter = require("./routers/homepage");
const postsRouter = require("./routers/posts");
app.use("/", homepageRouter);
app.use("/posts", postsRouter);

app.use(errorsHandler);
app.use(notFound);

app.listen(port, () => {
  console.log(`Example app listening at ${domain}${port}`);
});

/* console.log("Server del mio blog"); */
