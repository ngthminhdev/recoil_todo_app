import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSessionStorage, useProduct } from "../../../app/hooks";

const Create = () => {
  const router = useRouter();
  const { id } = router.query;

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
    discount: 0,
    category: "",
    image: "",
    subImage: [],
    storage: [],
  });

  const { data: productData, isLoading, isError } = useProduct(id);

//   console.log(productData);  

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
    console.log(data);
    const res = await axios({
      method: "PATCH",
      url: `/api/product/edit/${id}`,
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
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (productData?.success) {
      setPreviewImage(productData.product.images[0].src);
      setData({
        ...data,
        name: productData.product.name,
        description: productData.product.description,
        category: productData.product.category,
        discount: productData.product.discount,
      });
      setQuantities(productData.product.storage);
      //   setFileInputState(productData.product.images[0].src)
    }
  }, [isLoading]);

  if (isLoading) return <Fragment> Loading </Fragment>;
  if (isError) return <Fragment> Có lỗi </Fragment>;

  if (productData.success)
    return (
      <Fragment>
        <Head>
          <title>Upload Product</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
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
                  // required
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

                <Button
                  className="bg-green-500"
                  onClick={handleQuantitiesChange}
                >
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
                  value={data.name}
                  required
                />
              </div>
              <div className="mb-6 w-96">
                <Input
                  name="discount"
                  type="number"
                  label="Discount"
                  onChange={(e) => {
                    setData({ ...data, discount: e.target.value });
                  }}
                  value={data.discount}
                  required
                />
              </div>
              <div className="mb-6 w-96">
                <Textarea
                  label="Description"
                  onChange={(e) => {
                    setData({ ...data, description: e.target.value });
                  }}
                  value={data.description}
                  required
                />
              </div>
              <div className="mb-6 w-96">
                <Select
                  label="Category"
                  onChange={(value) => {
                    setData({ ...data, category: value });
                  }}
                  value={data.category}
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
