import { NextResponse } from "next/server";
import { useSelector } from "react-redux";
//import jwt from "jsonwebtoken";
// This function can be marked `async` if using `await` inside
export function middleware(req) {
  const path = req.nextUrl.pathname;
  const landingPage = path === "/";
  const AdminPath = path === "/about";
  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/verifyemail" ||
    path === "/verifyForgotPassword" ||
    path === "/forgotPassword";
  const token = req.cookies.get("accessToken")?.value || "";
  //const isAdmin = jwt.verify(token, process.env.PASS_CODE).isAdmin;
  //console.log(isAdmin);
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  } else if (landingPage) {
    return null;
  } else if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/profile",
    "/login",
    "/signup",
    "/verifyemail",
    "/verifyForgotPassword",
    "/forgotPassword",
  ],
};
