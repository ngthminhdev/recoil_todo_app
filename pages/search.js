/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, CardBody, Input } from "@material-tailwind/react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState, useTransition } from "react";
import Link from 'next/link'
import Breadcrumb from "../app/components/Breadcrumb";


export default function ForgotPassword() {
  const router = useRouter();
  const [ isPending, startTransition ] = useTransition();

  const [searchInput, setSearchInput] = useState("");
  const [filterText, setFilterText] = useState("");

  const [data, setData] = useState([])

  useEffect(() => {
    // router.replace(`/search?q=${searchInput}`)
    searchFetching(filterText);

  },[ filterText ])

  const handleSearchChange = (e) =>{
    setSearchInput(e.target.value);

    startTransition(()=> {
      setFilterText(e.target.value)
    })
  }


  const searchFetching = async (query = '') => {
    const requestUrl = `/api/search`;

    try {
      const res = await axios({
        method: 'POST',
        url: requestUrl,
        data: { q: query }
      });
      const data = await res.data;
      setData(data.product)
      console.log(res.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Search Input</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col items-center jusify-center">
        <div className="mt-20">
          <Breadcrumb site={[
            {
              title: "Trang Chủ",
              href: "/"
            },
            {
              title: "Search",
              href: "/search"
            }
          ]} />
        </div>
          <Card className="mt-40 w-96">
            <div className="text-pink-400 text-center text-2xl font-bold uppercase">
              Search Input
            </div>
            <div className="flex justify-center items-center mt-5">
              <Link href='/auth/login'>
                <a>Quay lại trang đăng nhập</a>
              </Link>
            </div>
            <CardBody className="">
              <div className="my-5">
                <Input
                  label="Search"
                  color="pink"
                  type="search"
                  autoComplete="search"
                  variant="outlined"
                  value={searchInput}
                  onChange={handleSearchChange}
                />
              </div>
            </CardBody>
            {isPending ? <p className="my-3 mx-3">Loading...</p> : data?.map((product) => <p key={product._id} className="my-3 mx-3">{product.name}</p>)}
          </Card>
      </div>
    </Fragment>
  );
}
