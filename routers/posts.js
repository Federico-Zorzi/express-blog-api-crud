const express = require("express");
const router = express.Router();
const posts = require("../db/postsList");

// * Index
router.get("/", (req, res) => {
  const titleFilter = req.query.title;
  const hashtagFilter = req.query.hashtag;
  let newPostList = posts;

  if (titleFilter) {
    newPostList = posts.filter((post) =>
      post.titolo.toLowerCase().includes(titleFilter.toLowerCase())
    );
  }
  if (hashtagFilter) {
    newPostList = newPostList.filter((post) => {
      let hashtagIncluded = false;
      post.tags.forEach((hashtag) => {
        if (hashtag.toLowerCase().includes(hashtagFilter.toLowerCase())) {
          hashtagIncluded = true;
        }
      });
      return hashtagIncluded;
    });
  }

  res.json({ newPostList, listLength: newPostList.length });
});

// * Show
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  /* controllo se l'id è valido */
  if (isNaN(id)) {
    return res.status(400).send(`id required not valid`);
  }

  /* trovo il post tramite l'id */
  const postRequired = posts.find((post) => post.id === id);

  if (!postRequired) {
    return res.status(404).send(`id required not found`);
  }

  /* res.send(`Show post with id ${id}`); */
  res.send(postRequired);
});

// * Store
router.post("/", (req, res) => {
  res.send(`Store post`);
});

// * Update
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  /* controllo se l'id è valido */
  if (isNaN(id)) {
    return res.status(400).send(`id required not valid`);
  }

  res.send(`Update post with id ${id}`);
});

// * Modify
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  /* controllo se l'id è valido */
  if (isNaN(id)) {
    return res.status(400).send(`id required not valid`);
  }

  res.send(`Modify post with id ${id}`);
});

// * Destroy
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  /* controllo se l'id è valido */
  if (isNaN(id)) {
    return res.status(400).send(`id required not valid`);
  }

  /* ricerca dell'index dell'elemento con l'id scelto da eliminare */
  const postToDelete = posts.find((post) => post.id === id);

  if (!postToDelete) {
    return res.status(404).send(`id required not found`);
  }

  const postToDeleteIndex = posts.indexOf(postToDelete);

  if (!postToDeleteIndex && postToDeleteIndex !== 0) {
    return res.status(404).send(`id required not found`);
  }

  /* rimozione dell'index trovato */
  const postDeleted = posts.splice(postToDeleteIndex, 1);

  /*   res.send(`Delete post with id ${id}`); */
  res.json({ postDeleted, posts });
});

module.exports = router;
