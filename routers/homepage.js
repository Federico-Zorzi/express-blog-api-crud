const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(
    `Server del mio blog
      <a href='/posts'>Bacheca dei posts</a>`
  );
});

module.exports = router;
