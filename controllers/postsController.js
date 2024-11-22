const posts = require("../db/postsList");

// * INDEX
function index(req, res) {
  const titleFilter = req.query.title;
  const hashtagFilter = req.query.hashtag;
  let newPostList = posts;

  if (titleFilter) {
    newPostList = posts.filter((post) =>
      post.title.toLowerCase().includes(titleFilter.toLowerCase())
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
}

// * SHOW
function show(req, res) {
  const id = parseInt(req.params.id);

  /* controllo se l'id è valido */
  if (isNaN(id)) {
    return res.status(400).json({
      error: "Bad request by client",
      message: "Id required not valid",
    });
  }

  /* trovo il post tramite l'id */
  const postRequired = posts.find((post) => post.id === id);

  if (!postRequired) {
    return res.status(404).json({
      error: "Not Found",
      message: "Id required not found",
    });
  }

  /* res.send(`Show post with id ${id}`); */
  res.send(postRequired);
}

// * STORE
function store(req, res) {
  const { title, content, image, tags } = req.body;

  if (!title || !content || !image || !Array.isArray(tags) || !tags.length) {
    return res.status(400).json({
      error: "Bad request by client",
      message: "Check all parameters passed",
    });
  }

  const id = posts.at(-1).id + 1;

  const newPost = { id, title, content, image, tags };
  posts.push(newPost);

  res.json({ newPost, posts });
}

// * UPDATE
function update(req, res) {
  const id = parseInt(req.params.id);

  /* controllo se l'id è valido */
  if (isNaN(id)) {
    return res.status(400).json({
      error: "Bad request by client",
      message: "Id required not valid",
    });
  }

  const { title, content, image, tags } = req.body;

  if (!title || !content || !image || !Array.isArray(tags) || !tags.length) {
    return res.status(400).json({
      error: "Bad request by client",
      message: "Check all parameters passed",
    });
  }

  const postUpdated = posts.find((post) => post.id === id);

  postUpdated.title = title;
  postUpdated.content = content;
  postUpdated.image = image;
  postUpdated.tags = tags;

  res.json({ postUpdated, posts });
}

// * MODIFY
function modify(req, res) {
  const id = parseInt(req.params.id);

  /* controllo se l'id è valido */
  if (isNaN(id)) {
    return res.status(400).json({
      error: "Bad request by client",
      message: "Id required not valid",
    });
  }

  const { title, content, image, tags } = req.body;

  const postModified = posts.find((post) => post.id === id);

  if (title) postModified.title = title;

  if (content) postModified.content = content;

  if (image) postModified.image = image;

  if (tags) {
    if (Array.isArray(tags)) {
      postModified.tags = tags;
    } else {
      return res.status(400).json({
        error: "Bad request by client",
        message: "Id required not valid",
      });
    }
  }

  res.json({ postModified, posts });
}

// * DESTROY
function destroy(req, res) {
  const id = parseInt(req.params.id);

  /* controllo se l'id è valido */
  if (isNaN(id)) {
    return res.status(400).json({
      error: "Bad request by client",
      message: "Id required not valid",
    });
  }

  /* ricerca dell'index dell'elemento con l'id scelto da eliminare */
  const postToDelete = posts.find((post) => post.id === id);

  if (!postToDelete) {
    return res.status(404).json({
      error: "Not Found",
      message: "Id required not found",
    });
  }

  const postToDeleteIndex = posts.indexOf(postToDelete);

  if (!postToDeleteIndex && postToDeleteIndex !== 0) {
    return res.status(404).json({
      error: "Not Found",
      message: "Id required not found",
    });
  }

  /* rimozione dell'index trovato */
  const postDeleted = posts.splice(postToDeleteIndex, 1);

  /*   res.send(`Delete post with id ${id}`); */
  console.log({ postDeleted, posts });
  res.status(204).send();
}

module.exports = { index, show, store, update, modify, destroy };
