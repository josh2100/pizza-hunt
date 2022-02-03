const router = require("express").Router();
const {
  addComment,
  removeComment,
  addReply,
  removeReply,
} = require("../../controllers/comment-controller");

// Add a Comment /api/comments/<pizzaId>
// Expects { "writtenBy": "string", "commentBody": "string" }
router.route("/:pizzaId").post(addComment);

// Add Reply, delete a comment /api/comments/<pizzaId>/<commentId>
// Add Reply expects {"replyBody": "Lordy!", "writtenBy": "Sid the Kid" }
router.route("/:pizzaId/:commentId").put(addReply).delete(removeComment);

// Delete a reply /api/comments/<pizzaId>/<commentId>/<replyId>
router.route("/:pizzaId/:commentId/:replyId").delete(removeReply);

module.exports = router;
