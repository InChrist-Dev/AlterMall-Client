
import { Inter } from 'next/font/google'
import './globals.css'
import NavigationBar from './component/navigation';
import Footer from './component/footer';
import Sos from './component/sos'
import Title from './component/title'
import { authOptions } from "@/pages/api/auth/[...nextauth].js"
import { getServerSession } from "next-auth";
import Cookies from 'js-cookie';
import Script from "next/script";


// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');
const inter = Inter({ subsets: ['latin'] })


export async function Session() {
  let session = await getServerSession(authOptions);
  console.log(session)
  return session;
}

export default async function RootLayout({ children }) {
  let session = await getServerSession(authOptions)
  const isService = false;//점검페이지 옵션


//점검페이지
  if(!isService){
    return(
      <html className="container" lang="ko">
        <Title/>
        <Sos/>
      </html>
    )
  }

  return (
    <html className="container" lang="ko">
      <Title/>

      <body className={inter.className}> 
      <NavigationBar session={session? session:''}/>
    
      {children}
      
      </body>
      
      <Footer/>
    
    </html>
  )
}
