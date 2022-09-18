import connectDB from "../../../database";
import { cloudinary } from "../../../config/cloudinary";
const mongoose = require("mongoose");

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "20mb", // Set desired value here
    },
  },
};

const uploadHandler = async (req, res) => {
  await connectDB();
  const { method } = req;
  const { name, video } = req.body;

  switch (method) {
    case "POST":
      try {
        const _id = new mongoose.Types.ObjectId();

        if (video.src) {
          const path = video.src;
          const options = {
            upload_preset: "test-uploads",
            resource_type: video.type,
            overwrite: true,
            public_id: _id,
          };
          await cloudinary.uploader.upload(path, options, (err, response) => {
            console.log(err, response);
          });
        }

        return res.status(201).json({
          success: true,
          message: "Product successfully Created",
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Faild to post video",
        });
      }
      break;
    default:
      return res.status(500).json("Faild to connect to server");
  }
};

export default uploadHandler;
