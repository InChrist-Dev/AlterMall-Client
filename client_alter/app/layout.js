
import { Inter } from 'next/font/google'
import './globals.css'
import NavigationBar from './component/navigation';
import Footer from './component/footer';
import { authOptions } from "@/pages/api/auth/[...nextauth].js"
import { getServerSession } from "next-auth";
import { LoginBtn } from './login';
import { LogOutBtn } from './logout';

const inter = Inter({ subsets: ['latin'] })

export async function Session() {
  let session = await getServerSession(authOptions);
  console.log(session)
  return session;
}
export default function RootLayout({ children }) {
  return (
    <html className="container" lang="ko">
      <body className={inter.className}> 
      <NavigationBar/>
      {children}</body>
      <div style={{border:'0.5px solid #ddd',marginTop:'200px'}}></div>
      <Footer/>
    </html>
  )
}
