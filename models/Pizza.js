const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      // Validation
      // required: true,
      required: "Please provide a pizza name!",
      trim: true,
    },
    createdBy: {
      type: String,
      // Validation
      required: "Please provide a user name!",
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    size: {
      type: String,
      required: "true",
      // enum: ["Personal", "Small", "Medium", "Large", "Extra Large"],
      enum: {
        values: ["Personal", "Small", "Medium", "Large", "Extra Large"],
        message: "{VALUE} is not a supported size option",
      },
      default: "Large",
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  // Schema options
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // False tells mongoose not to return the id
    id: false,
  }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.reduce(
    (total, comment) => total + comment.replies.length + 1,
    0
  );
});

// create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

// Export the Pizza model
module.exports = Pizza;
