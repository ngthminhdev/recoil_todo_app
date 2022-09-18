import { NextResponse } from "next/server";
import * as jose from "jose";

const middleware = async (req) => {
  const { cookies } = req;
  const token = cookies.refreshToken;

  if (!token) return NextResponse.redirect("http://localhost:3000/auth/login");

  try {
    // JWT validation successfully
    await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET)
    );
    return NextResponse.next();
  } catch (error) {
    // JWT validation failed or token is invalid
    console.log(error);
    return NextResponse.redirect("http://localhost:3000/auth/login");
  }
};

export default middleware;
