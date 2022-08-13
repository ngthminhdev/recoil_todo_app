import { Button, Input } from "@material-tailwind/react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

const Upload = () => {
  const [previewImage, setPreviewImage] = useState();
  const [fileInputState, setFileInputState] = useState();

  const handleChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    previewerFile(file);
  };

  const previewerFile = (file) => {
    const reader = new FileReader();
    // const imageURL = URL.createObjectURL(e.target.files[0]);

    reader.readAsDataURL(file);  

    console.log(reader)


    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!previewImage) return;
    uploadImage(previewImage);
  };

  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage);
    const res = await axios({
      method: "POST",
      url: "/api/image",
      data: { image: base64EncodedImage },
      headers: { "Content-Type": "application/json" },
    });

    console.log(res);
  };

  return (
    <div className="mt-10 flex flex-col items-center jusify-center">
      <Head>
        <title>Image Upload</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <span className="text-pink-400 text-xl font-bold">Image Upload</span>
      </div>
      <div className="mt-6">
        <form
          className="flex flex-col items-center jusify-center"
          method="POST"
          name="imageUploadForm"
          onSubmit={handleSubmit}
        >
          <Input
            name="file"
            type="file"
            placeholder="Upload Image"
            onChange={handleChange}
            value={fileInputState}
          />
          <Button className="mt-6" type="submit">
            Upload
          </Button>
        </form>
      </div>
      <div className="mt-6">
        {previewImage && (
          <Image src={previewImage} alt="image" width={200} height={200} />
        )}
        {/* <picture>
            <source src={imageSrc} type="image/jpeg"/>
            <img src={imageSrc} alt='image'/>
        </picture> */}
      </div>
    </div>
  );
};

export default Upload;
