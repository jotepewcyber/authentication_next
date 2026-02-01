import { NextRequest ,NextResponse } from 'next/server'

 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path=request.nextUrl.pathname

    const isPublicPath=path==='/login'||path==='/signup'||path==='/verifyEmail'
    const token=request.cookies.get('token')?.value
console.log("token in middleware is",token)
console.log("isPublicPath in middleware is",isPublicPath)
    if( isPublicPath && token ){
  return NextResponse.redirect(new URL('/', request.url))
}
  if( !isPublicPath && !token){
  return NextResponse.redirect(new URL('/login', request.url))
}
}
//matcher means run middleware before going to these pages
export const config = {
//   matcher: '/about/:path*',
matcher:[
    '/',
    '/login',
    '/signup',
    '/verifyEmail',
    '/profile/:path*'

]

}