import { NextResponse } from "next/server";

const middleware = async (req) => {
  const { cookies } = req;
  const token = cookies.refreshToken;

  if (token)
    return NextResponse.redirect("http://localhost:3000/user/dashboard");

  return NextResponse.next();
};

export default middleware;
