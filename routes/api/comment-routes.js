const router = require('express').Router();
const { addComment, removeComment } = require('../../controllers/comment-controller');

// /api/comments/<pizzaId> Add a Comment
router.route('/:pizzaId').post(addComment);

// /api/comments/<pizzaId>/<commentId> Remove a comment
router.route('/:pizzaId/:commentId').delete(removeComment);

module.exports = router;