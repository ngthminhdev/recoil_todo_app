import { cloudinary } from "../../config/cloudinary";
var mongoose = require("mongoose");

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Set desired value here
    },
  },
};

const imageHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      const { image } = req.body;
      const _id = new mongoose.Types.ObjectId();

      const options = {
        upload_preset: "test-uploads",
        overwrite: true,
        public_id: _id,
      };

      try {
        // Upload the image
        const result = await cloudinary.uploader.upload(image, options);
        // console.log(result);
        return res.status(200).json(result);
      } catch (error) {
        console.error(error);
      }
      break;
    default:
      return res.status(500).json("Faild to connect to server");
  }
};

export default imageHandler;
