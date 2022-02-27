import { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      require: [true, "The post title is required"],
      unique: true,
      trim: true,
      maxlength: [40, "title cannot be greater than 40 characters"],
    },
    content: {
      type: String,
      require: [true, "The post content is required"],
      trim: true,
      maxlength: [200, "content cannot be greater than 200 characters"],
    },
    published_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Post || model("Post", PostSchema);
