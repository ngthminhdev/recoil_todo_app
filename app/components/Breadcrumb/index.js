import React from "react";
import Link from "next/link";

const Breadcrumb = ({ site }) => {
  return (
    <div className="flex">
      {site.map((item, i) => (
        <div key={i}>
          <Link href={item.href}>
            <a>{item.title}</a>
          </Link>
          <span className="p-2">/</span>
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
