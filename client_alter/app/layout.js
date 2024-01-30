
import { Inter } from 'next/font/google'
import './globals.css'
import NavigationBar from './component/navigation';
import Footer from './component/footer';
import { authOptions } from "@/pages/api/auth/[...nextauth].js"
import { getServerSession } from "next-auth";

import { SessionProvider } from "next-auth/react"
const inter = Inter({ subsets: ['latin'] })

export async function Session() {
  let session = await getServerSession(authOptions);
  console.log(session)
  return session;
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
