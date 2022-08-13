import withAuth from "../../../../app/middleware/withAuth";
import withRoles from "../../../../app/middleware/withRoles";
import { cloudinary } from "../../../../config/cloudinary";
import connectDB from "../../../../database";
import Product from "../../../../models/Product";
const mongoose = require("mongoose");

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Set desired value here
    },
  },
};

const uploadHandler = async (req, res) => {
  const { method } = req;
  const { id } = req.query;
  await connectDB();

  switch (method) {
    case "PATCH":
      const {
        name,
        image,
        subImage,
        description,
        discount,
        category,
        storage,
      } = req.body;
      const currentProduct = await Product.findById(id);
      console.log(currentProduct);

      try {
        if (!image && subImage.length < 1) {
          const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
              name,
              description,
              category,
              discount,
              storage,
            },
            { new: true }
          );

          return res.status(201).json({
            success: true,
            message: "Product updated",
            product: updatedProduct,
          });
        }
        const imageArray = currentProduct.images;

        if (image) {
          const options = {
            upload_preset: "test-uploads",
            overwrite: true,
            public_id: id,
          };
          const result = await cloudinary.uploader.upload(image, options);
          imageArray.shift();
          imageArray.unshift({ id: id, src: result.secure_url });
        }

        if (subImage.length > 0) {
          if (imageArray.length - 1 > subImage.length) {
            imageArray.splice(1, imageArray.length - 1);
          }
          for (const element of subImage) {
            const _id = new mongoose.Types.ObjectId();
            console.log(imageArray);

            const options = {
              upload_preset: "test-uploads",
              overwrite: true,
              public_id:
                imageArray[subImage.indexOf(element) + 1]?.id || _id.toString(),
            };
            const result = await cloudinary.uploader.upload(element, options);
            imageArray.splice(subImage.indexOf(element) + 1, 1, {
              id:
                imageArray[subImage.indexOf(element) + 1]?.id || _id.toString(),
              src: result.secure_url,
            });
          }
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, {
          name,
          images: imageArray,
          description,
          discount,
          category,
          storage,
        }, { new: true });

        console.log(updatedProduct);

        return res.status(201).json({
          success: true,
          message: "Product successfully Created",
          product: updatedProduct,
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
