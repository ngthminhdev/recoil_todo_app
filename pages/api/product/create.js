import withAuth from "../../../app/middleware/withAuth";
import withRoles from "../../../app/middleware/withRoles";
import connectDB from "../../../database";
import Product from "../../../models/Product";
import { cloudinary } from "../../../config/cloudinary";
const mongoose = require("mongoose");

connectDB();

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Set desired value here
    },
  },
};

const uploadHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      const _id = new mongoose.Types.ObjectId();
      const options = {
        upload_preset: "test-uploads",
        overwrite: true,
        public_id: _id,
      };

      try {
        const { name, image, subImage, description, category, storage } =
          req.body;
        const imageArray = [];

        if (subImage.length > 0) {
          for (const element of subImage) {
            const _id = new mongoose.Types.ObjectId();
            const options = {
              upload_preset: "test-uploads",
              overwrite: true,
              public_id: _id,
            };
            const result = await cloudinary.uploader.upload(element, options);
            console.log(result);
            imageArray.push({ id: _id.toString(), src: result.secure_url });
          }
        }

        const result = await cloudinary.uploader.upload(image, options);
        imageArray.unshift({ id: _id.toString(), src: result.secure_url });

        // const subImageUpload = subImage.length ? (await Promise.all(subImage.map((element) => {
        //   const _id = new mongoose.Types.ObjectId();
        //   const options = {
        //     upload_preset: "test-uploads",
        //     overwrite: true,
        //     public_id: _id,
        //   };
        //   return cloudinary.uploader.upload(element, options)
        // }))).map(response => ({id: _id, src: response.secure_url})) : [];
        // const newProduct = await Product.create({
        //   _id,
        //   name,
        //   image: [{id: _id, src: result.secure_url}, ...subImageUpload ],
        //   price,
        //   description,
        //   category,
        // });
        // const product = await newProduct.save();

        const newProduct = await Product.create({
          _id,
          name,
          images: imageArray,
          description,
          category,
          storage,
        });

        console.log(newProduct);

        return res.status(201).json({
          success: true,
          message: "Product successfully Created",
          product: newProduct,
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Faild to create product",
        });
      }
      break;
    default:
      return res.status(500).json("Faild to connect to server");
  }
};

export default withAuth(withRoles(uploadHandler, "admin"));
