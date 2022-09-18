/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CardBody, Input, Button } from "@material-tailwind/react";
import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import useSessionStorage from "../../app/hooks/useSessionStorage";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isLoggedIn = useSessionStorage("authentication", "isLoggedIn");

  const handleRegisterFormSubmit = async (e) => {
    e.preventDefault();

    const requestUrl = "/api/auth/register";
    const data = {
      email,
      username,
      password,
    };
    try {
      await axios.post(requestUrl, data);
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    router.prefetch("/user/dashboard");

    if (isLoggedIn) {
      router.replace("/user/dashboard");
    }
  }, [router]);

  return (
    <Fragment>
      <Head>
        <title>Register Page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col items-center jusify-center">
        <form onSubmit={handleRegisterFormSubmit}>
          <Card className="mt-40 w-96">
            <div className="text-pink-400 text-center text-2xl font-bold uppercase">
              Register
            </div>
            <CardBody className="">
              <div className="my-5">
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
                  label="Username"
                  color="pink"
                  type="text"
                  autoComplete="username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                <Button color="pink" onClick={() => router.push("/auth/login")}>
                  Login Page
                </Button>
                <Button type="submit" color="pink">
                  Register
                </Button>
              </div>
            </CardBody>
          </Card>
        </form>
      </div>
    </Fragment>
  );
}
