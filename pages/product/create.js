import {
  Button,
  Input,
  Option,
  Select,
  Textarea
} from "@material-tailwind/react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { Fragment, useState } from "react";
import useSessionStorage from "../../app/hooks/useSessionStorage";

const Create = () => {
  const accessToken = useSessionStorage("authentication", "accessToken");

  const [previewImage, setPreviewImage] = useState();
  const [fileInputState, setFileInputState] = useState();
  const [fileSubInputState, setfileSubInputState] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [size, setSize] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "",
    image: "",
    subImage: [],
    storage: [],
  });

  const previewerFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    previewerFile(file);
  };

  const handleSubChange = (e) => {
    [...e.target.files].forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      console.log("file >>> ", file);
      reader.onload = () => {
        setfileSubInputState((imgs) => [...imgs, reader.result]);
      };
    });

    // setfileSubInputState(imageArray)
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleQuantitiesChange = () => {
    setQuantities((prev) => [...prev, { size, quantity, price }]);
    setSize("");
    setPrice(0);
    setQuantity("");
  };

  const handleDeleteQuantities = (size) => {
    const qArray = quantities.filter((q) => q.size !== size);
    setQuantities(qArray);
  };

  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage);
    const res = await axios({
      method: "POST",
      url: "/api/product/create",
      data: {
        ...data,
        image: base64EncodedImage,
        subImage: fileSubInputState,
        storage: quantities,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });

    console.log(res);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!previewImage) return;
    uploadImage(previewImage);

    // const dataInstance = {
    //   ...data,
    //   image: 'main base64EncodedImage here',
    //   subImage: '[sub base64EncodedImage here]',
    //   storage: quantities,
    // };
    // console.log(dataInstance);
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
                name="file"
                type="file"
                label="Sub Image"
                multiple={true}
                onChange={handleSubChange}
                // value={fileSubInputState}
              />
            </div>
            <div className="mb-6 w-96">
              {quantities.length > 0 &&
                quantities.map((quantity, i) => {
                  return (
                    <div key={i} id={i} className="flex mb-6 w-96">
                      <Input
                        name="size"
                        type="text"
                        label="Size"
                        className="mr-3"
                        value={`Size: ${quantity.size}`}
                        disabled={true}
                      />

                      <Input
                        name="quantity"
                        type="text"
                        label="Quantity"
                        value={`Số Lượng: ${quantity.quantity}`}
                        disabled={true}
                      />

                      <Input
                        name="price"
                        type="text"
                        label="price"
                        value={`Giá: ${new Intl.NumberFormat("de-DE", {
                          style: "currency",
                          currency: "VND",
                        }).format(quantity.price)}`}
                        disabled={true}
                      />
                      <Button
                        className="bg-green-500"
                        onClick={() => {
                          handleDeleteQuantities(quantity.size);
                        }}
                      >
                        X
                      </Button>
                    </div>
                  );
                })}
            </div>
            <div className="flex mb-6 w-96">
              <Input
                name="size"
                type="text"
                label="Size"
                onChange={handleSizeChange}
                className="mr-3"
                value={size}
              />

              <Input
                name="quantity"
                type="text"
                label="Quantity"
                onChange={handleQuantityChange}
                value={quantity}
              />
              <Input
                name="price"
                type="text"
                label="Price"
                onChange={handlePriceChange}
                value={price}
              />

              <Button className="bg-green-500" onClick={handleQuantitiesChange}>
                +
              </Button>
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
                <Option value="nhan">Nhẫn</Option>
                <Option value="vong">Vòng</Option>
                <Option value="lac">Lắc</Option>
                <Option value="day-chuyen 4">Dây chuyền</Option>
                <Option value="bong-tai">Bông tai</Option>
              </Select>
            </div>
            <Button className="mt-6 bg-pink-300" type="submit">
              Upload
            </Button>
          </form>
        </div>
        {previewImage && (
          <div className="absolute bottom-[50px] right-[100px]">
            <Image
              id="previewImage"
              src={previewImage}
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

export default Create;
