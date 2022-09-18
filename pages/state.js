import { Button, Card, CardBody, Input } from "@material-tailwind/react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState, useTransition } from "react";
import Link from "next/link";
import Breadcrumb from "../app/components/Breadcrumb";

const State = () => {
  const [click, setClick] = useState(0)
  const [data, setData] = useState([
    { id: 1, name: "Minh", age: 20 },
    { id: 2, name: "Duc", age: 19 },
    { id: 3, name: "Tuan", age: 19 },
  ]);

  useEffect(() => {

    const dataInstance = data.map(item => {
        if (item.id === 2) {
            return {...item, name: 'Changed Name'}
        }
        return item
    })

    setData(dataInstance)

    console.log(data);
    
}, [click]);

  return (
    <Fragment>
      <Head>
        <title>Search Input</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col items-center jusify-center">
        <div className="mt-20">
          <Breadcrumb
            site={[
              {
                title: "Trang Chủ",
                href: "/",
              },
              {
                title: "State",
                href: "/state",
              },
            ]}
          />
          <Button onClick={()=> {setClick(click => click + 1)}}>Click</Button>
        </div>
      </div>
    </Fragment>
  );
};

export default State;
