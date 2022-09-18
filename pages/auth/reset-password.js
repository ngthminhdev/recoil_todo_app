/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, CardBody, Input } from "@material-tailwind/react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Link from 'next/link'

import useSessionStorage from "../../app/hooks/useSessionStorage";

export default function resetPassword() {
  const router = useRouter();
  const { token } = router.query;

  const [password, setPassword] = useState("");

  const isLoggedIn = useSessionStorage("authentication", "isLoggedIn");

  useEffect(() => {
    router.prefetch("/user/dashboard");

    if (isLoggedIn) {
      router.replace("/user/dashboard");
    }
  }, [router]);

  const handleRegisterFormSubmit = async (e) => {
    e.preventDefault();

    const requestUrl = `/api/auth/reset-password?token=${token}`;
    const data = {
      password,
    };
    try {
      const res = await axios.post(requestUrl, data);
      console.log(res.data);
      
      // router.replace("/user/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Rest Password Page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col items-center jusify-center">
        <form onSubmit={handleRegisterFormSubmit}>
          <Card className="mt-40 w-96">
            <div className="text-pink-400 text-center text-2xl font-bold uppercase">
              Đặt Lại Mật Khẩu Mới
            </div>
            <CardBody className="">
              <div className="my-5">
                <Input
                  label="Password"
                  color="pink"
                  type="password"
                  autoComplete="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-around">
                <Button type="submit" color="pink">
                  Submit
                </Button>
              </div>
            </CardBody>
          </Card>
        </form>
      </div>
    </Fragment>
  );
}
