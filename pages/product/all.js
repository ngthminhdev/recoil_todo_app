import { Button, Card, CardBody } from "@material-tailwind/react";
import Head from "next/head";
import Image from "next/image";
import { push } from "next/router";
import { Fragment } from "react";
import Breadcrumb from "../../app/components/Breadcrumb";

import { useProduct } from "../../app/hooks";

const All = () => {
  const { data, isLoading, isError } = useProduct("all");

  if (isLoading) return <Fragment> Loading</Fragment>;
  if (isError) return <Fragment> Có lỗi </Fragment>;

  return (
    <Fragment>
      <Head>
        <title>Product Site</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="mt-10 w-screen flex flex-col justify-center items-center">
      <div className="mt-10">
          <Breadcrumb site={[
            {
              title: "Trang Chủ",
              href: "/"
            },
            {
              title: "Product",
              href: "/product/all"
            }
          ]} />
        </div>
        <div className="font-bold text-pink-400 text-3xl">Product Site</div>
        <div className="flex flex-row flex-wrap justify-center items-center">
          {data?.products?.map((product) => {
            return (
              <Card key={product._id} id="id" className="m-6 card">
                <CardBody className="flex flex-col text-center">
                  <div className="my-4 font-bold overflow-hidden w-[250px]">
                    {product.name}
                  </div>
                  <Image
                    className="block"
                    src={product.images[0].src}
                    alt={product.name}
                    width={250}
                    height={250}
                    layout="fixed"
                  />
                  {product.rating ? (
                    <div className="my-4 font-bold text-yellow-800">
                      {product.rating.rate}⭐
                    </div>
                  ) : (
                    <div className="my-4 font-bold text-yellow-800">
                      Chưa có đánh giá!
                    </div>
                  )}
                  <Button
                    color="pink"
                    className="mt-4"
                    onClick={() => {
                      push(`/product/${product.slug}/${product._id}`);
                    }}
                  >
                    Details
                  </Button>
                  <Button
                    color="pink"
                    className="mt-4"
                    onClick={() => {
                      push(`/product/edit/${product._id}`);
                    }}
                  >
                    Edit
                  </Button>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default All;
