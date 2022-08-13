import { Button, Card, CardBody } from "@material-tailwind/react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSessionStorage from "../../../app/hooks/useSessionStorage";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useUser, useProduct, useFeedback } from "../../../app/hooks";

const All = ({data}) => {
  const router = useRouter();
  const { id } = router.query;

  const [previewImage, setPreviewImage] = useState(data.images[0].src);
  const [replies, setReplies] = useState(null);
  const [active, setActive] = useState(false);
  const [cmt, setCmt] = useState("");

  const user = useSessionStorage("authentication", "user");

  // const { data, isLoading, isError } = useProduct(id);
  const { feedback } = useFeedback(id);
  const { userInfo } = useUser(user?._id);

  // console.log(data);

  async function fetchReplies(targetId) {
    try {
      const res = await axios({
        method: "GET",
        url: `/api/comment/${targetId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setReplies(res.data.comments);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleComment = async (targetId) => {
    const res = await axios({
      method: "POST",
      url: "/api/comment",
      data: { userId: user._id, content: cmt, rate: 4, targetId: targetId },
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
  };

  const handleDeleteNotification = async (targetId) => {
    const res = await axios({
      method: "POST",
      url: `/api/user/${user._id}`,
      data: { notifyId: targetId },
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
  };

  const handleShowNotifications = () => {
    setActive(!active);
  };

  useEffect(() => {
    if (!router.isReady) return;
    // data && setPreviewImage(data?.images[0].src);
  }, [ router.isReady]);

  // if (isLoading) return <Fragment> Loading </Fragment>;
  // if (isError) return <Fragment> Có lỗi </Fragment>;

  return (
    <Fragment>
      <Head>
        <title>{data.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="mt-10 w-screen flex flex-col justify-center items-center">
        <div
          className="absolute top-8 right-8"
          onClick={handleShowNotifications}
        >
          <div className="relative text-5xl cursor-pointer">
            <IoIosNotificationsOutline />
          </div>
          {userInfo?.success && userInfo?.user?.notifications.length > 0 && (
            <div className="absolute top-[-5px] right-0 px-2 py-1 text-white bg-red-500 rounded-full">
              {userInfo?.user?.notifications.length}
            </div>
          )}
          <div className="absolute right-8">
            {userInfo?.success &&
              active &&
              userInfo?.user?.notifications.map((noti) => {
                return (
                  <div
                    key={noti._id}
                    className="relative p-2 my-4 border-2 z-10 pr-8"
                  >
                    {noti.content}
                    <div
                      className="absolute cursor-pointer top-0 right-0 px-2 py-1 text-white bg-red-500"
                      onClick={() => {
                        handleDeleteNotification(noti._id);
                      }}
                    >
                      X
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="font-bold text-pink-400 text-3xl">
          {data?.name}
        </div>
        <div className="flex flex-row flex-wrap justify-center items-center">
          <div className="flex flex-col">
            {data?.images?.length > 1 &&
              data?.images.map((element) => {
                return (
                  <Card
                    key={element.id}
                    className="my-2"
                    onMouseEnter={() => {
                      setPreviewImage(element.src);
                    }}
                  >
                    <CardBody>
                      <Image
                        className="block"
                        src={element.src}
                        alt="sub image"
                        width={100}
                        height={100}
                      />
                    </CardBody>
                  </Card>
                );
              })}
          </div>
          <Card className="m-6 card w-[500px]">
            <CardBody className="text-center">
              <div className="mb-4 font-bold">{data?.name}</div>
              {previewImage && (
                <Image
                  className="block"
                  src={previewImage}
                  alt="preview Image"
                  width={250}
                  height={250}
                />
              )}
              {data?.rating?.rate ? (
                <div>
                  <div className="my-4 font-bold text-yellow-800">
                    {data?.rating.rate}⭐
                  </div>
                  <div className="my-4 font-bold text-yellow-800">
                    {data?.rating.count} đánh giá
                  </div>
                </div>
              ) : (
                <div className="my-4 font-bold text-yellow-800">
                  Chưa có đánh giá!
                </div>
              )}
              <div className="my-4 text-xl font-bold text-left">
                <span className="text-red-500">
                  Giá:{" "}
                  {data?.storage &&
                    new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "VND",
                    }).format(data?.storage[0].price)}
                </span>
              </div>
              <div className="my-4 text-justify">
                <p>{data?.description}</p>
              </div>
              <div className="my-4">
                <label className="mr-3" htmlFor="feedback">
                  Leave a Comment
                </label>
                <input
                  id="feedback"
                  placeholder="Comment"
                  value={cmt}
                  onChange={(e) => {
                    setCmt(e.target.value);
                  }}
                />
              </div>
              <Button
                color="pink"
                className="mt-4"
                onClick={() => {
                  handleComment(data?._id);
                }}
              >
                Comment
              </Button>
            </CardBody>
            {feedback?.success &&
              feedback?.comments?.map((comment) => {
                return (
                  <div key={comment._id} className="px-6 py-4">
                    <Image
                      className="block rounded-full"
                      src={comment.userId.image}
                      alt={comment.userId.username}
                      width={50}
                      height={50}
                    />
                    <span className="my-3 font-bold">
                      {comment.userId.username}:{" "}
                    </span>
                    <span className="my-3 mr-3">{comment.content}</span>

                    {comment.isReplied && (
                      <span
                        className="block my-3 mr-3 cursor-pointer font-bold text-pink-300"
                        onClick={() => {
                          fetchReplies(comment._id);
                        }}
                      >
                        Xem replies
                      </span>
                    )}

                    {replies &&
                      replies.map((reply) => {
                        if (reply.targetId !== comment._id) return;
                        return (
                          <div key={reply._id} className="px-6 py-4">
                            <Image
                              className="block rounded-full"
                              src={reply.userId.image}
                              alt={reply.userId.username}
                              width={50}
                              height={50}
                            />
                            <span className="my-3 font-bold">
                              {reply.userId.username}:{" "}
                            </span>
                            <span className="my-3 mr-3">{reply.content}</span>
                          </div>
                        );
                      })}

                    <div className="my-4">
                      <label className="mr-3" htmlFor="feedback">
                        Reply to {comment.userId.username}
                      </label>
                      <input
                        id="feedback"
                        placeholder="Reply"
                        value={cmt}
                        onChange={(e) => {
                          setCmt(e.target.value);
                        }}
                      />
                    </div>
                    <Button
                      color="pink"
                      className="mt-4"
                      onClick={() => {
                        handleComment(comment._id);
                      }}
                    >
                      Reply
                    </Button>
                  </div>
                );
              })}
          </Card>
        </div>
      </div>
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const res = await axios.get("http://localhost:3000/api/product/all");
  const products = await res.data.products;
  const paths = products.map((product) => {
    return {
      params: { id: product._id, slug: product.slug },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await axios.get(`http://localhost:3000/api/product/${id}`);
  return {
    props: {
      data: res.data.product,
    },
    revalidate: 30,
  };
};

export default All;
