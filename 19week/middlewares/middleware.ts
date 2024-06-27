import { NextRequest, NextResponse } from "next/server";
let reqCount = 0;
// export function middleware(req: NextRequest) {
//     reqCount++;
//     const res = NextResponse.next();
//     console.log(`req count is ${reqCount}`);
//     return res;
// }

// export const config = {
//     matcher: `/api/:path*`, // restricting the middleware to the middlewares to the path: /api/....anything
// };
export function  middleware(req:NextRequest){
    console.log(req.nextUrl.pathname);
    if(req.nextUrl.pathname.startsWith("/admin")){
        return NextResponse.redirect(new URL('/signin',req.url));
    }
    if(req.nextUrl.pathname.endsWith("/dashboard")){
        return NextResponse.next();
    }
}