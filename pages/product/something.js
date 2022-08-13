import {
  Button, Input, Option, Select, Textarea
} from "@material-tailwind/react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { Fragment, useState } from "react";
import useSessionStorage from "../../app/hooks/useSessionStorage";

const Upload = () => {
  const accessToken = useSessionStorage("authentication", "accessToken");

  const [image, setImage] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [data, setData] = useState({
    name: "",
    price: null,
    description: "",
    category: "",
    image: "",
  });
  
  const handleChange = (e) => {
    const imageURL = URL.createObjectURL(e.target.files[0]);
    setImageSrc(imageURL);
    setImage(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("upload_preset", "test-uploads");
    formData.append("file", image);

    const requestUrl = "http://api.cloudinary.com/v1_1/manga-dev/image/upload";
    const headers = { "Content-Type": "multipart/form-data" };
    const dataImage = formData;

    const requestUrl2 = "/api/product";
    const headers2 = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };

    const res = await axios({
      method: "POST",
      url: "http://api.cloudinary.com/v1_1/manga-dev/image/upload",
      data: dataImage,
      headers: headers,
    });

    const secure_url = await res.data.secure_url;
    const res2 = await axios({
      method: "POST",
      url: "/api/product",
      data: { ...data, image: secure_url },
      headers: headers2,
    });
    console.log(res);
    console.log(res2);
  };

  return (
    <Fragment>
      <Head>
        <title>Upload Product</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex items-center w-full justify-center">
        <div className="mt-6 flex flex-col items-center justify-center">
          <div>
            <span className="text-pink-400 text-xl font-bold">
              Image Upload
            </span>
          </div>
          <form
            className="flex flex-col items-center justify-center"
            method="POST"
            name="imageUploadForm"
            onSubmit={handleSubmit}
          >
            <div className="mb-6 w-96">
              <Input
                name="file"
                type="file"
                label="Image"
                onChange={handleChange}
                value={fileInputState}
                required
              />
            </div>
            <div className="mb-6 w-96">
              <Input
                name="name"
                type="text"
                label="Name"
                onChange={(e) => {
                  setData({ ...data, name: e.target.value });
                }}
                required
              />
            </div>
            <div className="mb-6 w-96">
              <Input
                name="price"
                type="text"
                label="Price"
                onChange={(e) => {
                  setData({ ...data, price: e.target.value });
                }}
                required
              />
            </div>
            <div className="mb-6 w-96">
              <Textarea
                label="Description"
                onChange={(e) => {
                  setData({ ...data, description: e.target.value });
                }}
                required
              />
            </div>
            <div className="mb-6 w-96">
              <Select
                label="Category"
                onChange={(value) => {
                  setData({ ...data, category: value });
                }}
              >
                <Option value="Category 1">Category 1</Option>
                <Option value="Category 2">Category 2</Option>
                <Option value="Category 3">Category 3</Option>
                <Option value="Category 4">Category 4</Option>
                <Option value="Category 5">Category 5</Option>
              </Select>
            </div>
            <Button className="mt-6 bg-pink-300" type="submit">
              Upload
            </Button>
          </form>
        </div>
        {imageSrc && (
          <div className="mx-6">
            <Image
              id="imageSrc"
              src={imageSrc}
              alt="image"
              width={200}
              height={200}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Upload;
