const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// Reply gets nested right inside the CommentSchema
const ReplySchema = new Schema(
  // Fields
  {
    // set custom id to avoid confusion with parent comment's _id field
    replyId: {
      type: Schema.Types.ObjectId,
      // Generated automatically?
      default: () => new Types.ObjectId(),
    },
    replyBody: {
      type: String,
    },
    writtenBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      // Generated automatically?
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  // Options
  {
    // Allow the use of getters
    toJSON: {
      getters: true,
    },
  }
);

const CommentSchema = new Schema(
  // Define Fields
  {
    writtenBy: {
      type: String,
    },
    commentBody: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    // Associate replies with the comments
    replies: [ReplySchema],
  },
  // Options
  {
    // Allow the use of getters, virtuals
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

CommentSchema.virtual("replyCount").get(function () {
  return this.replies.length;
});

const Comment = model("Comment", CommentSchema);

module.exports = Comment;
