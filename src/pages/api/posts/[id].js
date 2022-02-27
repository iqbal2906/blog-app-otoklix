import Post from "../../model/Post";
import { dbConnect, runMiddleware } from "../../../utils/index";
import Morgan from "morgan";

dbConnect();

export default async (req, res) => {
  const {
    method,
    body,
    query: { id },
  } = req;
  const morgan = Morgan("dev");

  switch (method) {
    case "GET":
      try {
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ msg: "Post doesn't exists" });
        await runMiddleware(req, res, morgan);
        return res.status(200).json(post);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "DELETE":
      try {
        const deletePost = await Post.findByIdAndDelete(id);
        if (!deletePost)
          return res.status(404).json({ msg: "Post doesn't exists" });
        await runMiddleware(req, res, morgan);
        return res.status(200).json({ msg: "Post deleted succesfully" });
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updatedPost = await Post.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        });

        if (!updatedPost)
          return res.status(404).json({ msg: "Post doesn't exists" });
        return res.status(200).json(updatedPost);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
  }
};
