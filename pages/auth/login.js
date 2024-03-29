/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, CardBody, Input } from "@material-tailwind/react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Link from 'next/link'

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterFormSubmit = async (e) => {
    e.preventDefault();

    const requestUrl = "/api/auth/login";
    const data = {
      email,
      password,
    };
    try {
      const res = await axios.post(requestUrl, data);
      console.log(res);
      sessionStorage.setItem(
        "authentication",
        JSON.stringify({
          accessToken: res.data.accessToken,
          isLoggedIn: true,
          user: res.data.user,
        })
      );
      router.replace("/user/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Login Page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col items-center jusify-center">
        <form onSubmit={handleRegisterFormSubmit}>
          <Card className="mt-40 w-[500px]">
            <div className="text-pink-400 text-center text-2xl font-bold uppercase">
              Login
            </div>
            <div className="flex justify-center items-center mt-5">
              <Link href='/auth/forgot-password'>
                <a>Quên mật khẩu?</a>
              </Link>
            </div>
            <CardBody className="">
              <div className="mb-5">
                <Input
                  label="Email"
                  color="pink"
                  type="text"
                  autoComplete="email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="my-5">
                <Input
                  label="Password"
                  color="pink"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-around">
                <Button
                  color="pink"
                  onClick={() => router.push("/auth/register")}
                >
                  Register Page
                </Button>
                <Button type="submit" color="pink">
                  Login
                </Button>
                <Button color="pink"
                  // onClick={() => router.push("api/auth/google")}
                >
                  <Link href="/api/auth/google">
                    <a>Gooogle Login</a>
                  </Link>
                </Button>
              </div>
            </CardBody>
          </Card>
        </form>
      </div>
    </Fragment>
  );
}
