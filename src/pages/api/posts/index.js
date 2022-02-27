import Post from "../../../model/Post";
import { dbConnect, runMiddleware } from "../../../utils/index";
import Morgan from "morgan";

dbConnect();

export default async (req, res) => {
  const { method, body } = req;
  const morgan = Morgan("dev");

  switch (method) {
    case "GET":
      try {
        const posts = await Post.find();
        await runMiddleware(req, res, morgan);
        return res.status(200).json(posts);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "POST":
      try {
        const newPost = new Post(body);
        const savedPost = await newPost.save();
        await runMiddleware(req, res, morgan);
        return res.status(200).json(savedPost);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
};
