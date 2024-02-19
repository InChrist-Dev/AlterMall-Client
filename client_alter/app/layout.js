
import { Inter } from 'next/font/google'
import './globals.css'
import NavigationBar from './component/navigation';
import Footer from './component/footer';
import { authOptions } from "@/pages/api/auth/[...nextauth].js"
import { getServerSession } from "next-auth";
import Cookies from 'js-cookie';
import cron from 'node-cron';
// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');
const inter = Inter({ subsets: ['latin'] })

export async function Session() {
  let session = await getServerSession(authOptions);
  console.log(session)
  return session;
}
if(accessToken){
  cron.schedule('1 * * * * *', () => {
    console.log('2분마다 작업 실행 : ', new Date().toString())
  })
}
export default async function RootLayout({ children }) {
  let session = await getServerSession(authOptions)
  return (
    
    <html className="container" lang="ko">
      <body className={inter.className}> 
      <NavigationBar session={session? session:''}/>
    
            
      {children}</body>
      
      <Footer/>
    
    </html>
  )
}
