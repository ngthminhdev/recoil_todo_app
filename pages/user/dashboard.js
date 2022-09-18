/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, CardBody } from "@material-tailwind/react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

import { useSessionStorage } from "../../app/hooks";
import axiosJWT from "../../config/axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const isLoggedIn = useSessionStorage("authentication", "isLoggedIn");
  const accessToken = useSessionStorage("authentication", "accessToken");
  const authentication = useSessionStorage("authentication");
  const user = useSessionStorage("authentication", "user");

  const router = useRouter();

  useEffect(() => {
      fetchData();
      setUsername(user?.username);

    async function fetchData() {
      try {
        const requestUrl = "http://localhost:3000/api/user/all";
        const headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        };
        const res = await axios.get(requestUrl, { headers });
        setUsers(res.data.users);
      } catch (error) {
        console.log(error.response);
      }
    }
  }, [router]);

  const handleDeleteUser = async (id) => {
    try {
      const requestUrl = "http://localhost:3000/api/user/delete";
      const data = {
        id,
      };
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      };
      const res = await axiosJWT.post(
        requestUrl,
        data,
        { headers },
        { withCredentials: true }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefreshToken = async () => {
    try {
      const requestUrl = "http://localhost:3000/api/auth/refreshToken";
      // const data = {
      //   id,
      // };
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      };
      const res = await axios.post(
        requestUrl,
        { headers },
        { withCredentials: true }
      );
      // console.log(res);
      sessionStorage.removeItem("authentication");
      sessionStorage.setItem(
        "authentication",
        JSON.stringify({
          ...authentication,
          accessToken: res.data.accessToken,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      const requestUrl = "http://localhost:3000/api/auth/logout";
      const data = {
        id: user._id,
      };
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      };
      const res = await axios.post(
        requestUrl,
        data,
        { headers },
        { withCredentials: true }
      );

      console.log(res);
      sessionStorage.clear();
      router.push("/auth/login");
    } catch (error) {
      console.log("err:" + error, "message: loi o dashboard");
    }
  };

  return (
    <Fragment>
      <Head>
        <title>User Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="mt-10 flex flex-col justify-center items-center">
        <div className="font-bold text-pink-400 text-3xl">
          Chào mừng : {username}
        </div>
        <div className="flex flex-row flex-wrap">
          {users?.map((user) => {
            return (
              <Card key={user._id} className="m-6">
                <CardBody>
                  <span className="mr-5">username: {user.username}</span>
                  <Button
                    color="pink"
                    onClick={() => {
                      handleDeleteUser(user._id);
                    }}
                  >
                    Delete
                  </Button>
                </CardBody>
              </Card>
            );
          })}
        </div>
        <Button color="pink" onClick={handleLogout}>
          Logout
        </Button>
        <Button
          className="mt-6"
          color="pink"
          onClick={() => router.push("/product/all")}
        >
          Product
        </Button>
        <Button className="mt-6" color="pink" onClick={handleRefreshToken}>
          RefreshTokens
        </Button>
      </div>
    </Fragment>
  );
};

export default Dashboard;
